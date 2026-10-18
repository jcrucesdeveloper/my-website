(function () {
  "use strict";

  var root = document.documentElement;
  var desktop = window.matchMedia("(min-width: 1100px)");

  /* ---------- Mobile navigation ---------- */

  var navToggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  function setNavOpen(open) {
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  navToggle.addEventListener("click", function () {
    setNavOpen(!nav.classList.contains("is-open"));
  });

  nav.addEventListener("click", function (event) {
    if (event.target.closest("a")) setNavOpen(false);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      setNavOpen(false);
      navToggle.focus();
    }
  });

  desktop.addEventListener("change", function () {
    setNavOpen(false);
  });

  /* ---------- Theme ---------- */

  var themeToggle = document.querySelector(".theme-toggle");
  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  function isDark() {
    var theme = root.dataset.theme;
    return theme ? theme === "dark" : prefersDark.matches;
  }

  function syncThemeToggle() {
    var dark = isDark();
    themeToggle.classList.toggle("is-dark", dark);
    themeToggle.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
  }

  themeToggle.addEventListener("click", function () {
    var next = isDark() ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
    syncThemeToggle();
  });

  prefersDark.addEventListener("change", syncThemeToggle);
  syncThemeToggle();

  /* ---------- Highlight the section in view ---------- */

  var links = Array.prototype.slice.call(document.querySelectorAll(".nav__link"));
  var sections = links
    .map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);

  var ticking = false;

  // The current section is the last one whose top has passed 40% of the
  // viewport; at the very bottom of the page it is always the last section.
  function updateCurrentSection() {
    ticking = false;
    var threshold = window.innerHeight * 0.4;
    var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    var current = sections[0];

    sections.forEach(function (section) {
      if (section.getBoundingClientRect().top <= threshold) current = section;
    });
    if (atBottom) current = sections[sections.length - 1];

    links.forEach(function (link) {
      if (link.getAttribute("href") === "#" + current.id) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function requestUpdate() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(updateCurrentSection);
    }
  }

  if (sections.length) {
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    updateCurrentSection();
  }

  /* ---------- Copy email ---------- */

  var copyButton = document.querySelector(".copy-email");

  if (copyButton) {
    var label = copyButton.querySelector(".copy-email__label");
    var resetTimer;

    copyButton.addEventListener("click", function () {
      var email = copyButton.dataset.email;
      var copy = navigator.clipboard
        ? navigator.clipboard.writeText(email)
        : Promise.reject(new Error("Clipboard API unavailable"));

      copy
        .then(function () {
          copyButton.classList.add("is-copied");
          label.textContent = "Copied!";
          clearTimeout(resetTimer);
          resetTimer = setTimeout(function () {
            copyButton.classList.remove("is-copied");
            label.textContent = "Copy email";
          }, 2000);
        })
        .catch(function () {
          window.location.href = "mailto:" + email;
        });
    });
  }

  /* ---------- Footer year ---------- */

  var year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());
})();
