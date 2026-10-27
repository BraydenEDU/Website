/* Annuit site behavior: nav menu, language demo, calculator, demo form, event tracking. */
(function () {
  "use strict";

  // ---- Analytics: sends named events to whichever provider is loaded (see site.yaml).
  function track(name, props) {
    try {
      if (typeof window.plausible === "function") window.plausible(name, props ? { props: props } : undefined);
      else if (typeof window.va === "function") window.va("event", { name: name, data: props || {} });
      else console.debug("[track]", name, props || "");
    } catch (e) { /* tracking never breaks the page */ }
  }
  window.annuitTrack = track;

  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-track]");
    if (el) track(el.getAttribute("data-track"));
  });

  document.querySelectorAll("[data-track-video]").forEach(function (v) {
    v.addEventListener("play", function () { track(v.getAttribute("data-track-video") + "_play"); }, { once: true });
  });

  // ---- Mobile nav
  var toggle = document.getElementById("nav-toggle");
  var menu = document.getElementById("nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) { menu.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }
    });
  }

  // ---- Follow-up message language toggle (hero mockup)
  var tabs = document.querySelectorAll("[data-msg-lang]");
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var code = tab.getAttribute("data-msg-lang");
      tabs.forEach(function (t) { t.setAttribute("aria-selected", t === tab ? "true" : "false"); });
      document.querySelectorAll(".draft-body").forEach(function (p) { p.hidden = p.id !== "msg-" + code; });
      track("hero_message_language", { lang: code });
    });
  });

  // ---- Hours calculator
  var calc = document.getElementById("calc-form");
  if (calc) {
    var clients = document.getElementById("calc-clients");
    var rounds = document.getElementById("calc-rounds");
    var minutes = document.getElementById("calc-minutes");
    var out = document.getElementById("calc-hours");
    var nf = new Intl.NumberFormat(document.documentElement.lang || "en", { maximumFractionDigits: 0 });
    var used = false;
    function num(el) { var v = parseFloat(el.value); return isFinite(v) && v > 0 ? v : 0; }
    function update() {
      out.value = nf.format(Math.round((num(clients) * num(rounds) * num(minutes)) / 60));
      out.textContent = out.value;
      if (!used) { used = true; track("calculator_used"); }
    }
    calc.addEventListener("input", update);
    calc.addEventListener("submit", function (e) { e.preventDefault(); });
    out.textContent = nf.format(Math.round((num(clients) * num(rounds) * num(minutes)) / 60));
  }

  // ---- Demo request form (placeholder until a booking tool is connected)
  var form = document.getElementById("demo-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      document.getElementById("demo-sent").hidden = false;
      track("demo_request_submitted", { clients: form.clients.value });
    });
  }
})();
