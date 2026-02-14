const apiUrl = 'http://localhost:3000/api/auth';

/* ================= LOGIN ================= */

document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const res = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
        // Store token
        localStorage.setItem('token', data.token);

        // Store user safely
        if (data.user) {
            localStorage.setItem('user', JSON.stringify(data.user));
        }

        alert('Login successful!');

        // Redirect based on role
        if (data.user?.role === 'faculty') {
            window.location.href = 'faculty-dashboard.html';
        } else {
            window.location.href = 'dashboard.html';
        }

    } else {
        alert(data.message || "Login failed");
    }
});


/* ================= REGISTER ================= */

document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    const res = await fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role })
    });

    const data = await res.json();

    if (res.ok) {
        alert(data.message || "Registration successful!");
        window.location.href = 'login.html';
    } else {
        alert(data.message || "Registration failed");
    }
});


/* ================= CHECK AUTH ================= */

function checkAuth(requiredRole = null) {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!token) {
        alert('Please login first!');
        window.location.href = 'login.html';
        return false;
    }

    if (requiredRole && user?.role !== requiredRole) {
        alert('Access denied!');
        window.location.href = 'index.html';
        return false;
    }

    return true;
}
