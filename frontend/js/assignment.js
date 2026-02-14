if (!checkAuth('student')) return;

document.getElementById('assignmentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const courseId = document.getElementById('course').value;
    const studentId = JSON.parse(localStorage.getItem('user')).id;
    const file = document.getElementById('file').files[0];

    formData.append('course_id', courseId);
    formData.append('student_id', studentId);
    formData.append('file', file);

    const res = await fetch('http://localhost:5000/api/assignments/submit', {
        method: 'POST',
        body: formData
    });

    const data = await res.json();
    if (res.ok) alert(`Assignment submitted!\nFeedback: ${data.feedback}`);
    else alert(data.message);
});
