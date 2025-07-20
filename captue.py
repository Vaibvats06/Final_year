# ArcFace + FAISS Real-Time Face Recognition
import cv2
import numpy as np
import insightface
import faiss
import os
import time

# ================== INIT INSIGHTFACE MODEL ===================
model = insightface.app.FaceAnalysis(name='buffalo_l', providers=['CPUExecutionProvider'])
model.prepare(ctx_id=0)

# ================== FAISS INITIALIZATION =====================
face_db = []
names = []

# FAISS will be created after adding faces
index = None

# ================== REGISTER KNOWN FACES =====================
def register_face(name, image_path):
    img = cv2.imread(image_path)
    if img is None:
        print(f"Image not found: {image_path}")
        return

    faces = model.get(img)
    if not faces:
        print("No face detected in", image_path)
        return

    embedding = faces[0].embedding
    face_db.append(embedding)
    names.append(name)
    print(f"{name} registered successfully.")

# ================== LOAD FACES ===============================
def load_faces():
    people_folder = "known_faces"
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
        index = faiss.IndexFlatL2(face_dim)
        index.add(np.array(face_db).astype('float32'))
    else:
        print("No known faces found.")  

# ================== START RECOGNITION ========================

import time
import os

def recognize_faces():
    cap = cv2.VideoCapture(0)
    os.makedirs("known_faces/vaibhav", exist_ok=True)

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        faces = model.get(frame)
        for face in faces:
            emb = np.expand_dims(face.embedding, axis=0).astype('float32')
            label = "Unknown"

            if index is not None and len(face_db) > 0:
                D, I = index.search(emb, k=1)
                if D[0][0] < 1.2:
                    label = names[I[0][0]]

            box = face.bbox.astype(int)
            cv2.rectangle(frame, (box[0], box[1]), (box[2], box[3]), (0, 255, 0), 2)
            cv2.putText(frame, label, (box[0], box[1] - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)

        cv2.imshow("Real-Time Face Recognition", frame)
        key = cv2.waitKey(1) & 0xFF

        if key == ord('a'):
            timestamp = time.strftime("%Y%m%d_%H%M%S")
            path = f"known_faces/vaibhav/captured_{timestamp}.jpg"
            cv2.imwrite(path, frame)
            print(f"[INFO] Saved to: {path}")

        elif key == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

# def recognize_faces():
#     cap = cv2.VideoCapture(0)

#     if not cap.isOpened():
#         print("Error: Webcam not found.")
#         return

#     while True:
#         ret, frame = cap.read()
#         if not ret:
#             break

#         faces = model.get(frame)
#         for face in faces:
#             emb = np.expand_dims(face.embedding, axis=0).astype('float32')
#             label = "Unknown"

#             if index is not None and len(face_db) > 0:
#                D, I = index.search(emb, k=1)
#                print(f"Distance: {D[0][0]}")  # <-- ADD THIS
#                if D[0][0] < 1.2:
#                 label = names[I[0][0]]


#             box = face.bbox.astype(int)
#             cv2.rectangle(frame, (box[0], box[1]), (box[2], box[3]), (0, 255, 0), 2)
#             cv2.putText(frame, label, (box[0], box[1] - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)

#         cv2.imshow("Real-Time Face Recognition", frame)
#         break
#         import time
#         timestamp = time.strftime("%Y%m%d_%H%M%S")
#         save_path = f"known_faces/vaibhav/webcam_{timestamp}.jpg"
#         cv2.imwrite(save_path, frame)
#         print(f"[INFO] Frame saved to: {save_path}")
#         break
#         if cv2.waitKey(1) & 0xFF == ord('q'):
#             break

#     cap.release()
#     cv2.destroyAllWindows()

# ================== MAIN PROGRAM =============================
if __name__ == "__main__":
    print("Loading known faces...")
    load_faces()
    print("Starting real-time recognition. Press 'q' to quit.")
    recognize_faces()
