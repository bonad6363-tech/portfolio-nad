(() => {
  const el = document.querySelector('[data-text-type]');
  if (!el) return;

  const raw = el.dataset.texts || '';
  const texts = raw.split('|||').map(t => t.replace(/\\n/g, '\n'));
  const typingSpeed = parseInt(el.dataset.typingSpeed, 10) || 75;
  const deletingSpeed = parseInt(el.dataset.deletingSpeed, 10) || 50;
  const pauseDuration = parseInt(el.dataset.pauseDuration, 10) || 1500;
  const cursorChar = el.dataset.cursorCharacter || '_';
  const cursorBlink = el.dataset.cursorBlink || '0.5';
  const loop = true;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function renderHTML(str) {
    const lines = str.split('\n');
    if (lines.length <= 1) return escapeHTML(str);
    const last = lines.pop();
    return lines.map(l => escapeHTML(l)).join('<br>') + '<br><em>' + escapeHTML(last) + '</em>';
  }

  function escapeHTML(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  const contentSpan = document.createElement('span');
  contentSpan.className = 'text-type__content';

  const cursorSpan = document.createElement('span');
  cursorSpan.className = 'text-type__cursor';
  cursorSpan.textContent = cursorChar;
  cursorSpan.style.setProperty('--cursor-blink', cursorBlink + 's');

  el.textContent = '';
  el.appendChild(contentSpan);
  el.appendChild(cursorSpan);

  if (prefersReduced) {
    contentSpan.innerHTML = renderHTML(texts[0]);
    return;
  }

  let textIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function tick() {
    const fullText = texts[textIdx];

    if (!isDeleting) {
      charIdx++;
      contentSpan.innerHTML = renderHTML(fullText.slice(0, charIdx));

      if (charIdx >= fullText.length) {
        // Одна фраза — напечатали и всё, курсор мигает дальше
        if (!loop) return;
        // Несколько фраз — пауза, потом стираем
        setTimeout(() => { isDeleting = true; tick(); }, pauseDuration);
        return;
      }
      setTimeout(tick, typingSpeed);
    } else {
      charIdx--;
      contentSpan.innerHTML = renderHTML(fullText.slice(0, charIdx));

      if (charIdx <= 0) {
        isDeleting = false;
        textIdx = (textIdx + 1) % texts.length;
        setTimeout(tick, typingSpeed * 2);
        return;
      }
      setTimeout(tick, deletingSpeed);
    }
  }

  setTimeout(tick, 500);
})();
