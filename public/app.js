const STORAGE_KEY = "passeio:rides";

const form = document.getElementById("ride-form");
const inputDate = document.getElementById("date");
const inputTime = document.getElementById("time");
const clearAllButton = document.getElementById("clear-all");
const monthFilter = document.getElementById("month-filter");
const list = document.getElementById("ride-list");
const emptyState = document.getElementById("empty-state");

function read() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}
function write(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function scheduleRide(dateStr, timeStr) {
  const rides = read();
  const ride = {
    id: `ride_${cryptoRandomId()}`,
    date: dateStr,
    time: timeStr,
    createdAt: new Date().toISOString(),
  };
  rides.push(ride);
  write(rides);
}

function deleteRide(id) {
  write(read().filter(r => r.id !== id));
}

function clearAll() { localStorage.removeItem(STORAGE_KEY); }

function getMonthKey(dateStr) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "";
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`;
}

function populateMonthFilter() {
  const rides = read();
  const keys = Array.from(new Set(rides.map(r => getMonthKey(r.date)).filter(Boolean))).sort();
  monthFilter.innerHTML = "";
  const optAll = document.createElement("option");
  optAll.value = ""; optAll.textContent = "Todos"; monthFilter.appendChild(optAll);
  for (const k of keys) {
    const opt = document.createElement("option");
    const [y,m] = k.split("-");
    opt.value = k; opt.textContent = `${m}/${y}`;
    monthFilter.appendChild(opt);
  }
}

function render() {
  const rides = read();
  const filter = monthFilter.value;
  const filtered = filter ? rides.filter(r => getMonthKey(r.date) === filter) : rides;

  list.innerHTML = "";
  if (filtered.length === 0) { emptyState.classList.remove("hidden"); return; }
  emptyState.classList.add("hidden");

  for (const r of filtered.sort((a,b) => (a.date+a.time).localeCompare(b.date+b.time))) {
    const li = document.createElement("li");
    li.className = "list-item";
    const date = new Date(`${r.date}T${r.time || "00:00"}`);
    const dateLabel = date.toLocaleDateString();
    const timeLabel = r.time || "--:--";
    li.innerHTML = `
      <div>
        <div class="item-title">${dateLabel}</div>
        <div class="item-sub">${timeLabel}</div>
      </div>
      <div class="item-actions">
        <button class="danger" data-id="${r.id}">Excluir</button>
      </div>`;
    list.appendChild(li);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const d = inputDate.value;
  const t = inputTime.value;
  if (!d || !t) { alert("Informe data e horário."); return; }
  scheduleRide(d, t);
  form.reset();
  populateMonthFilter();
  render();
});

list.addEventListener("click", (e) => {
  const btn = e.target.closest("button.danger");
  if (!btn) return;
  deleteRide(btn.getAttribute("data-id"));
  populateMonthFilter();
  render();
});

clearAllButton.addEventListener("click", () => {
  if (confirm("Limpar todo o histórico?")) { clearAll(); populateMonthFilter(); render(); }
});

monthFilter.addEventListener("change", render);

function cryptoRandomId() {
  if (window.crypto?.getRandomValues) {
    const buf = new Uint32Array(2); window.crypto.getRandomValues(buf);
    return `${buf[0].toString(16)}${buf[1].toString(16)}`;
  }
  return Math.random().toString(16).slice(2);
}

populateMonthFilter();
render();


