/* ============================================================
   JENNINGS CONSULTING — stats.js
   Edit the numbers/sources below to update; nothing else changes.
   ============================================================ */

const breachStats = [
  { value: 88, suffix: '%', label: 'of small-business breaches involve ransomware', detail: 'Versus 39% for large enterprises — attackers go where the fundamentals are skipped, not where the target is biggest.', source: 'Verizon 2025 DBIR' }
];

const barData = [
  { label: 'Remote monitoring',        value: 94 },
  { label: 'Help desk support',        value: 91 },
  { label: 'Backup & disaster recovery', value: 89 }
];

const sources = [
  { name: 'MSP Benchmark Survey', org: 'Datto' },
  { name: 'Verizon 2025 Data Breach Investigations Report (DBIR)', org: 'Verizon Business' }
];

document.addEventListener('DOMContentLoaded', () => {

  /* Stat cards */
  const grid = document.getElementById('statGrid');
  breachStats.forEach((s, i) => {
    const card = document.createElement('article');
    card.className = 'stat-card reveal';
    card.style.transitionDelay = (i * 0.06) + 's';
    card.innerHTML = `
      <div class="stat-figure">
        <span class="stat-prefix">${s.prefix || ''}</span><span class="stat-value" data-target="${s.value}" data-suffix="${s.suffix || ''}">0</span>
      </div>
      <p class="stat-label">${s.label}</p>
      <p class="stat-detail">${s.detail}</p>
      <span class="stat-source">${s.source}</span>`;
    grid.appendChild(card);
  });

  /* Bar chart */
  const barChart = document.getElementById('barChart');
  barData.forEach(b => {
    const row = document.createElement('div');
    row.className = 'bar-row';
    row.innerHTML = `
      <span class="bar-label">${b.label}</span>
      <div class="bar-track"><div class="bar-fill" data-width="${b.value}"><span class="bar-val">${b.value}%</span></div></div>`;
    barChart.appendChild(row);
  });

  /* Sources */
  const sList = document.getElementById('sourcesList');
  sources.forEach(s => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${s.name}</strong><span>${s.org}</span>`;
    sList.appendChild(li);
  });

  /* Dates */
  const now = new Date();
  document.getElementById('year').textContent = now.getFullYear();
  document.getElementById('updated').textContent = now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  /* Nav scroll */
  const nav = document.getElementById('nav');
  const onScroll = () => { if (window.scrollY > 30) nav.classList.add('scrolled'); else nav.classList.remove('scrolled'); };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Mobile menu */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', () => mobileMenu.classList.remove('open')));

  /* Reveal */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  /* Count-up + bar animation */
  const animIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      if (el.classList.contains('stat-value')) countUp(el, parseFloat(el.dataset.target), el.dataset.suffix || '');
      if (el.classList.contains('bar-fill')) el.style.width = el.dataset.width + '%';
      animIO.unobserve(el);
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('.stat-value, .bar-fill').forEach(el => animIO.observe(el));

  function countUp(el, target, suffix) {
    const dur = 1500, start = performance.now();
    const isDecimal = target % 1 !== 0;
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const current = eased * target;
      el.textContent = (isDecimal ? current.toFixed(1) : Math.round(current)) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
});
