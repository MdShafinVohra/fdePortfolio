/**
 * Shafin — Forward Deployed Engineer portfolio
 * Smooth scroll and active nav highlight for the portfolio site.
 */
(function () {
  "use strict";

  // Smooth scroll for all navigation links
  document.querySelectorAll("a[href^='#']").forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      var targetId = link.getAttribute("href");
      if (targetId === "#" || targetId === "") return;

      var target = document.querySelector(targetId);
      if (!target) return;

      var offset = 80; // offset for sticky nav
      var top = target.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({
        top: top,
        behavior: "smooth"
      });

      // Update URL without scroll jump
      history.pushState(null, "", targetId);
    });
  });

  // Highlight active nav item on scroll
  var sections = document.querySelectorAll("section");
  var navLinks = document.querySelectorAll(".nav__links a");

  if (window.addEventListener) {
    window.addEventListener("scroll", function () {
      var scrollPos = window.pageYOffset || document.documentElement.scrollTop;

      sections.forEach(function (section) {
        var top = section.getBoundingClientRect().top + scrollPos;
        var bottom = top + section.offsetHeight;
        var id = section.getAttribute("id");

        navLinks.forEach(function (link) {
          if (link.getAttribute("href") === "#" + id) {
            var isActive = scrollPos >= top - 100 && scrollPos < bottom - 100;
            link.style.color = isActive ? "var(--primary)" : "";
          }
        });
      });
    });
  }

  // Mobile nav menu toggle
  var nav = document.querySelector(".nav");
  var menuToggle = document.createElement("button");
  menuToggle.className = "nav__toggle";
  menuToggle.setAttribute("aria-label", "Toggle menu");
  menuToggle.innerHTML = "<span></span><span></span><span></span>";

  // Insert toggle before logo
  if (nav.querySelector(".nav__logo")) {
    nav.insertBefore(menuToggle, nav.querySelector(".nav__logo"));
  }

  // Only enable toggle on mobile screens
  function checkMobile() {
    var isMobile = window.innerWidth <= 640;
    menuToggle.style.display = isMobile ? "block" : "none";
  }

  window.addEventListener("resize", checkMobile);
  checkMobile();

  // Toggle mobile menu
  menuToggle.addEventListener("click", function () {
    var links = document.querySelector(".nav__links");
    if (!links) return;

    // Add a temporary class to show links
    links.classList.toggle("nav__links--open");
  });
})();
