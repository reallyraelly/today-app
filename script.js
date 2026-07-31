/* ==========================================================================
   Today — shared onboarding behaviour
   Modular helpers reused across onboarding1.html, onboarding2.html,
   onboarding3.html, and home.html.
   ========================================================================== */

/** Navigate to another page with a brief fade-out, matching .screen's CSS. */
function goTo(url) {
  const screen = document.querySelector('.screen');
  if (!screen) { window.location.href = url; return; }
  screen.classList.add('fade-out');
  setTimeout(() => { window.location.href = url; }, 300);
}

/** Wire up every element with [data-href] to use the fade transition. */
function initLinks() {
  document.querySelectorAll('[data-href]').forEach(el => {
    el.addEventListener('click', () => goTo(el.dataset.href));
  });
}

/**
 * Toggle-selectable chips/cards.
 * @param {string} selector - elements to make toggleable
 * @param {object} opts
 *   - group: if set, only one selected at a time within elements sharing the same [data-group] value
 *   - onChange: callback(selectedEls) fired after every toggle
 */
function initSelectable(selector, opts = {}) {
  const els = Array.from(document.querySelectorAll(selector));
  els.forEach(el => {
    el.addEventListener('click', () => {
      if (opts.group) {
        const groupName = el.dataset.group;
        els
          .filter(other => other.dataset.group === groupName)
          .forEach(other => other.classList.remove('selected'));
        el.classList.add('selected');
      } else {
        el.classList.toggle('selected');
      }
      if (opts.onChange) {
        opts.onChange(els.filter(e => e.classList.contains('selected')));
      }
    });
  });
  return els;
}

/** Enable a button only once `isReady()` returns true. */
function bindReadyState(button, isReady) {
  const update = () => { button.disabled = !isReady(); };
  update();
  return update;
}

/**
 * Cycle a list of status lines into a container, one at a time, then run onDone.
 * @param {HTMLElement} container
 * @param {string[]} lines
 * @param {number} interval - ms between lines appearing
 * @param {Function} onDone
 */
function runLoadingSequence(container, lines, interval, onDone) {
  lines.forEach((text, i) => {
    setTimeout(() => {
      const line = document.createElement('p');
      line.className = 'loading-line';
      line.textContent = `✓ ${text}`;
      container.appendChild(line);
      requestAnimationFrame(() => requestAnimationFrame(() => line.classList.add('in')));
    }, i * interval);
  });
  setTimeout(onDone, lines.length * interval + 500);
}

/**
 * A discrete, snapping slider built from markup like:
 *   <div class="slider" data-labels="Free,Under $20,$20–50,$50+,Treat Myself">
 *     <div class="slider-tooltip"></div>
 *     <div class="slider-track"><div class="slider-fill"></div><div class="slider-handle" tabindex="0" role="slider"></div></div>
 *     <div class="slider-end-labels"><span></span><span></span></div>
 *   </div>
 * @param {HTMLElement} el - the .slider container
 * @param {object} opts - { defaultIndex, onChange(label, index) }
 */
function initSlider(el, opts = {}) {
  const labels = el.dataset.labels.split(',');
  const track = el.querySelector('.slider-track');
  const fill = el.querySelector('.slider-fill');
  const handle = el.querySelector('.slider-handle');
  const tooltip = el.querySelector('.slider-tooltip');
  const endLabels = el.querySelectorAll('.slider-end-labels span');
  const steps = labels.length - 1;
  let index = opts.defaultIndex ?? 0;

  endLabels[0].textContent = labels[0];
  endLabels[1].textContent = labels[labels.length - 1];

  handle.setAttribute('role', 'slider');
  handle.setAttribute('aria-valuemin', '0');
  handle.setAttribute('aria-valuemax', String(steps));
  handle.setAttribute('aria-orientation', 'horizontal');

  function render() {
    const pct = steps === 0 ? 0 : (index / steps) * 100;
    fill.style.width = pct + '%';
    handle.style.left = pct + '%';
    tooltip.style.left = pct + '%';
    tooltip.textContent = labels[index];
    handle.setAttribute('aria-valuenow', String(index));
    handle.setAttribute('aria-valuetext', labels[index]);
  }

  function setIndex(newIndex, fire = true) {
    index = Math.max(0, Math.min(steps, newIndex));
    render();
    if (fire && opts.onChange) opts.onChange(labels[index], index);
  }

  function indexFromClientX(clientX) {
    const rect = track.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return Math.round(pct * steps);
  }

  function startDrag(e) {
    el.classList.add('dragging');
    handle.setPointerCapture(e.pointerId);
    moveDrag(e);
  }

  function moveDrag(e) {
    if (!el.classList.contains('dragging')) return;
    setIndex(indexFromClientX(e.clientX));
  }

  function endDrag(e) {
    el.classList.remove('dragging');
    handle.releasePointerCapture(e.pointerId);
  }

  handle.addEventListener('pointerdown', startDrag);
  handle.addEventListener('pointermove', moveDrag);
  handle.addEventListener('pointerup', endDrag);
  handle.addEventListener('pointercancel', endDrag);

  track.addEventListener('pointerdown', (e) => {
    if (e.target === handle) return;
    setIndex(indexFromClientX(e.clientX));
  });

  handle.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { setIndex(index + 1); e.preventDefault(); }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { setIndex(index - 1); e.preventDefault(); }
    if (e.key === 'Home') { setIndex(0); e.preventDefault(); }
    if (e.key === 'End') { setIndex(steps); e.preventDefault(); }
  });

  render();
  return { get: () => labels[index], set: (i) => setIndex(i, false) };
}

document.addEventListener('DOMContentLoaded', initLinks);
