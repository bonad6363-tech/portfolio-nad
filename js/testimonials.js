(() => {
  const section = document.querySelector("#testimonials");
  if (!section) return;

  const testimonials = [
    {
      quote:
        "Сайт получился не шаблонным, а живым. С первого экрана сразу понятно, кто я и чем могу быть полезна.",
      name: "Алина К.",
      role: "эксперт, личный бренд",
    },
    {
      quote:
        "Быстро собрали структуру, тексты и визуал. Страница стала понятнее, а заявки начали приходить чаще.",
      name: "Максим Р.",
      role: "digital-продукт",
    },
    {
      quote:
        "Понравилось, что думали не только о дизайне, но и о логике. Всё выглядит современно и собранно.",
      name: "Ирина С.",
      role: "креатор / AI-специалист",
    },
    {
      quote:
        "От идеи до запуска прошли быстро и без хаоса. Получился сайт с характером, а не просто красивая обложка.",
      name: "Studio N.",
      role: "студия",
    },
  ];

  const panel = section.querySelector(".testimonial-panel");
  const quoteEl = section.querySelector(".testimonial-quote");
  const nameEl = section.querySelector(".testimonial-name");
  const roleEl = section.querySelector(".testimonial-role");
  const cardsWrap = section.querySelector(".testimonial-cards");
  const dotsWrap = section.querySelector(".testimonial-dots");
  const prevBtn = section.querySelector(".testimonial-arrow--prev");
  const nextBtn = section.querySelector(".testimonial-arrow--next");

  let activeIndex = 0;
  let isAnimating = false;

  function renderControls() {
    cardsWrap.innerHTML = testimonials
      .map(
        (item, index) => `
          <button
            class="testimonial-card${index === activeIndex ? " is-active" : ""}"
            type="button"
            role="tab"
            aria-selected="${index === activeIndex}"
            aria-controls="testimonial-panel"
            data-index="${index}"
          >
            <span class="testimonial-card__index">0${index + 1}</span>
            <span class="testimonial-card__name">${item.name}</span>
            <span class="testimonial-card__role">${item.role}</span>
          </button>
        `
      )
      .join("");

    dotsWrap.innerHTML = testimonials
      .map(
        (_, index) => `
          <button
            class="testimonial-dot${index === activeIndex ? " is-active" : ""}"
            type="button"
            role="tab"
            aria-label="Отзыв ${index + 1}"
            aria-selected="${index === activeIndex}"
            data-index="${index}"
          ></button>
        `
      )
      .join("");
  }

  function setActive(index) {
    if (isAnimating || index === activeIndex) return;

    isAnimating = true;
    panel.classList.add("is-switching");

    window.setTimeout(() => {
      activeIndex = index;
      const item = testimonials[activeIndex];

      quoteEl.textContent = item.quote;
      nameEl.textContent = item.name;
      roleEl.textContent = item.role;

      renderControls();
      panel.classList.remove("is-switching");
      isAnimating = false;
    }, 220);
  }

  function next() {
    setActive((activeIndex + 1) % testimonials.length);
  }

  function prev() {
    setActive((activeIndex - 1 + testimonials.length) % testimonials.length);
  }

  cardsWrap.addEventListener("click", (event) => {
    const card = event.target.closest(".testimonial-card");
    if (!card) return;
    setActive(Number(card.dataset.index));
  });

  dotsWrap.addEventListener("click", (event) => {
    const dot = event.target.closest(".testimonial-dot");
    if (!dot) return;
    setActive(Number(dot.dataset.index));
  });

  prevBtn.addEventListener("click", prev);
  nextBtn.addEventListener("click", next);

  quoteEl.textContent = testimonials[0].quote;
  nameEl.textContent = testimonials[0].name;
  roleEl.textContent = testimonials[0].role;
  renderControls();
})();
