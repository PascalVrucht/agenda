const form = document.getElementById('agendaForm');
const agendaLijst = document.getElementById('agendaLijst');

// Laad opgeslagen items bij het openen van de pagina
document.addEventListener('DOMContentLoaded', toonAgenda);

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const item = {
    id: Date.now(),
    datum: document.getElementById('datum').value,
    categorie: document.getElementById('categorie').value,
    titel: document.getElementById('titel').value
  };

  saveItem(item);
  form.reset();
  toonAgenda();
});

function getAgenda() {
  return JSON.parse(localStorage.getItem('mijnAgenda')) || [];
}

function saveItem(item) {
  const agenda = getAgenda();
  agenda.push(item);
  // Slaat de gegevens op in het geheugen van je eigen browser (LocalStorage)
  localStorage.setItem('mijnAgenda', JSON.stringify(agenda));
}

function verwijderItem(id) {
  let agenda = getAgenda();
  agenda = agenda.filter(item => item.id !== id);
  localStorage.setItem('mijnAgenda', JSON.stringify(agenda));
  toonAgenda();
}

function toonAgenda(filter = 'Alles') {
  agendaLijst.innerHTML = '';
  const agenda = getAgenda();

  // Sorteer op datum
  agenda.sort((a, b) => new Date(a.datum) - new Date(b.datum));

  agenda.forEach(item => {
    if (filter === 'Alles' || item.categorie === filter) {
      const li = document.createElement('li');
      li.className = item.categorie;
      li.innerHTML = `
        <span><strong>${item.datum}</strong> [${item.categorie}] - ${item.titel}</span>
        <button class="verwijder-btn" onclick="verwijderItem(${item.id})">✕</button>
      `;
      agendaLijst.appendChild(li);
    }
  });
}

function filterAgenda(categorie) {
  toonAgenda(categorie);
}
