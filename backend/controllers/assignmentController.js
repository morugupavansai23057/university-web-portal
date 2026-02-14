const db = require('../config/db');
const evaluateAssignment = require('../ai_evaluator/evaluate');

/* ================= SUBMIT ASSIGNMENT ================= */
const submitAssignment = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "File not uploaded"
            });
        }

        const { course_id } = req.body;

        if (!course_id) {
            return res.status(400).json({
                message: "Course ID is required"
            });
        }

        // Get student ID from logged-in user (from auth middleware)
        const student_id = req.user?.id;

        if (!student_id) {
            return res.status(401).json({
                message: "Unauthorized user"
            });
        }

        const file_path = req.file.path;

        // AI evaluation (wrapped safely)
        let feedback = "";
        try {
            feedback = evaluateAssignment(file_path);
        } catch (error) {
            feedback = "Evaluation failed";
        }

        const sql = `
            INSERT INTO assignments (course_id, student_id, file_path, feedback) 
            VALUES (?, ?, ?, ?)
        `;

        db.query(sql, [course_id, student_id, file_path, feedback], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    message: "Database error"
                });
            }

            res.status(201).json({
                message: "Assignment submitted successfully",
                feedback
            });
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};


/* ================= GET ASSIGNMENTS ================= */
const getAssignments = (req, res) => {
    try {
        const { course_id } = req.query;

        if (!course_id) {
            return res.status(400).json({
                message: "Course ID is required"
            });
        }

        // Get student ID from logged-in user
        const student_id = req.user?.id;

        if (!student_id) {
            return res.status(401).json({
                message: "Unauthorized user"
            });
        }

        const sql = `
            SELECT * FROM assignments 
            WHERE student_id = ? AND course_id = ?
        `;

        db.query(sql, [student_id, course_id], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    message: "Database error"
                });
            }

            res.json(results);
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    submitAssignment,
    getAssignments
};
