from pymongo import MongoClient
import datetime

MONGO_URI = "mongodb+srv://vats88690:tt3CAmKJMhkR4glN@cluster0.ggydqss.mongodb.net/"  
client = MongoClient(MONGO_URI)

db = client["face_recognition_db"]  
collection = db["recognized_faces"]  

# Test insert
doc = {
    "name": "Vaibhav",
    "time": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
}

result = collection.insert_one(doc)
print("Inserted ID:", result.inserted_id)