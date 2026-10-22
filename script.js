// ===== Countdown (ubah tanggal acara di sini) =====
const tanggalAcara = new Date('2026-12-12T08:00:00+07:00').getTime();
function updateCountdown() {
  const selisih = tanggalAcara - Date.now();
  const set = (id, v) => document.getElementById(id).textContent = v;
  if (selisih <= 0) { ['d','h','m','s'].forEach(i => set(i, 0)); return; }
  set('d', Math.floor(selisih / 86400000));
  set('h', Math.floor(selisih % 86400000 / 3600000));
  set('m', Math.floor(selisih % 3600000 / 60000));
  set('s', Math.floor(selisih % 60000 / 1000));
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ===== Animasi muncul saat scroll =====
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// ===== RSVP / Ucapan (disimpan di browser; untuk online gunakan backend/Google Form) =====
const form = document.getElementById('rsvpForm');
const list = document.getElementById('ucapan-list');
function escapeHtml(t) {
  const d = document.createElement('div'); d.textContent = t; return d.innerHTML;
}
function render() {
  const data = JSON.parse(localStorage.getItem('ucapan') || '[]');
  list.innerHTML = data.map(u =>
    `<div class="ucapan"><b>${escapeHtml(u.nama)} <small>(${escapeHtml(u.hadir)})</small></b>${escapeHtml(u.pesan)}</div>`
  ).join('');
}
form.addEventListener('submit', e => {
  e.preventDefault();
  const data = JSON.parse(localStorage.getItem('ucapan') || '[]');
  data.unshift({
    nama: document.getElementById('nama').value,
    hadir: document.getElementById('hadir').value,
    pesan: document.getElementById('pesan').value
  });
  localStorage.setItem('ucapan', JSON.stringify(data));
  form.reset();
  render();
  alert('Terima kasih atas ucapan dan konfirmasinya!');
});
render();

// ===== Salin rekening =====
function salinRekening() {
  navigator.clipboard.writeText(document.getElementById('norek').textContent)
    .then(() => alert('Nomor rekening disalin!'));
}

// ===== Musik =====
const musik = document.getElementById('musik');
const btn = document.getElementById('musicBtn');
btn.addEventListener('click', () => {
  if (musik.paused) { musik.play(); btn.innerHTML = '&#10074;&#10074;'; }
  else { musik.pause(); btn.innerHTML = '&#9835;'; }
});

// ===== Buka undangan: tampilkan semua bagian & putar musik =====
document.getElementById('openBtn').addEventListener('click', e => {
  e.preventDefault();
  document.body.classList.remove('locked');
  document.getElementById('mempelai').scrollIntoView({ behavior: 'smooth' });
  musik.play().then(() => { btn.innerHTML = '&#10074;&#10074;'; }).catch(() => {});
});