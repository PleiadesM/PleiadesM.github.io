// Pinned profile column and the sliding section index. No dependencies.
(() => {
  // Pin the profile column on wide screens. When it is taller than the window, it scrolls
  // until its bottom meets the window's bottom and stays there, so nothing in it is cut off.
  const profile = document.querySelector(".profile");
  const wide = window.matchMedia("(min-width: 1024px)");
  const pinProfile = () => {
    if (!profile) return;
    if (!wide.matches) {
      profile.classList.remove("is-pinned");
      profile.style.top = "";
      return;
    }
    const overflow = profile.offsetHeight - window.innerHeight;
    profile.style.top = `${Math.min(0, -overflow)}px`;
    profile.classList.add("is-pinned");
  };
  pinProfile();
  window.addEventListener("resize", pinProfile);
  document.fonts?.ready.then(pinProfile);

  // News timeline: run the spine from the first dot to the last, not past it.
  const talks = document.querySelector(".timeline");
  const fitSpine = () => {
    const dates = talks ? talks.querySelectorAll(".when") : [];
    if (dates.length < 2) return;
    const box = talks.getBoundingClientRect();
    const middle = (el) => {
      const r = el.getBoundingClientRect();
      return r.top + r.height / 2;
    };
    talks.style.setProperty("--spine-top", `${middle(dates[0]) - box.top}px`);
    talks.style.setProperty("--spine-bottom", `${box.bottom - middle(dates[dates.length - 1])}px`);
  };
  fitSpine();
  window.addEventListener("resize", fitSpine);
  document.fonts?.ready.then(fitSpine);

  // Section index: mark the section in view and slide the bar under its link.
  const nav = document.querySelector(".index");
  const bar = nav?.querySelector(".index-bar");
  const links = nav ? [...nav.querySelectorAll('a[href^="#"]')] : [];
  const sections = links.map((link) => document.querySelector(link.getAttribute("href")));
  if (!bar || !links.length || sections.includes(null)) return;

  let activeIndex = -1;

  const moveBar = (link, animate) => {
    bar.classList.toggle("no-anim", !animate);
    bar.style.width = `${link.offsetWidth}px`;
    bar.style.transform = `translateX(${link.offsetLeft}px)`;
    bar.style.opacity = "1";
  };

  const setActive = (index, animate = true) => {
    if (index === activeIndex) return;
    activeIndex = index;
    links.forEach((link, i) => {
      if (i === index) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
    moveBar(links[index], animate);
  };

  // The active section is the last one whose top has passed a line a third of the way down.
  const pick = () => {
    const line = window.innerHeight / 3;
    let index = 0;
    sections.forEach((section, i) => {
      if (section.getBoundingClientRect().top <= line) index = i;
    });
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    return atBottom ? sections.length - 1 : index;
  };

  let queued = false;
  window.addEventListener(
    "scroll",
    () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        setActive(pick());
      });
    },
    { passive: true }
  );

  const realign = () => {
    if (activeIndex >= 0) moveBar(links[activeIndex], false);
  };
  window.addEventListener("resize", realign);
  document.fonts?.ready.then(realign);

  setActive(pick(), false);
})();
