/* ============================================================
   JENNINGS CONSULTING — script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Hero parallax (img-based, works locally + on server) ---------- */
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const offset = window.scrollY * 0.4;
      heroBg.style.transform = `scale(1.04) translateY(${offset}px)`;
    }, { passive: true });
  }

  /* ---------- Nav: solid background after scrolling past hero ---------- */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 60) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
  document.querySelectorAll('.mobile-link').forEach(link =>
    link.addEventListener('click', () => mobileMenu.classList.remove('open'))
  );

  /* ---------- Reveal-on-scroll ---------- */
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  reveals.forEach(el => io.observe(el));

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Contact form (front-end stub) ----------
     To make this actually send mail, point the <form action> in index.html
     at a service like Formspree or Web3Forms and remove this preventDefault. */
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      note.textContent = 'Thanks — this is a demo form. Wire it to Formspree/Web3Forms to go live.';
      form.reset();
    });
  }

});
