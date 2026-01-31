/* ===== ASEMAT AL TEEB — Enhanced UX Scripts ===== */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    setYear();
    initMobileMenu();
    initStickyHeader();
    initScrollToTop();
    initSmoothScroll();
    initContactForm();
    initScrollAnimations();
  }

  /* --- Year in footer --- */
  function setYear() {
    const el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* --- Mobile hamburger menu --- */
  function initMobileMenu() {
    const toggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.classList.toggle('active', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking a link
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* --- Sticky header shadow on scroll --- */
  function initStickyHeader() {
    const header = document.getElementById('header');
    if (!header) return;

    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* --- Scroll to top button --- */
  function initScrollToTop() {
    const btn = document.getElementById('scrollTop');
    if (!btn) return;

    const toggle = () => {
      btn.classList.toggle('visible', window.scrollY > 400);
    };
    window.addEventListener('scroll', toggle, { passive: true });
    toggle();

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* --- Smooth scroll for anchor links --- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        const id = link.getAttribute('href');
        if (id.length < 2) return;
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          const offset = 80; // header height
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  }

  /* --- Contact form with validation and loading state --- */
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async e => {
      e.preventDefault();
      clearErrors(form);

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      let valid = true;

      if (!name) { showError(form.name, 'Please enter your name'); valid = false; }
      if (!email || !isValidEmail(email)) { showError(form.email, 'Enter a valid email'); valid = false; }
      if (!message) { showError(form.message, 'Please write a message'); valid = false; }

      if (!valid) return;

      const btn = form.querySelector('.btn-submit');
      btn.classList.add('loading');

      // Simulate network delay
      await delay(1200);

      btn.classList.remove('loading');
      alert(`Thanks, ${name}! Your message has been sent. We'll be in touch soon.`);
      form.reset();
    });
  }

  function showError(input, msg) {
    const group = input.closest('.form-group');
    if (group) {
      group.classList.add('error');
      const err = group.querySelector('.form-error');
      if (err) err.textContent = msg;
    }
  }

  function clearErrors(form) {
    form.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));
    form.querySelectorAll('.form-error').forEach(e => e.textContent = '');
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function delay(ms) {
    return new Promise(r => setTimeout(r, ms));
  }

  /* --- Simple scroll-triggered animations --- */
  function initScrollAnimations() {
    const items = document.querySelectorAll('[data-aos]');
    if (!items.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.aosDelay || 0;
          setTimeout(() => entry.target.classList.add('aos-animate'), delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    items.forEach(el => observer.observe(el));
  }
})();
