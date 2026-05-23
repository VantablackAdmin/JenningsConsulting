/* ============================================================
   JENNINGS CONSULTING — stats.js
   All data lives in the arrays below. To update next year, edit
   the numbers/sources here — nothing else needs to change.
   ============================================================ */

/* ---------- HEADLINE STAT CARDS ----------
   value      : the number to count up to
   prefix     : e.g. "$" (optional)
   suffix     : e.g. "%", "K", "x" (optional)
   label      : short bold takeaway
   detail     : one-line context
   source     : short attribution shown on the card                */
const breachStats = [
  {
    value: 88, suffix: '%',
    label: 'of small-business breaches involve ransomware',
    detail: 'Versus 39% for large enterprises — attackers go where defenses are thinnest.',
    source: 'Verizon 2025 DBIR'
  },
  {
    value: 43, suffix: '%',
    label: 'of all cyberattacks target small businesses',
    detail: 'SMBs are hit nearly four times as often as larger organizations.',
    source: 'Verizon 2025 DBIR'
  },
  {
    value: 60, suffix: '%',
    label: 'of small businesses close within 6 months of an attack',
    detail: 'A single incident is an existential event for a small company — not just an IT problem.',
    source: 'Widely cited (Cybersecurity Ventures / multiple)'
  },
  {
    value: 115, prefix: '$', suffix: 'K',
    label: 'median ransom payment',
    detail: 'And paying is no guarantee — many who pay never recover all their data.',
    source: 'Verizon 2025 DBIR'
  },
  {
    value: 50, prefix: '$', suffix: 'K',
    label: 'median loss from business email compromise',
    detail: 'A single convincing email impersonating a vendor or executive.',
    source: 'Verizon 2025 DBIR'
  },
  {
    value: 43, suffix: '%',
    label: 'of small businesses have no dedicated security staff',
    detail: 'The protection gap is rarely about tools — it is about no one owning the problem.',
    source: 'Industry reporting, 2025'
  }
];

/* ---------- BAR CHART: ransomware share by org size ---------- */
const barData = [
  { label: 'Small &amp; mid-size business', value: 88 },
  { label: 'Large enterprise',              value: 39 }
];

/* ---------- DONUT: leading initial-access vectors ----------
   Note: vectors are not mutually exclusive across reports; values
   are representative shares from the 2025 DBIR for illustration.  */
const donutData = [
  { label: 'Stolen / abused credentials', value: 22, color: 'var(--gold)' },
  { label: 'Vulnerability exploitation',  value: 20, color: 'var(--gold-soft)' },
  { label: 'Phishing',                    value: 16, color: '#a8525c' },
  { label: 'Everything else',             value: 42, color: '#4a3f3a' }
];

/* ---------- SOURCES ---------- */
const sources = [
  { name: 'Verizon 2025 Data Breach Investigations Report (DBIR)', org: 'Verizon Business' },
  { name: 'Cost of a Data Breach Report 2025', org: 'IBM / Ponemon Institute' },
  { name: 'Internet Crime Report', org: 'FBI Internet Crime Complaint Center (IC3)' },
  { name: 'Small business cybersecurity statistics, 2025–2026', org: 'Aggregated industry reporting' }
];


/* ============================================================
   RENDERING
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  /* ----- Stat cards ----- */
  const grid = document.getElementById('statGrid');
  breachStats.forEach((s, i) => {
    const card = document.createElement('article');
    card.className = 'stat-card reveal';
    card.style.transitionDelay = (i * 0.06) + 's';
    card.innerHTML = `
      <div class="stat-figure">
        <span class="stat-prefix">${s.prefix || ''}</span><span class="stat-value"
          data-target="${s.value}" data-suffix="${s.suffix || ''}">0</span>
      </div>
      <p class="stat-label">${s.label}</p>
      <p class="stat-detail">${s.detail}</p>
      <span class="stat-source">${s.source}</span>`;
    grid.appendChild(card);
  });

  /* ----- Bar chart ----- */
  const barChart = document.getElementById('barChart');
  barData.forEach(b => {
    const row = document.createElement('div');
    row.className = 'bar-row';
    row.innerHTML = `
      <span class="bar-label">${b.label}</span>
      <div class="bar-track">
        <div class="bar-fill" data-width="${b.value}">
          <span class="bar-val">${b.value}%</span>
        </div>
      </div>`;
    barChart.appendChild(row);
  });

  /* ----- Donut (SVG stroke-dasharray technique) ----- */
  const donut = document.getElementById('donut');
  const legend = document.getElementById('donutLegend');
  const radius = 15.915;            // circumference = 100, so values map 1:1 to %
  let offset = 25;                  // start at 12 o'clock
  donutData.forEach(d => {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('class', 'donut-seg');
    circle.setAttribute('cx', '21'); circle.setAttribute('cy', '21');
    circle.setAttribute('r', radius);
    circle.setAttribute('fill', 'transparent');
    circle.setAttribute('stroke', d.color);
    circle.setAttribute('stroke-width', '5');
    circle.setAttribute('stroke-dasharray', `0 100`);   // animate to value
    circle.setAttribute('stroke-dashoffset', offset);
    circle.dataset.value = d.value;
    donut.appendChild(circle);
    offset -= d.value;                                   // next segment start

    const li = document.createElement('li');
    li.innerHTML = `<span class="legend-dot" style="background:${d.color}"></span>
      <span class="legend-label">${d.label}</span>
      <span class="legend-val">${d.value}%</span>`;
    legend.appendChild(li);
  });

  /* ----- Sources list ----- */
  const sList = document.getElementById('sourcesList');
  sources.forEach(s => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${s.name}</strong><span>${s.org}</span>`;
    sList.appendChild(li);
  });

  /* ----- Footer dates ----- */
  const now = new Date();
  document.getElementById('year').textContent = now.getFullYear();
  document.getElementById('updated').textContent =
    now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  /* ----- Nav: keep solid on this page, but still react to scroll for shadow ----- */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 30) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ----- Mobile menu ----- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  document.querySelectorAll('.mobile-link').forEach(l =>
    l.addEventListener('click', () => mobileMenu.classList.remove('open')));

  /* ----- Reveal-on-scroll ----- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  /* ----- Count-up + bar/donut animation when scrolled into view ----- */
  const animIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;

      if (el.classList.contains('stat-value')) {
        countUp(el, parseInt(el.dataset.target, 10), el.dataset.suffix || '');
      }
      if (el.classList.contains('bar-fill')) {
        el.style.width = el.dataset.width + '%';
      }
      if (el.classList.contains('donut-seg')) {
        const v = parseFloat(el.dataset.value);
        el.style.strokeDasharray = `${v} ${100 - v}`;
      }
      animIO.unobserve(el);
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('.stat-value, .bar-fill, .donut-seg')
    .forEach(el => animIO.observe(el));

  function countUp(el, target, suffix) {
    const dur = 1500, start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
});
