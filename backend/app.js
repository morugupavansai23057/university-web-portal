const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend')));

// Import routes
const assignmentsRouter = require('./routes/assignments');
const authRouter = require('./routes/auth');
const attendanceRouter = require('./routes/attendance');

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/assignments', assignmentsRouter);
app.use('/api/attendance', attendanceRouter);

// Default route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
