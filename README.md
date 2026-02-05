# Vehicle Selection Application:

A Full-stack vehicle selection application built using:

- **Frontend:** React (Vite).
- **Backend:** Node.js + Express.
- **File Upload:** Multer.
- **Architecture:** Modular & production-ready structure.

## 📌 Overview

This application allows users to:

- Select a Vehicle Make.
- Select a Model based on Make.
- Select a Badge based on Model.
- Upload a logbook file (.txt only)
- Submit the data to backend.
- View processed response.

The backend validates:
- Make → Model relationship.
- Model → Badge relationship.
- File type and presence.
- Required fields.

---

## 🏗 Architecture

### Backend Structure:

**Highlights:**
- Clean separation of concerns.
- Centralized error handling.
- Memory-based file upload.
- Validation logic in controller.
- Easily extendable for DB integration.

---

### Frontend Structure:

**Highlights:**
- Controlled components.
- Dynamic dropdown logic.
- Optimized with useMemo.
- API abstraction layer.
- Clean UI with validation feedback.

---

## 🚀 Running the Application

### 1️⃣ Start Backend and Frontend

```bash
cd server
npm install
npm run dev

http://localhost:5000

cd client
npm install
npm run dev

http://localhost:5173
