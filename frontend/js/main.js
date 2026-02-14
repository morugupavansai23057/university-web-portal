const token = localStorage.getItem("token");

fetch("http://localhost:3000/api/events", {
    headers: {
        "Authorization": "Bearer " + token
    }
})
.then(res => res.json())
.then(data => {

    const eventList = document.getElementById("event-list");
    eventList.innerHTML = ""; // clear old content

    data.forEach(event => {

        const card = document.createElement("div");
        card.className = "card";

        const title = document.createElement("h3");
        title.textContent = event.title;

        const description = document.createElement("p");
        description.textContent = event.description;

        const date = document.createElement("small");
        date.textContent = event.event_date;

        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(date);

        eventList.appendChild(card);
    });

})
.catch(err => {
    console.log("Error loading events:", err);
});
