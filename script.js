/* ==========================================================================
   OFFPAGE — interactions
   1. The one motion moment: hero ledger loads in full ink, then zero-referring
      rows fade to ghost, one every 60ms, top to bottom. Plays on load and on
      each check. Respects prefers-reduced-motion by rendering the end state.
   2. Sticky nav shadow after 400px.
   3. Problem-section archive grid (54 ghost / 6 ink).
   4. Free-check demo: validates a domain and shows a sample result on screen.
      (No real crawl — wire the /check endpoint per blueprint §5 before launch.)
   ========================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- 1. Ledger fade animation ---------------------------------------- */
  function playLedger() {
    var rows = document.querySelectorAll("#ledger .ledger__row--invisible");
    if (reduceMotion) {
      rows.forEach(function (r) { r.classList.add("is-faded"); });
      return;
    }
    rows.forEach(function (r) { r.classList.remove("is-faded"); });
    rows.forEach(function (row, i) {
      setTimeout(function () { row.classList.add("is-faded"); }, 300 + i * 60);
    });
  }
  playLedger();

  /* ---- 2. Sticky nav shadow -------------------------------------------- */
  var nav = document.getElementById("nav");
  function onScroll() {
    if (window.scrollY > 400) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- 3. Archive grid (60 squares, 6 ink) ----------------------------- */
  var grid = document.getElementById("archive-grid");
  if (grid) {
    var inkIndexes = [7, 13, 22, 34, 41, 55];
    for (var i = 0; i < 60; i++) {
      var cell = document.createElement("span");
      cell.className = "archive__cell" + (inkIndexes.indexOf(i) > -1 ? " ink" : "");
      grid.appendChild(cell);
    }
  }

  /* ---- 4. Free-check demo ---------------------------------------------- */
  // Extremely light domain validation. The real endpoint must rate-limit by IP,
  // validate + cache by domain for 24h, and cap the crawl (blueprint §5).
  var DOMAIN_RE = /^([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i;

  function normalize(v) {
    return v.trim().toLowerCase()
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "")
      .replace(/\/.*$/, "");
  }

  // Deterministic sample so a given domain always returns the same number.
  function sampleFor(domain) {
    var h = 0;
    for (var i = 0; i < domain.length; i++) h = (h * 31 + domain.charCodeAt(i)) % 100000;
    var total = 12 + (h % 24);          // 12–35 posts
    var invisible = Math.round(total * (0.6 + (h % 35) / 100)); // 60–95%
    if (invisible > total) invisible = total;
    return { total: total, invisible: invisible };
  }

  function runCheck(input, resultEl) {
    var raw = input.value;
    var domain = normalize(raw);
    resultEl.hidden = false;
    resultEl.classList.remove("error");

    if (!domain || !DOMAIN_RE.test(domain)) {
      resultEl.classList.add("error");
      resultEl.textContent = "That doesn't look like a domain. Try yourpractice.com";
      return;
    }

    resultEl.textContent = "Reading " + domain + "…";

    setTimeout(function () {
      var s = sampleFor(domain);
      // Update the hero ledger label + figure and replay the fade.
      var domEl = document.getElementById("ledger-domain");
      var figEl = document.getElementById("ledger-figure");
      if (domEl) domEl.textContent = domain;
      if (figEl) figEl.textContent = s.invisible + " of " + s.total;
      playLedger();

      resultEl.classList.remove("error");
      resultEl.innerHTML =
        "Checked. <strong>" + s.invisible + " of " + s.total +
        "</strong> posts have zero referring domains. Want the ranked list of exactly which ones? " +
        '<a href="#pricing" style="text-decoration:underline">Get the $200 audit →</a>';

      var scrollTarget = document.getElementById("ledger");
      if (scrollTarget && input.closest(".final")) {
        scrollTarget.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
      }
    }, reduceMotion ? 0 : 900);
  }

  function wire(formId, inputId, resultId) {
    var form = document.getElementById(formId);
    if (!form) return;
    var input = document.getElementById(inputId);
    var result = resultId
      ? document.getElementById(resultId)
      : (function () {
          var p = document.createElement("p");
          p.className = "final__risk";
          p.hidden = true;
          form.parentNode.insertBefore(p, form.nextSibling);
          return p;
        })();
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      runCheck(input, result);
    });
  }

  wire("check-form", "check-input", "check-result");
  wire("check-form-2", "check-input-2", null);
})();
