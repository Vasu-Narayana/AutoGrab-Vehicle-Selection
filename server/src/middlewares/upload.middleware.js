const multer = require('multer');

const upload = multer({
	storage: multer.memoryStorage(),
	fileFilter: (req, file, cb) => {
		if (file.mimetype === 'text/plain') {
			cb(null, true);
		} else {
			cb(new Error('Only .txt files are allowed'));
		}
	},
	limits: { fileSize: 1024 * 1024 }
});

module.exports = upload;