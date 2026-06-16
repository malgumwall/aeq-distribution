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

  // ---- Count-up stats ----
  function countUp(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    if (isNaN(target)) return;
    if (reduceMotion) { el.textContent = String(target); return; }
    var start = null, dur = 1300;
    function tick(t) {
      if (start === null) start = t;
      var p = Math.min((t - start) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  var statEls = document.querySelectorAll("[data-count]");
  if (statEls.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      statEls.forEach(countUp);
    } else {
      var statIO = new IntersectionObserver(function (es, ob) {
        es.forEach(function (e) {
          if (e.isIntersecting) { countUp(e.target); ob.unobserve(e.target); }
        });
      }, { threshold: 0.4 });
      statEls.forEach(function (el) { statIO.observe(el); });
    }
  }

  var finePointer = window.matchMedia("(pointer: fine)").matches;

  // ---- Hero mouse parallax ----
  var hero = document.querySelector(".hero");
  if (hero && !reduceMotion && finePointer) {
    var pending = false, nx = 0, ny = 0;
    hero.addEventListener("mousemove", function (e) {
      var r = hero.getBoundingClientRect();
      nx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ny = ((e.clientY - r.top) / r.height - 0.5) * 2;
      if (!pending) {
        pending = true;
        requestAnimationFrame(function () {
          hero.style.setProperty("--mx", nx.toFixed(3));
          hero.style.setProperty("--my", ny.toFixed(3));
          pending = false;
        });
      }
    });
    hero.addEventListener("mouseleave", function () {
      hero.style.setProperty("--mx", "0");
      hero.style.setProperty("--my", "0");
    });
  }

  // ---- 3D tilt on cards ----
  if (!reduceMotion && finePointer) {
    document.querySelectorAll(".load, .gs-card, .quote").forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform =
          "perspective(760px) rotateX(" + (-py * 5).toFixed(2) +
          "deg) rotateY(" + (px * 5).toFixed(2) + "deg) translateY(-6px)";
      });
      el.addEventListener("mouseleave", function () { el.style.transform = ""; });
    });
  }
})();
