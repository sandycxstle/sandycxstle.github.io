// Wait for DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // Fade-in: remove the initial 'hidden' class so the body transitions to visible
  document.body.classList.remove('hidden');

  const btnBg = document.getElementById('btn-bg');
  const btnText = document.getElementById('btn-text');
  const btnAnim = document.getElementById('btn-anim');
  const linkDiscord = document.getElementById('link-discord');
  const linkReddit = document.getElementById('link-reddit');
  const status = document.getElementById('status');

  function updateStatus() {
    const parts = [];
    if (document.body.classList.contains('bg-dark')) parts.push('dark background');
    if (document.body.classList.contains('large-text')) parts.push('larger text');
    if (document.body.classList.contains('motion')) parts.push('motion enabled');
    status.textContent = parts.length ? `Active: ${parts.join(', ')}` : 'No toggles active.';
  }

  // Utility: attach a toggle handler that updates aria state and body class
  function makeToggle(button, className, labelOn, labelOff) {
    button.addEventListener('click', () => {
      const active = document.body.classList.toggle(className);
      button.setAttribute('aria-pressed', String(active));
      button.textContent = active ? labelOn : labelOff;
      updateStatus();
    });

    // Prevent double-activation on Space in some browsers.
    button.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Spacebar' || e.key === 'Enter') {
        e.preventDefault();
      }
    });
  }

  makeToggle(btnBg, 'bg-dark', 'Darken background (on)', 'Darken background');
  makeToggle(btnText, 'large-text', 'Increase text (on)', 'Increase text');
  makeToggle(btnAnim, 'motion', 'Toggle motion (on)', 'Toggle motion');

  // Initialize aria-pressed based on initial classes (none in this demo)
  [btnBg, btnText, btnAnim].forEach(b => {
    b.setAttribute('aria-pressed', String(document.body.classList.contains(b.id === 'btn-bg' ? 'bg-dark' : b.id === 'btn-text' ? 'large-text' : 'motion')));
  });

  updateStatus();

  // Optional: update the status line briefly when an external link is activated
  function attachLinkStatus(el, name) {
    el.addEventListener('click', () => {
      // show quick feedback so screen reader users know something happened
      status.textContent = `Opening ${name}…`;
      // If you want to track clicks for analytics, do it here (without blocking navigation)
    });
  }

  attachLinkStatus(linkDiscord, 'Discord');
  attachLinkStatus(linkReddit, 'Reddit');
});
