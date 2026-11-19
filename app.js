// Navigation drawer toggle
const navToggle = document.querySelector('.nav-toggle');
const primaryNav = document.getElementById('primary-nav');
if (navToggle && primaryNav) {
  navToggle.addEventListener('click', () => {
    const open = primaryNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
}

// Accessible tab switcher (no jump, arrow key navigation)
document.querySelectorAll('[data-switch]').forEach((wrap) => {
  const tabs = Array.from(wrap.querySelectorAll('[role="tab"]'));
  const panels = Array.from(wrap.querySelectorAll('[role="tabpanel"]'));
  if (!tabs.length || !panels.length) return;

  const activate = (index, focusTab = false) => {
    tabs.forEach((tab, i) => {
      const active = i === index;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      if (panels[i]) panels[i].hidden = !active;
    });
    if (focusTab) tabs[index].focus({ preventScroll: true });
  };

  // Initialize first panel active when JS runs (without JS all panels stay visible)
  activate(0, false);

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => activate(i, false));
    tab.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        activate((i + 1) % tabs.length, true);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        activate((i - 1 + tabs.length) % tabs.length, true);
      }
    });
  });

  // Activate tab matching URL hash if present
  const hash = window.location.hash.slice(1);
  if (hash) {
    const idx = panels.findIndex((p) => p.id === hash);
    if (idx >= 0) activate(idx, false);
  }
});
