const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// REGISTER
const register = (req, res) => {
    const { name, email, password, role } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);

    const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';

    db.query(sql, [name, email, hashedPassword, role], (err, result) => {
        if (err) return res.status(500).send(err);

        res.send({ message: 'User registered successfully' });
    });
};

// LOGIN
const login = (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM users WHERE email = ?';

    db.query(sql, [email], (err, results) => {
        if (err) return res.status(500).send(err);

        if (results.length === 0) {
            return res.status(404).send({ message: 'User not found' });
        }

        const user = results[0];

        const valid = bcrypt.compareSync(password, user.password);
        if (!valid) {
            return res.status(401).send({ message: 'Invalid password' });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            'SECRET_KEY',
            { expiresIn: '1h' }
        );

        res.send({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    });
};

module.exports = { register, login };
