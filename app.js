// ===============================
// Registro Voti – versione base
// ===============================

let materie = JSON.parse(localStorage.getItem("materie")) || [];

const inputMateria = document.getElementById("materia");
const inputVoto = document.getElementById("voto");
const inputAssenze = document.getElementById("assenze");
const btnAggiungi = document.getElementById("btn-aggiungi");
const tbody = document.getElementById("lista-materie");
const mediaSpan = document.getElementById("media-voti");
const totaleAssenzeSpan = document.getElementById("totale-assenze");

// Aggiungi materia
btnAggiungi.addEventListener("click", () => {
  const nome = inputMateria.value.trim();
  const voto = parseFloat(inputVoto.value);
  const ore = parseFloat(inputAssenze.value) || 0;

  if (!nome || isNaN(voto)) {
    alert("Inserisci almeno materia e voto valido.");
    return;
  }

  materie.push({ nome, voto, ore });
  salva();
  ridisegna();

  inputMateria.value = "";
  inputVoto.value = "";
  inputAssenze.value = "";
});

// Salvataggio
function salva() {
  localStorage.setItem("materie", JSON.stringify(materie));
}

// Ridisegna tabella e riepilogo
function ridisegna() {
  tbody.innerHTML = "";

  materie.forEach((m, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${m.nome}</td>
      <td>${m.voto}</td>
      <td>${m.ore}</td>
      <td>
        <button class="btn delete" onclick="cancellaMateria(${index})">
          Cancella
        </button>
      </td>
    `;

    tbody.appendChild(tr);
  });

  aggiornaMedia();
  aggiornaTotaleAssenze();
}

function cancellaMateria(index) {
  materie.splice(index, 1);
  salva();
  ridisegna();
}

function aggiornaMedia() {
  if (materie.length === 0) {
    mediaSpan.textContent = "0.00";
    return;
  }

  const somma = materie.reduce((acc, m) => acc + m.voto, 0);
  const media = somma / materie.length;
  mediaSpan.textContent = media.toFixed(2);
}

function aggiornaTotaleAssenze() {
  const totale = materie.reduce((acc, m) => acc + (m.ore || 0), 0);
  totaleAssenzeSpan.textContent = totale;
}

// Inizializzazione
ridisegna();
