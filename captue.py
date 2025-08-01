

# # ArcFace + FAISS Real-Time Face Recognition with GPU Support
# import cv2
# import numpy as np
# import insightface
# import faiss
# import os
# import time
# import onnxruntime as ort

# # =============== CHECK AVAILABLE ONNX PROVIDERS ===============
# print("Available ONNX Providers:", ort.get_available_providers())
# # ✅ Should show: ['CUDAExecutionProvider', 'CPUExecutionProvider']

# # ================== INIT INSIGHTFACE MODEL ====================
# # ✅ Enable GPU by using CUDAExecutionProvider
# model = insightface.app.FaceAnalysis(name='buffalo_l', providers=['CUDAExecutionProvider', 'CPUExecutionProvider'])
# model.prepare(ctx_id=0)  # ctx_id=0 uses GPU if available

# # ================== FAISS INITIALIZATION ======================
# face_db = []
# names = []

# # FAISS index for face embeddings
# index = None

# # ================== REGISTER KNOWN FACES ======================
# def register_face(name, image_path):
#     img = cv2.imread(image_path)
#     if img is None:
#         print(f"Image not found: {image_path}")
#         return

#     faces = model.get(img)
#     if not faces:
#         print("No face detected in", image_path)
#         return

#     embedding = faces[0].embedding
#     face_db.append(embedding)
#     names.append(name)
#     print(f"{name} registered successfully.")

# # ================== LOAD FACES FROM FOLDER ====================
# def load_faces():
#     people_folder = "known_faces"
#     for person_name in os.listdir(people_folder):
#         person_path = os.path.join(people_folder, person_name)
#         if not os.path.isdir(person_path):
#             continue
#         for filename in os.listdir(person_path):
#             if filename.lower().endswith(('.jpg', '.jpeg', '.png')):
#                 image_path = os.path.join(person_path, filename)
#                 register_face(person_name, image_path)

#     global index
#     if face_db:
#         face_dim = len(face_db[0])
#         index = faiss.IndexFlatL2(face_dim)
#         index.add(np.array(face_db).astype('float32'))
#     else:
#         print("No known faces found.")

# # ================== REAL-TIME FACE RECOGNITION ================
# def recognize_faces():
#     cap = cv2.VideoCapture(0)
#     os.makedirs("known_faces/vaibhav", exist_ok=True)

#     while True:
#         ret, frame = cap.read()
#         if not ret:
#             break

#         # Resize for faster detection (optional)
#         # small_frame = cv2.resize(frame, (640, 480))
#         faces = model.get(frame)

#         for face in faces:
#             emb = np.expand_dims(face.embedding, axis=0).astype('float32')
#             label = "Unknown"

#             if index is not None and len(face_db) > 0:
#                 D, I = index.search(emb, k=1)
#                 if D[0][0] < 1.2:
#                     label = names[I[0][0]]

#             box = face.bbox.astype(int)
#             cv2.rectangle(frame, (box[0], box[1]), (box[2], box[3]), (0, 255, 0), 2)
#             cv2.putText(frame, label, (box[0], box[1] - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)

#         cv2.imshow("Real-Time Face Recognition", frame)
#         key = cv2.waitKey(1) & 0xFF

#         if key == ord('a'):
#             timestamp = time.strftime("%Y%m%d_%H%M%S")
#             path = f"known_faces/vaibhav/captured_{timestamp}.jpg"
#             cv2.imwrite(path, frame)
#             print(f"[INFO] Saved to: {path}")

#         elif key == ord('q'):
#             break

#     cap.release()
#     cv2.destroyAllWindows()

# # ================== MAIN PROGRAM ==============================
# if __name__ == "__main__":
#     print("Loading known faces...")
#     load_faces()
#     print("Starting real-time recognition. Press 'q' to quit.")
#     recognize_faces()


# ArcFace + FAISS Real-Time Face Recognition with GPU Support
import cv2
import numpy as np
import insightface
import faiss
import os
import time
import onnxruntime as ort

# =============== CHECK AVAILABLE ONNX PROVIDERS ===============
print("Available ONNX Providers:", ort.get_available_providers())
# Should show: ['CUDAExecutionProvider', 'CPUExecutionProvider']

# ================== INIT INSIGHTFACE MODEL ====================
# Use GPU if available
model = insightface.app.FaceAnalysis(name='buffalo_l', providers=['CUDAExecutionProvider', 'CPUExecutionProvider'])
model.prepare(ctx_id=0)  # ctx_id=0 uses GPU if available
print("Context ID used:", model.ctx_id)

# ================== FAISS INITIALIZATION ======================
face_db = []
names = []

index = None  # FAISS index

# ================== REGISTER KNOWN FACES ======================
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

# ================== LOAD FACES FROM FOLDER ====================
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

# ================== REAL-TIME FACE RECOGNITION ================
def recognize_faces():
    cap = cv2.VideoCapture(0)
    os.makedirs("known_faces/vaibhav", exist_ok=True)

    if not cap.isOpened():
        print("Error: Could not access the webcam.")
        return

    print("Press 'a' to save a frame, 'q' to quit.")

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
            cv2.putText(frame, label, (box[0], box[1] - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)

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

# ================== MAIN PROGRAM ==============================
if __name__ == "__main__":
    print("Loading known faces...")
    load_faces()
    print("Starting real-time recognition. Press 'q' to quit.")
    recognize_faces()
print("Available ONNX Providers:", ort.get_available_providers())