const db = require('../config/db');

/* ================= MARK ATTENDANCE ================= */
const markAttendance = (req, res) => {
    const { course_id, student_id, date, status } = req.body;

    if (!course_id || !student_id || !date || !status) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const sql = `
        INSERT INTO attendance (course_id, student_id, date, status) 
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [course_id, student_id, date, status], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Database error"
            });
        }

        res.json({
            message: "Attendance marked successfully"
        });
    });
};


/* ================= GET ATTENDANCE ================= */
const getAttendance = (req, res) => {
    const { course_id, startDate, endDate } = req.query;

    if (!course_id || !startDate || !endDate) {
        return res.status(400).json({
            message: "course_id, startDate and endDate are required"
        });
    }

    const sql = `
        SELECT * FROM attendance 
        WHERE course_id = ? AND date BETWEEN ? AND ?
    `;

    db.query(sql, [course_id, startDate, endDate], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Database error"
            });
        }

        res.json(results);
    });
};


/* ================= GET ATTENDANCE SUMMARY ================= */
const getAttendanceSummary = (req, res) => {
    const { course_id } = req.query;

    if (!course_id) {
        return res.status(400).json({
            message: "course_id is required"
        });
    }

    const sql = `
        SELECT 
            status,
            COUNT(*) as count
        FROM attendance
        WHERE course_id = ?
        GROUP BY status
    `;

    db.query(sql, [course_id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Database error"
            });
        }

        res.json(results);
    });
};


module.exports = {
    markAttendance,
    getAttendance,
    getAttendanceSummary
};
