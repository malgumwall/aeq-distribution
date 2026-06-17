/* ============================================================
   AEQ Distribution - landing page behavior
   ------------------------------------------------------------
   👉 EDIT THIS to go live:
      WHATSAPP_NUMBER : full international number, digits only
                        (country code + number, NO "+", spaces, or dashes)
   Every CTA on the page then opens WhatsApp automatically.
   ============================================================ */
const CONFIG = {
  // Full international number, digits only (country code + number, no "+").
  // +1 (510) 602-0814  ->  "15106020814"
  WHATSAPP_NUMBER: "15106020814",
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

  // ---- Theme toggle (light / dark, remembered) ----
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const isLight = document.documentElement.getAttribute("data-theme") === "light";
      const next = isLight ? "dark" : "light";
      if (next === "light") document.documentElement.setAttribute("data-theme", "light");
      else document.documentElement.removeAttribute("data-theme");
      try { localStorage.setItem("aeq-theme", next); } catch (e) {}
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute("content", next === "light" ? "#ffffff" : "#0d0d10");
    });
  }

  // ---- Sticky nav shadow + scroll progress bar ----
  const nav = document.getElementById("nav");
  const bar = document.getElementById("scrollbar");
  const onScroll = function () {
    if (nav) nav.classList.toggle("is-stuck", window.scrollY > 8);
    if (bar) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      bar.style.width = pct + "%";
    }
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });

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

  // ---- Apply form -> WhatsApp (no backend needed) ----
  const form = document.getElementById("applyForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return; // native validation for required fields

      const val = function (id) {
        const el = document.getElementById(id);
        return el ? el.value.trim() : "";
      };
      const cats = Array.prototype.map
        .call(form.querySelectorAll('input[name="cat"]:checked'), function (c) {
          return c.value;
        })
        .join(", ");

      const lines = [
        "*New wholesale application — AEQ Distribution*",
        "",
        "Name: " + val("f_first") + " " + val("f_last"),
        "Business: " + val("f_biz"),
        "Email: " + val("f_email"),
        "Phone: " + val("f_phone"),
        "Business type: " + val("f_type"),
        "Resale cert: " + (val("f_resale") || "—"),
        "Categories: " + (cats || "—"),
      ];
      const notes = val("f_notes");
      if (notes) lines.push("Notes: " + notes);

      const url =
        "https://wa.me/" +
        CONFIG.WHATSAPP_NUMBER.replace(/\D/g, "") +
        "?text=" +
        encodeURIComponent(lines.join("\n"));
      window.open(url, "_blank", "noopener");
    });
  }

  // ---- Contact form -> email (opens the visitor's mail app) ----
  const CONTACT_EMAIL = "contact@aeqdistribution.co";
  const contact = document.getElementById("contactForm");
  if (contact) {
    contact.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!contact.reportValidity()) return;
      const v = function (id) {
        const el = document.getElementById(id);
        return el ? el.value.trim() : "";
      };
      const name = v("c_name");
      const subject = "Website enquiry" + (name ? " from " + name : "");
      const body = [
        "Name: " + name,
        "Email: " + v("c_email"),
        "",
        "Message:",
        v("c_msg"),
      ].join("\n");
      const url =
        "mailto:" + CONTACT_EMAIL +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
      window.location.href = url;
    });
  }

  // ---- Carousel arrows (reviews) ----
  document.querySelectorAll(".carousel__btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var track = document.getElementById(btn.getAttribute("data-carousel"));
      if (!track) return;
      var card = track.querySelector(".quote");
      var step = card ? card.getBoundingClientRect().width + 26 : 360;
      track.scrollBy({ left: step * parseInt(btn.getAttribute("data-dir"), 10), behavior: "smooth" });
    });
  });

  // ---- Reviews progress bar (reflects scroll position) ----
  const revTrack = document.getElementById("reviewsTrack");
  const revBar = document.getElementById("revProgress");
  if (revTrack && revBar) {
    const updateBar = function () {
      const max = revTrack.scrollWidth - revTrack.clientWidth;
      const visible = revTrack.clientWidth / revTrack.scrollWidth; // fraction shown
      const w = Math.max(0.18, Math.min(visible, 1));
      const pct = max > 0 ? revTrack.scrollLeft / max : 0;
      revBar.style.width = w * 100 + "%";
      revBar.style.left = pct * (100 - w * 100) + "%";
    };
    updateBar();
    revTrack.addEventListener("scroll", updateBar, { passive: true });
    window.addEventListener("resize", updateBar, { passive: true });
  }

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
