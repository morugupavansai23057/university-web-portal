const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'NewPassword@123',
    database: 'university_portal'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

module.exports = db;
