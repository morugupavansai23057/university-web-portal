const express = require('express');
const router = express.Router();
const {
    markAttendance,
    getAttendance,
    getAttendanceSummary
} = require('../controllers/attendanceController');

const { auth, authorizeRole } = require('../middleware/auth');

// Mark attendance (faculty only)
router.post(
    '/mark',
    auth,
    authorizeRole('faculty'),
    markAttendance
);

// View attendance (any logged-in user)
router.get(
    '/view',
    auth,
    getAttendance
);

// Get attendance summary (for dashboard)
router.get(
    '/summary',
    auth,
    getAttendanceSummary
);

module.exports = router;
