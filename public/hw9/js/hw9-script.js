// HW9 – COSC 2328 – Professor McCurry
// Implemented by: Dorian Braun

/*
Homework Questions:

1.dotenv loads your .env file into Node's global process.env at startup. Because app.js runs it first, any file required afterward (like your router) automatically inherits those values without calling dotenv again.

2. A <form> triggers a default browser page reload, requiring e.preventDefault() to stop it. A plain <button> has no default submission behavior, so clicking it just runs your custom JavaScript fetch() seamlessly.

3. The case list resets because it lives purely in temporary server RAM. When the container restarts, the RAM wipes clean. To save data permanently, you need a database (like SQLite in HW10).

4. fetch() receives the server's status code in the response object. The response.ok property is true for successful responses (like 201) and false for errors (like 400), making it easy to catch and display issues. 

*/
// Step 11: Fetch and display detective clearance from .env
async function loadCredentials() {
  try {
    const response = await fetch('/hw9/credentials');
    const data = await response.json();
    
    const dl = document.getElementById('credentials');
    dl.innerHTML = '';

    Object.entries(data).forEach(([key, value]) => {
      const dt = document.createElement('dt');
      dt.textContent = key;
      const dd = document.createElement('dd');
      dd.textContent = value || 'N/A';
      dl.appendChild(dt);
      dl.appendChild(dd);
    });
  } catch (err) {
    console.error('Failed to load credentials:', err);
  }
}

// Step 12: Fetch and display the case log
async function loadCases() {
  try {
    const response = await fetch('/hw9/cases');
    const cases = await response.json();

    const ul = document.getElementById('case-list');
    ul.innerHTML = '';

    if (cases.length === 0) {
      const li = document.createElement('li');
      li.className = 'empty-msg';
      li.textContent = 'No cases filed yet.';
      ul.appendChild(li);
      return;
    }

    cases.forEach(c => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div class="case-id">Case #${c.id}</div>
        <div class="case-suspect">${escapeHtml(c.suspect)}</div>
        <div class="case-location">📍 ${escapeHtml(c.location)}</div>
        ${c.notes ? `<div class="case-notes">"${escapeHtml(c.notes)}"</div>` : ''}
        <div class="case-ts">${c.timestamp}</div>
      `;
      ul.appendChild(li);
    });
  } catch (err) {
    console.error('Failed to load cases:', err);
  }
}

// Helper function to prevent basic HTML injection
function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

// Step 13: Handle filing new evidence via fetch POST without forms
document.getElementById('log-btn').addEventListener('click', async () => {
  const suspect = document.getElementById('suspect').value;
  const location = document.getElementById('location').value;
  const notes = document.getElementById('notes').value;
  const statusMsg = document.getElementById('log-status');

  statusMsg.textContent = '';

  try {
    const response = await fetch('/hw9/cases', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ suspect, location, notes })
    });

    const data = await response.json();

    if (!response.ok) {
      statusMsg.textContent = data.error || 'Failed to file case.';
      return;
    }

    // Success: Clear inputs and reload case list
    document.getElementById('suspect').value = '';
    document.getElementById('location').value = '';
    document.getElementById('notes').value = '';
    
    loadCases();
  } catch (err) {
    console.error('Error logging case:', err);
    statusMsg.textContent = 'Network error connecting to precinct server.';
  }
});

// Initial data load on page open
loadCredentials();
loadCases();