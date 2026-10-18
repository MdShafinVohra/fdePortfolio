/**
 * Shafin — Forward Deployed Engineer portfolio
 * Mobile menu, active nav highlight, and the hero deploy sequence.
 */
(function () {
  "use strict";

  // Mobile nav menu
  var toggle = document.querySelector(".nav__toggle");
  var links = document.querySelector(".nav__links");

  function setMenu(open) {
    links.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  }

  toggle.addEventListener("click", function () {
    setMenu(!links.classList.contains("is-open"));
  });

  links.addEventListener("click", function (e) {
    if (e.target.tagName === "A") setMenu(false);
  });

  // Highlight the nav link for the section in view
  var navLinks = document.querySelectorAll(".nav__links a");

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          var match = link.getAttribute("href") === "#" + entry.target.id;
          if (match) link.setAttribute("aria-current", "true");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    document.querySelectorAll("main section").forEach(function (s) {
      observer.observe(s);
    });
  }

  // Hero deploy sequence: each target goes from queued to its final state, once
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var rows = document.querySelectorAll(".deploy__row");
  var foot = document.querySelector(".deploy__foot");

  if (!reduce && rows.length) {
    foot.textContent = "Deploying…";

    rows.forEach(function (row, i) {
      var state = row.querySelector(".deploy__state");
      var final = state.textContent;

      state.textContent = "queued";
      row.classList.add("is-pending");

      setTimeout(function () { state.textContent = "deploying"; }, 500 + i * 650);

      setTimeout(function () {
        state.textContent = final;
        row.classList.remove("is-pending");
        if (i === rows.length - 1) foot.textContent = "All targets live";
      }, 1100 + i * 650);
    });
  }
})();
