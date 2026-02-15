const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// ✅ Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend')));

// Import routes
const assignmentsRouter = require('./routes/assignments');
const authRouter = require('./routes/auth');
const attendanceRouter = require('./routes/attendance');

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/assignments', assignmentsRouter);
app.use('/api/attendance', attendanceRouter);

// ✅ Direct route for dashboard (optional but recommended)
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dashboard.html'));
});

// Default route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// 404 handler (very useful)
app.use((req, res) => {
    res.status(404).send("Page not found");
});

// Start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
