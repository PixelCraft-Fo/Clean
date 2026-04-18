'use strict';

/* ============================================================
   All Clean — js/main.js
   Scripturi comune pentru toate paginile
   ============================================================ */

/* ============================================================
   1. Sync body padding-top with fixed header height
   ============================================================ */
function updateLayout() {
  var header = document.querySelector('.site-header');
  if (!header) return;
  var h = header.offsetHeight;
  document.body.style.paddingTop = h + 'px';
  document.documentElement.style.setProperty('--header-height', h + 'px');
}

/* ============================================================
   2. Hamburger menu
   ============================================================ */
function initHamburger() {
  var hamburger = document.getElementById('hamburger');
  var navMenu   = document.getElementById('nav-menu');
  if (!hamburger || !navMenu) return;

  function openMenu() {
    navMenu.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.textContent = '✕';
  }

  function closeMenu() {
    navMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.textContent = '☰';
  }

  hamburger.addEventListener('click', function (e) {
    e.stopPropagation();
    navMenu.classList.contains('open') ? closeMenu() : openMenu();
  });

  navMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', function (e) {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });
}

/* ============================================================
   3. Active nav link (detected from current filename)
   ============================================================ */
function setActiveNavLink() {
  var path = window.location.pathname;
  var page = path.split('/').pop() || 'index.html';
  if (page === '') page = 'index.html';

  document.querySelectorAll('.nav-menu a').forEach(function (link) {
    var href = (link.getAttribute('href') || '').replace(/^\.\//, '');
    if (href === page) {
      link.classList.add('active');
    }
  });
}

/* ============================================================
   4. Scroll-triggered section animations
   ============================================================ */
function initAnimations() {
  var sections = document.querySelectorAll('.animate-section');
  if (!sections.length) return;

  if (!('IntersectionObserver' in window)) {
    sections.forEach(function (s) { s.classList.add('visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  sections.forEach(function (s) { observer.observe(s); });
}

/* ============================================================
   5. Navbar depth shadow on scroll
   ============================================================ */
function initNavbarScroll() {
  var navbar = document.querySelector('.navbar');
  if (!navbar) return;
  window.addEventListener('scroll', function () {
    navbar.style.boxShadow = window.scrollY > 10
      ? '0 4px 20px rgba(0,119,182,0.16)'
      : '';
  }, { passive: true });
}

/* ============================================================
   6. Init
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  updateLayout();
  initHamburger();
  setActiveNavLink();
  initAnimations();
  initNavbarScroll();
});

window.addEventListener('resize', updateLayout);
