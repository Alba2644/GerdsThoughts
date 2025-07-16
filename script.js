async function loadThoughts() {
  const response = await fetch('data.json');
  const data = await response.json();
  const list = document.getElementById('thoughtList');
  list.innerHTML = '';
  data.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.text;
    list.appendChild(li);
  });
}

async function submitThought() {
  const input = document.getElementById('thoughtInput');
  const thought = input.value.trim();
  if (!thought) return;

  await fetch('https://your-cloudflare-worker-or-action-url', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: thought })
  });

  input.value = '';
  loadThoughts();
}

document.getElementById('submitBtn').addEventListener('click', submitThought);
window.addEventListener('DOMContentLoaded', loadThoughts);
