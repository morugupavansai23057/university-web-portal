// ================= CHECK AUTH =================
function checkAuth(roleRequired) {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    if (!token || userRole !== roleRequired) {
        alert("Access denied!");
        window.location.href = "login.html";
        return false;
    }
    return true;
}

// Redirect if not faculty
if (!checkAuth('faculty')) {
    throw new Error("Unauthorized");
}


// ================= MARK ATTENDANCE =================
async function markAttendance() {
    const token = localStorage.getItem('token');

    const courseId = document.getElementById('course').value;
    const studentId = document.getElementById('student').value;
    const date = document.getElementById('date').value;
    const status = document.querySelector('input[name="status"]:checked').value;

    const response = await fetch('http://localhost:3000/api/attendance/mark', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            course_id: courseId,
            student_id: studentId,
            date,
            status
        })
    });

    const data = await response.json();
    alert(data.message || "Attendance marked!");
}



// ================= LOAD COURSES & STUDENTS =================
async function loadStudentsAndCourses() {
    const token = localStorage.getItem('token');

    try {
        // Load courses
        const coursesRes = await fetch('http://localhost:3000/api/courses', {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const courses = await coursesRes.json();
        const courseSelect = document.getElementById('course');

        courses.forEach(c => {
            const opt = document.createElement('option');
            opt.value = c.id;
            opt.textContent = c.name;
            courseSelect.appendChild(opt);
        });

        // Load students
        const studentsRes = await fetch('http://localhost:3000/api/users?role=student', {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const students = await studentsRes.json();
        const studentSelect = document.getElementById('student');

        students.forEach(s => {
            const opt = document.createElement('option');
            opt.value = s.id;
            opt.textContent = s.name;
            studentSelect.appendChild(opt);
        });

    } catch (error) {
        console.error(error);
        alert("Failed to load data");
    }
}

window.onload = loadStudentsAndCourses;
