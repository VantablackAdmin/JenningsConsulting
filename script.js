/* ============================================================
   JENNINGS CONSULTING — script.js
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  /* Nav: solid-ish background after scrolling */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 50) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Mobile menu */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
    document.querySelectorAll('.mobile-link').forEach(link =>
      link.addEventListener('click', () => mobileMenu.classList.remove('open')));
  }

  /* Reveal-on-scroll */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  /* Footer year */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Contact form (Web3Forms) */
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');
  const submitBtn = form && form.querySelector('button[type="submit"]');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      formData.append('access_key', '0b86cd49-03ba-4f35-82fa-45c2c0707002');

      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending…';
      submitBtn.disabled = true;
      note.textContent = '';

      try {
        const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
        const data = await response.json();
        if (response.ok) {
          note.textContent = 'Message sent — we\'ll be in touch within one business day.';
          note.style.color = '';
          form.reset();
        } else {
          note.textContent = 'Error: ' + data.message;
          note.style.color = 'var(--violet-bright)';
        }
      } catch {
        note.textContent = 'Something went wrong. Please try again or email us directly.';
        note.style.color = 'var(--violet-bright)';
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }
});
