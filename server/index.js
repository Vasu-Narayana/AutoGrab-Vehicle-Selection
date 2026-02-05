const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
const upload = multer();

app.use(cors());
app.use(express.json());

let lastSubmission = null;

// POST
app.post("/api/upload", upload.single("logbook"), (req, res) => {
	const { make, model, badge } = req.body;

	const formattedMake =
		make.charAt(0).toUpperCase() + make.slice(1).toLowerCase();

	lastSubmission = {
		make: formattedMake,
		model,
		badge,
		logbook: req.file ? req.file.buffer.toString("utf-8") : null,
	};

	res.json({ message: "Upload successful" });
});

// GET
app.get("/api/upload", (req, res) => {
	if (!lastSubmission) {
		return res.status(404).json({ message: "No submission found" });
	}

	res.json(lastSubmission);
});

const PORT = 5000;
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});