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

  // ---- Contact form -> WhatsApp ----
  const contact = document.getElementById("contactForm");
  if (contact) {
    contact.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!contact.reportValidity()) return;
      const v = function (id) {
        const el = document.getElementById(id);
        return el ? el.value.trim() : "";
      };
      const lines = [
        "*New message — AEQ Distribution*",
        "",
        "Name: " + v("c_name"),
        "Email: " + v("c_email"),
        "Message: " + v("c_msg"),
      ];
      const url =
        "https://wa.me/" +
        CONFIG.WHATSAPP_NUMBER.replace(/\D/g, "") +
        "?text=" +
        encodeURIComponent(lines.join("\n"));
      window.open(url, "_blank", "noopener");
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

  // ---- Hero logo: slow spin when idle, snap upright + bob on interaction ----
  const heroSpin = document.querySelector(".hero__logo-spin");
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (heroSpin && !prefersReduced) {
    let idleTimer;
    const resumeSpin = function () {
      document.body.classList.remove("logo-interacting");
      heroSpin.style.transition = "";
      heroSpin.style.transform = "";
      heroSpin.style.animation = "";
    };
    const interact = function () {
      if (!document.body.classList.contains("logo-interacting")) {
        // freeze the current rotation, then smoothly snap upright
        const cur = getComputedStyle(heroSpin).transform;
        heroSpin.style.transform = cur && cur !== "none" ? cur : "rotate(0deg)";
        heroSpin.style.animation = "none";
        void heroSpin.offsetWidth; // reflow so the transition takes
        heroSpin.style.transition = "transform .45s cubic-bezier(.2,.7,.2,1)";
        heroSpin.style.transform = "rotate(0deg)";
        document.body.classList.add("logo-interacting");
      }
      clearTimeout(idleTimer);
      idleTimer = setTimeout(resumeSpin, 2600); // back to spinning after a pause
    };
    window.addEventListener("scroll", interact, { passive: true });
    window.addEventListener("click", interact);
    window.addEventListener("touchstart", interact, { passive: true });
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
