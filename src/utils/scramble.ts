const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ!@#$%&*?<>[]{}';

const activeScrambles = new WeakMap<HTMLElement, () => void>();

export const scramble = (
  el: HTMLElement,
  duration: number,
  delay: number = 0
): Promise<void> => {
  return new Promise((resolve) => {
    if (el.dataset.scrambleOriginal === undefined) {
      el.dataset.scrambleOriginal = el.textContent ?? '';
    }
    const original = el.dataset.scrambleOriginal;

    const prevCancel = activeScrambles.get(el);
    if (prevCancel) prevCancel();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      el.textContent = original;
      resolve();
      return;
    }

    let cancelled = false;
    let timeoutId: number | null = null;
    let rafId: number | null = null;

    const cancel = () => {
      cancelled = true;
      if (timeoutId !== null) clearTimeout(timeoutId);
      if (rafId !== null) cancelAnimationFrame(rafId);
      activeScrambles.delete(el);
    };

    activeScrambles.set(el, cancel);

    timeoutId = window.setTimeout(() => {
      if (cancelled) return;

      const startTime = performance.now();

      const tick = (now: number) => {
        if (cancelled) return;

        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const settled = Math.floor(progress * original.length);

        let result = '';
        for (let i = 0; i < original.length; i++) {
          if (i < settled) {
            result += original[i];
          } else {
            result += original[i] === ' '
              ? ' '
              : CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }

        el.textContent = result;

        if (progress < 1) {
          rafId = requestAnimationFrame(tick);
        } else {
          el.textContent = original;
          activeScrambles.delete(el);
          resolve();
        }
      };

      rafId = requestAnimationFrame(tick);
    }, delay);
  });
};