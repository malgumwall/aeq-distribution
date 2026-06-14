/* ============================================================
   AEQ Distribution - landing page behavior
   ------------------------------------------------------------
   👉 EDIT THIS to go live:
      WHATSAPP_NUMBER : full international number, digits only
                        (country code + number, NO "+", spaces, or dashes)
   Every CTA on the page then opens WhatsApp automatically.
   ============================================================ */
const CONFIG = {
  // Example: +1 (555) 123-4567  ->  "15551234567"
  WHATSAPP_NUMBER: "10000000000", // ⚠️ PLACEHOLDER - replace with the real number
  WHATSAPP_MESSAGE: "Hi AEQ Distribution, I'm interested in your wholesale inventory.",
};

(function () {
  "use strict";

  // ---- WhatsApp deep links ----
  const waHref =
    "https://wa.me/" +
    CONFIG.WHATSAPP_NUMBER.replace(/\D/g, "") +
    "?text=" +
    encodeURIComponent(CONFIG.WHATSAPP_MESSAGE);

  document.querySelectorAll(".js-whatsapp").forEach(function (el) {
    el.setAttribute("href", waHref);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });

  // ---- Sticky nav shadow ----
  const nav = document.getElementById("nav");
  const onScroll = function () {
    if (nav) nav.classList.toggle("is-stuck", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // ---- Mobile menu ----
  const burger = document.getElementById("burger");
  const mobile = document.getElementById("navMobile");
  if (burger && mobile) {
    burger.addEventListener("click", function () {
      const open = mobile.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", String(open));
    });
    mobile.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mobile.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ---- Footer year ----
  const yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  // ---- Scroll reveal via IntersectionObserver ----
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const revealEls = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    const io = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  }
})();
