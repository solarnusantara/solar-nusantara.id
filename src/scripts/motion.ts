/**
 * Site motion: GSAP + ScrollTrigger + SplitText, driven entirely by data
 * attributes so pages opt in with markup instead of page-specific JS.
 *
 *   data-hero              hero <section>. Inside it:
 *     data-hero-media      background image: settles from a slow zoom, then
 *                          drifts with scroll (parallax)
 *     data-hero-title      headline: line-by-line masked rise (SplitText)
 *     data-hero-item       copy and buttons: fade up in sequence after the title
 *     data-hero-content    wrapper that lifts away as the hero scrolls off
 *   data-reveal            element fades up when it scrolls into view
 *   data-reveal-stagger    each direct child fades up, staggered with whatever
 *                          else enters at the same moment
 *   data-reveal-image      frame wipes open bottom-up while the image inside
 *                          settles from a zoom
 *   data-parallax          image drifts inside its overflow-hidden frame
 *   data-count="30"        number counts up when it enters; text around the
 *                          number comes from data-count-prefix / -suffix
 *   data-read-progress     bar whose scaleX follows reading progress
 *
 * Page intros on inner pages are CSS (data-intro, global.css), not this file:
 * they start at first paint instead of waiting for this bundle, so they never
 * hold back Largest Contentful Paint.
 *
 * Nothing on screen waits for this module. Scroll reveals, image wipes and
 * counters only take hold of elements still below the fold when it runs, so
 * an element is never painted, hidden, then shown again. The one exception is
 * the home hero's copy, which CSS pre-hides while <html> carries .sn-motion:
 * Layout sets that class only when reduced motion is off and drops it after
 * 3 s regardless, so a failed load costs a delay, never a blank page. The
 * hero's LCP element is its photo, which is never hidden.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const root = document.documentElement;

// One vocabulary for the whole site. Entrances decelerate (out); anything that
// both starts and stops on screen, like the image wipe, eases in and out.
const EASE_ENTER = 'power3.out';
const EASE_SETTLE = 'expo.out';
const EASE_WIPE = 'power4.inOut';

/** Reveal targets in document order, so batched staggers run top-to-bottom. */
const REVEAL_SELECTOR = '[data-reveal], [data-reveal-stagger] > *';

/**
 * Still below the fold, so never seen yet and safe to hide. Anything already
 * on screen (or above it, after a reload restores scroll) is left exactly as
 * painted. All reads happen before any GSAP write, so this costs one layout.
 */
const belowFold = (el: Element) => el.getBoundingClientRect().top >= window.innerHeight;

function setupHero(hero: HTMLElement, playIntro: boolean) {
  const media = hero.querySelector<HTMLElement>('[data-hero-media]');
  const title = hero.querySelector<HTMLElement>('[data-hero-title]');
  const items = hero.querySelectorAll<HTMLElement>('[data-hero-item]');
  const content = hero.querySelector<HTMLElement>('[data-hero-content]');

  if (playIntro) {
    if (media) {
      gsap.fromTo(media, { scale: 1.12 }, { scale: 1, duration: 2.6, ease: 'power2.out' });
    }

    if (title) {
      // autoSplit re-splits when the web font lands or the width changes;
      // returning the tween from onSplit lets SplitText carry its progress
      // across the re-split instead of restarting it. At leading 1.15, Inter's
      // descenders (the g and y of "energy") overhang the line box the mask
      // clips to; .sn-line-mask in global.css pads the clip downward, and the
      // split is reverted once the lines are up so the h1 is plain text again.
      SplitText.create(title, {
        type: 'lines',
        mask: 'lines',
        linesClass: 'sn-line',
        autoSplit: true,
        onSplit: (self) =>
          gsap.fromTo(
            self.lines,
            { yPercent: 120 },
            {
              yPercent: 0,
              duration: 1.2,
              ease: EASE_SETTLE,
              stagger: 0.12,
              delay: 0.15,
              onComplete: () => self.revert(),
            },
          ),
      });
    }

    if (items.length) {
      gsap.fromTo(
        items,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: EASE_ENTER,
          stagger: 0.1,
          delay: 0.55,
          clearProps: 'transform,opacity,visibility',
        },
      );
    }
  }

  // Scroll-out: the photo sinks slower than the page and the copy lifts away.
  // The section clips its overflow, so the moved image never shows an edge.
  const scrollOut = { trigger: hero, start: 'top top', end: 'bottom top', scrub: true };
  if (media) gsap.to(media, { yPercent: 14, ease: 'none', scrollTrigger: scrollOut });
  if (content) gsap.to(content, { y: -70, opacity: 0, ease: 'none', scrollTrigger: scrollOut });
}

function setupReveals(pending: HTMLElement[]) {
  if (!pending.length) return;

  gsap.set(pending, { autoAlpha: 0, y: 36 });

  const show = (batch: Element[], triggers: ScrollTrigger[]) => {
    gsap.to(batch, {
      autoAlpha: 1,
      y: 0,
      duration: 0.95,
      ease: EASE_ENTER,
      stagger: 0.09,
      overwrite: true,
      clearProps: 'transform,opacity,visibility',
    });
    triggers.forEach((t) => t.kill());
  };

  ScrollTrigger.batch(pending, {
    start: 'top 88%',
    interval: 0.12,
    batchMax: 6,
    onEnter: show,
    // Safety net for a scroll restored after this ran: whatever got skipped
    // over still appears on the way back up.
    onEnterBack: show,
  });
}

function setupImageReveals(frames: HTMLElement[]) {
  frames.forEach((frame) => {
    const img = frame.querySelector('img');
    const tl = gsap.timeline({
      scrollTrigger: { trigger: frame, start: 'top 85%', once: true },
    });

    tl.fromTo(
      frame,
      { clipPath: 'inset(100% 0% 0% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: EASE_WIPE, clearProps: 'clipPath' },
    );
    if (img) {
      tl.fromTo(img, { scale: 1.3 }, { scale: 1, duration: 1.8, ease: EASE_SETTLE, clearProps: 'transform' }, 0);
    }
  });
}

function setupParallax() {
  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((img) => {
    const frame = img.parentElement ?? img;
    // scale 1.14 leaves 7% of overflow on each edge; ±6% travel stays inside it.
    gsap.fromTo(
      img,
      { yPercent: -6, scale: 1.14 },
      {
        yPercent: 6,
        scale: 1.14,
        ease: 'none',
        scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
  });
}

function setupCounters(counters: HTMLElement[]) {
  const restore: Array<() => void> = [];

  counters.forEach((el) => {
    const raw = el.dataset.count ?? '';
    const end = Number(raw);
    if (!Number.isFinite(end)) return;

    const original = el.textContent;
    const decimals = (raw.split('.')[1] ?? '').length;
    const prefix = el.dataset.countPrefix ?? '';
    const suffix = el.dataset.countSuffix ?? '';
    const state = { value: 0 };
    const render = () => {
      el.textContent = `${prefix}${state.value.toFixed(decimals)}${suffix}`;
    };

    render();
    gsap.to(state, {
      value: end,
      duration: 1.8,
      ease: 'power2.out',
      onUpdate: render,
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });

    // matchMedia reverts tweens, not text, so put the server-rendered figure back.
    restore.push(() => {
      el.textContent = original;
    });
  });

  return () => restore.forEach((fn) => fn());
}

function setupReadProgress() {
  const bar = document.querySelector<HTMLElement>('[data-read-progress]');
  if (!bar) return;
  gsap.fromTo(
    bar,
    { scaleX: 0 },
    { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } },
  );
}

// If the 3 s safety net in Layout already revealed the page, do not yank the
// hero back to hidden just to replay it; scroll reveals below the fold still run.
const playIntro = root.classList.contains('sn-motion');

const mm = gsap.matchMedia();
mm.add('(prefers-reduced-motion: no-preference)', () => {
  // Measure everything first, then write: one layout pass, no thrash.
  const reveals = gsap.utils
    .toArray<HTMLElement>(REVEAL_SELECTOR)
    .filter((el) => !el.closest('[data-hero]') && belowFold(el));
  const frames = gsap.utils.toArray<HTMLElement>('[data-reveal-image]').filter(belowFold);
  const counters = gsap.utils.toArray<HTMLElement>('[data-count]').filter(belowFold);

  // Created top-to-bottom, the order ScrollTrigger refreshes them in.
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (hero) setupHero(hero, playIntro);
  setupImageReveals(frames);
  setupReveals(reveals);
  setupParallax();
  const restoreCounters = setupCounters(counters);
  setupReadProgress();

  // The hero's hidden state now lives inline, so the CSS pre-hide can go.
  root.classList.remove('sn-motion');

  return () => restoreCounters();
});

// Reduced motion from the start: nothing above ran, so lift the pre-hide.
root.classList.remove('sn-motion');
