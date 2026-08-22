/* ──────────────────────────────────────────────────────────────
   Maison et Jardin 82 — script commun aux pages intérieures.
   Le CMS (data/content.json) reste la source unique : nom de
   l'entreprise, téléphone et description de pied de page sont
   synchronisés ici comme sur l'accueil.
   ────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  /* — Menu — */
  document.addEventListener('DOMContentLoaded', function () {
    var burger = document.getElementById('burger'),
        navLinks = document.getElementById('navLinks');
    if (burger && navLinks) {
      burger.addEventListener('click', function () { navLinks.classList.toggle('open'); });
      navLinks.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () { navLinks.classList.remove('open'); });
      });
    }
    var nav = document.getElementById('nav');
    function onScroll() { if (nav) nav.classList.toggle('scrolled', window.scrollY > 40); }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* — Apparition au défilement — */
    var obs = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
    }, { threshold: .12 });
    document.querySelectorAll('.fade').forEach(function (el) { obs.observe(el); });

    /* — FAQ — */
    document.querySelectorAll('.faq-q').forEach(function (b) {
      b.addEventListener('click', function () {
        var item = b.closest('.faq-item'), a = item.querySelector('.faq-a'),
            open = item.classList.toggle('open');
        a.style.maxHeight = open ? a.scrollHeight + 'px' : 0;
      });
    });
  });

  /* — Synchronisation avec le CMS — */
  fetch('data/content.json')
    .then(function (r) { return r.json(); })
    .then(function (d) {
      if (d.telephone_tel) {
        document.querySelectorAll('.phone-link').forEach(function (a) { a.href = 'tel:' + d.telephone_tel; });
      }
      if (d.telephone_affiche) {
        document.querySelectorAll('.phone-text').forEach(function (s) { s.textContent = d.telephone_affiche; });
      }
      if (d.nom_entreprise) {
        document.querySelectorAll('.brand-name').forEach(function (s) { s.textContent = d.nom_entreprise; });
      }
      if (d.footer_description) {
        document.querySelectorAll('.footer-desc').forEach(function (s) { s.textContent = d.footer_description; });
      }
      if (d.ville) {
        document.querySelectorAll('.brand-ville').forEach(function (s) { s.textContent = d.ville; });
      }
      if (d.annee) {
        document.querySelectorAll('.brand-annee').forEach(function (s) { s.textContent = d.annee; });
      }
    })
    .catch(function (e) { console.error('content.json :', e); });
})();
