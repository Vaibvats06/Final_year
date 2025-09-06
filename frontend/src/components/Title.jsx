// LiveTable.jsx
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

export default function LiveTable() {
  const [rows, setRows] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    // fetch initial data
    axios.get('http://localhost:5000/students')
      .then(res => setRows(res.data))
      .catch(err => console.error(err));

    // connect socket
    const socket = io('http://localhost:5000', { reconnectionAttempts: 5 });
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Connected to socket:', socket.id);
    });

    socket.on('new-face', (payload) => {
      console.log('new-face received', payload);
      // prepend new record (and keep list length reasonable)
      setRows(prev => {
        const next = [payload, ...prev];
        return next.slice(0, 200); // keep up to 200 rows on client
      });
    });

    socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
    });

    socket.on('connect_error', (err) => {
      console.error('Socket connect error', err);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-5">
    

      <div className="overflow-x-auto mt-6 flex justify-center">
        <table className="min-w-[90%] border border-gray-300 shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Student_id</th>
              <th className="border px-4 py-2">Roll_no</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Time</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {rows.map((r, idx) => (
              <tr key={r.student_id + r.date + r.time + idx} className="hover:bg-gray-50 transition">
                <td className="border px-4 py-2">{r.student_id}</td>
                <td className="border px-4 py-2">{r.roll_no}</td>
                <td className="border px-4 py-2">{r.name}</td>
                <td className="border px-4 py-2">{r.date}</td>
                <td className="border px-4 py-2">{r.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
