const express = require('express');
const router = express.Router();
const multer = require('multer');
const { submitAssignment, getAssignments } = require('../controllers/assignmentController');
const { auth, authorizeRole } = require('../middleware/auth');

// Multer config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

// Submit assignment (student only)
router.post(
    '/submit',
    auth, // ✅ FIXED (was verifyToken)
    authorizeRole('student'),
    upload.single('file'),
    submitAssignment
);

// Get assignments (authenticated users)
router.get(
    '/view',
    auth, // ✅ FIXED (was verifyToken)
    getAssignments
);

module.exports = router;
