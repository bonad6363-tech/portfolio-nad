(() => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const items = document.querySelectorAll("[data-reveal]");

  if (!items.length) return;

  if (prefersReduced) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  items.forEach((el) => {
    const group = el.parentElement;
    if (group) {
      const siblings = [...group.children].filter((child) => child.hasAttribute("data-reveal"));
      const localIndex = siblings.indexOf(el);
      if (localIndex > 0) {
        const step = group.classList.contains("badges") || group.classList.contains("audience") ? 70 : 90;
        el.style.setProperty("--reveal-delay", `${localIndex * step}ms`);
      }
    }

    observer.observe(el);
  });
})();
