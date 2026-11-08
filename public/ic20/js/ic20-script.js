// IC20 – COSC 2328 – Professor McCurry
// Implemented by: Dorian Braun

/*
1. express.json() is a built-in middleware function that parses incoming JSON request payloads so that the data can be read, and without it, req.body would be undefined
2. HTTP status 200 means a request has successfully completed and is typically used for getting or updating data, whereas status 201 means a new resource has been successfully created and is used after a post request.
3. To make seed missions persist through a Docker container restart, you would need to connect your application to a persistent database or save the data to a file stored on a Docker container or image I believe.
4. Two people in different browser tabs would not automatically see a synchronized real-time list because the server stores the data in a local memory array and HTTP is stateless, meaning other clients are not notified when new data is added.
*/


const list = document.getElementById('mission-list');
const form = document.getElementById('mission-form');

async function loadMissions() {
  const res  = await fetch('/ic20/missions');
  const data = await res.json();
  list.innerHTML = '';
  data.forEach(m => {
    const li = document.createElement('li');
    li.innerHTML = `<p class="name">${m.name}</p><p class="dest">${m.destination}</p>`;
    list.appendChild(li);
  });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name        = document.getElementById('mission-name').value.trim();
  const destination = document.getElementById('mission-dest').value.trim();
  await fetch('/ic20/missions', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ name, destination }),
  });
  form.reset();
  loadMissions();
});

loadMissions();