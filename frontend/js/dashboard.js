const token = localStorage.getItem("token");

/* ================= ATTENDANCE SUMMARY ================= */

fetch("http://localhost:3000/api/attendance/summary?course_id=1", {
    headers: {
        "Authorization": "Bearer " + token
    }
})
.then(res => res.json())
.then(data => {

    document.getElementById("attendancePercentage").innerText =
        data.percentage + "%";

    const ctx = document.getElementById("attendanceChart").getContext("2d");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: data.students,
            datasets: [{
                label: "Attendance %",
                data: data.percentages
            }]
        }
    });

})
.catch(err => console.log(err));



/* ================= ASSIGNMENT SUMMARY ================= */

fetch("http://localhost:3000/api/assignments/summary", {
    headers: {
        "Authorization": "Bearer " + token
    }
})
.then(res => res.json())
.then(data => {

    document.getElementById("assignmentCount").innerText =
        data.total;

    const ctx2 = document.getElementById("assignmentChart").getContext("2d");

    new Chart(ctx2, {
        type: "pie",
        data: {
            labels: ["Submitted", "Pending"],
            datasets: [{
                data: [data.submitted, data.pending]
            }]
        }
    });

})
.catch(err => console.log(err));
