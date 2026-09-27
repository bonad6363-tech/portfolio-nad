(() => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const items = document.querySelectorAll("[data-reveal]");

  if (items.length) {
    if (prefersReduced) {
      items.forEach((el) => el.classList.add("is-visible"));
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          });
        },
        {
          threshold: 0.16,
          rootMargin: "0px 0px -6% 0px",
        }
      );

      items.forEach((el) => {
        const group = el.parentElement;
        if (group) {
          const siblings = [...group.children].filter((child) =>
            child.hasAttribute("data-reveal")
          );
          const localIndex = siblings.indexOf(el);
          if (localIndex > 0) {
            el.style.transitionDelay = `${localIndex * 80}ms`;
          }
        }
        observer.observe(el);
      });
    }
  }

  /* Mobile nav: close after link click */
  const navToggle = document.getElementById("nav-toggle");
  const nav = document.querySelector(".nav");
  if (navToggle && nav) {
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.checked = false;
      });
    });
  }
})();
