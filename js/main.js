(function () {
  "use strict";

  var root = document.documentElement;

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

  /* ---------- Highlight the section in view (desktop nav) ---------- */

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
    var atBottom = window.innerHeight + window.scrollY >= root.scrollHeight - 2;
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
    var resetTimer;

    copyButton.addEventListener("click", function () {
      var email = copyButton.dataset.email;
      var copy = navigator.clipboard
        ? navigator.clipboard.writeText(email)
        : Promise.reject(new Error("Clipboard API unavailable"));

      copy
        .then(function () {
          copyButton.textContent = "Copied";
          clearTimeout(resetTimer);
          resetTimer = setTimeout(function () {
            copyButton.textContent = "Copy";
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
