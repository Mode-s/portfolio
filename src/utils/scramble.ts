const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ!@#$%&*?<>[]{}';

export const scramble = (
  el: HTMLElement,
  duration: number,
  delay: number = 0
): Promise<void> => {
  return new Promise((resolve) => {
    const original = el.textContent ?? '';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      el.textContent = original;
      resolve();
      return;
    }

    setTimeout(() => {
      const startTime = performance.now();

      const tick = (now: number) => {
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
          requestAnimationFrame(tick);
        } else {
          el.textContent = original;
          resolve();
        }
      };

      requestAnimationFrame(tick);
    }, delay);
  });
};