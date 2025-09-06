// server.js
require('dotenv').config();
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');

const RecognizedFace = require('./models/RecognizedFace'); // your model
const app = express();

app.use(cors({ origin: 'http://localhost:5173' })); // adjust frontend origin
app.use(express.json());

// Basic API to fetch normalized students (same transform as before)
function splitNameAndRoll(input) {
  if (!input) return { display_name: 'Unknown', roll_no: null };
  const s = String(input).trim();
  const m = s.match(/^(.+?)[_\-\s]+(\d{4,})$/);
  if (m) return { display_name: m[1], roll_no: m[2] };
  return { display_name: s, roll_no: null };
}
function splitTimestamp(ts) {
  if (!ts) return { date: '', time: '' };
  const str = String(ts).replace('T', ' ');
  const [date, timeRaw] = str.split(' ');
  const time = (timeRaw || '').replace(/Z$/, '').split('.')[0];
  return { date: date || '', time: time || '' };
}

app.get('/students', async (req, res) => {
  try {
    const docs = await RecognizedFace.find().sort({ timestamp: -1 }).limit(1000);
    const rows = docs.map(d => {
      const { display_name, roll_no } = d.display_name || d.roll_no
        ? { display_name: d.display_name || d.name, roll_no: d.roll_no || null }
        : splitNameAndRoll(d.name);
      const { date, time } = splitTimestamp(d.timestamp);
      const student_id = d.student_id || roll_no || String(d._id);
      return { student_id, roll_no: roll_no || '', name: display_name || 'Unknown', date, time };
    });
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
});

// create HTTP server and socket.io
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: { origin: 'http://localhost:5173', methods: ['GET', 'POST'] }
});

// On socket connection
io.on('connection', socket => {
  console.log('Client connected', socket.id);

  socket.on('disconnect', reason => {
    console.log('Client disconnected', socket.id, reason);
  });
});

// Connect to MongoDB and set up change stream
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('MongoDB Connected');
    console.log(`Connected to Database: ${mongoose.connection.name}`);

    // Ensure the DB user has changeStream permissions (Atlas does by default on replica sets)
    const db = mongoose.connection.db;
    const collection = db.collection('recognized_faces');

    // Start watching insert events
    const changeStream = collection.watch(
      [
        { $match: { 'operationType': { $in: ['insert', 'update', 'replace'] } } }
      ],
      { fullDocument: 'updateLookup' } // gives full doc on update
    );

    changeStream.on('change', change => {
      try {
        // fullDocument contains the new/updated document
        const doc = change.fullDocument;
        if (!doc) return;

        // normalize the doc exactly as /students API does
        const nameField = doc.display_name || doc.name;
        const { display_name, roll_no } = doc.display_name || doc.roll_no
          ? { display_name: doc.display_name || doc.name, roll_no: doc.roll_no || null }
          : (function parse(){ const s = String(doc.name || ''); const m = s.match(/^(.+?)[_\-\s]+(\d{4,})$/); return m ? { display_name: m[1], roll_no: m[2] } : { display_name: s, roll_no: null }; })();

        const ts = doc.timestamp || new Date().toISOString().replace('T', ' ').split('.')[0];
        const [date, time] = String(ts).split(' ');

        const student_id = doc.student_id || roll_no || String(doc._id);
        const payload = {
          student_id,
          roll_no: roll_no || '',
          name: display_name || 'Unknown',
          date: date || '',
          time: time || ''
        };

        // Emit the new/updated face to ALL connected clients
        io.emit('new-face', payload);
        console.log('Emitted new-face:', payload);
      } catch (err) {
        console.error('changeStream processing error:', err);
      }
    });

    changeStream.on('error', err => {
      console.error('ChangeStream error:', err);
      // you might want to recreate the stream with backoff here
    });

  })
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
