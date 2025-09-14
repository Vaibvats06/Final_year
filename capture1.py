import cv2
import numpy as np
import insightface
import faiss
import os
import time
import onnxruntime as ort
import matplotlib.pyplot as plt

#import database
from pymongo import MongoClient

print("Available ONNX Providers:", ort.get_available_providers())

# ================== INIT INSIGHTFACE MODEL ====================
# CPU only
model = insightface.app.FaceAnalysis(name='buffalo_l', providers=['CPUExecutionProvider'])
model.prepare(ctx_id=-1)   # -1 forces CPU
# print("Context ID used:", model.ctx_id)


# ================== FAISS INITIALIZATION ======================
face_db = []
names = []
index = None  # FAISS index

#mongo Atlas could connection
MONGO_URI = "mongodb+srv://vats88690:tt3CAmKJMhkR4glN@cluster0.ggydqss.mongodb.net/"  
client = MongoClient(MONGO_URI)   
db = client["face_recognition_db"]  
collection = db["recognized_faces"] 

def save_to_mongo(name): 
    """Save recognized face to MongoDB Atlas"""
    timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
    record = {"timestamp": timestamp, "name": name}
    collection.insert_one(record)
    print(f"[CloudDB] Saved: {record}")

# ================== REGISTER KNOWN FACES ======================
def register_face(name, image_path):
    img = cv2.imread(image_path)
    if img is None:
        print(f"Image not found: {image_path}")
        return

    faces = model.get(img)
    if not faces:
        print("No face detected in ", image_path)
        return

    embedding = faces[0].normed_embedding   # normalized
    face_db.append(embedding)
    names.append(name)
    print(f"{name} registered successfully.")

# ================== LOAD FACES FROM FOLDER ====================
def load_faces():
    people_folder = "known_faces/"
    for person_name in os.listdir(people_folder):
        person_path = os.path.join(people_folder, person_name)
        if not os.path.isdir(person_path):
            continue
        for filename in os.listdir(person_path):
            if filename.lower().endswith(('.jpg', '.jpeg', '.png')):
                image_path = os.path.join(person_path, filename)
                register_face(person_name, image_path)

    global index
    if face_db:
        face_dim = len(face_db[0])
        index = faiss.IndexFlatIP(face_dim)   # cosine similarity on CPU
        index.add(np.array(face_db).astype('float32'))
    else:
        print("No known faces found.")
def clear_old_faces():
    folder = "known_faces/"
    for root, dirs, files in os.walk(folder):
        for file in files:
            if file.startswith("captured_"):
                os.remove(os.path.join(root, file))
    print("[CLEANUP] Old captured images removed.")
# ================== REAL-TIME FACE RECOGNITION ================
def recognize_faces():
    cap = cv2.VideoCapture(0)
    os.makedirs("known_faces/", exist_ok=True)

    if not cap.isOpened():
        print("Error: Could not access the webcam.")
        return
    

    print("Press 'a' to save a frame, 'q' to quit.")
    attendance_set = set()

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        faces = model.get(frame)
        if not faces:
            # 🔵 UPDATE: IoT trigger when no one found
            print("🚫 No one found in class (IoT trigger)")
        else:
            for face in faces:
                emb = np.expand_dims(face.normed_embedding, axis=0).astype('float32')
                label = "Unknown"

                if index is not None and len(face_db) > 0:
                   D, I = index.search(emb, k=1)
                   if D[0][0] > 0.3:   # cosine similarity threshold
                    label = names[I[0][0]]

                box = face.bbox.astype(int)
                cv2.rectangle(frame, (box[0], box[1]), (box[2], box[3]), (0, 255, 0), 2)
                cv2.putText(frame, label, (box[0], box[1] - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)

        

  # ✅ Save recognized face to MongoDB Atlas
                if label != "Unknown" and label not in attendance_set:
                    save_to_mongo(label)
                    attendance_set.add(label)
                    print(f"[ATTENDANCE] {label} marked once ")

        cv2.imshow("Real-Time Face Recognition", frame)
        key = cv2.waitKey(6000) & 0xFF

        if key == ord('a'):
            timestamp = time.strftime("%Y%m%d_%H%M%S")
            path = f"known_faces/vaibhav/captured_{timestamp}.jpg"
            if faces:
                

                for i, face in enumerate(faces):   # sabhi detected faces ke liye
                   box = face.bbox.astype(int)
                   face_crop = frame[box[1]:box[3], box[0]:box[2]]
 
                   timestamp = time.strftime("%Y%m%d_%H%M%S")
                   path = f"known_faces/vaibhav/captured_{timestamp}_{i}.jpg"
                   cv2.imwrite(path, face_crop)
                   print(f"[INFO] Cropped face {i} saved to: {path}")
                
            else:
                print("[WARN] No face detected to save.")

        elif key == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

# ================== MAIN PROGRAM ==============================
if __name__ == "__main__":
    print("Loading known faces...")
    load_faces()
    print("Starting real-time recognition. Press 'q' to quit.")
    recognize_faces()
