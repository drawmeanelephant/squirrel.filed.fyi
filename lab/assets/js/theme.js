(() => {
  const KEY = "lab-theme";
  const ORDER = ["dark", "light", "pride"];
  const LABEL = { dark: "☾ dark", light: "☀ light", pride: "✶ pride" };
  const root = document.documentElement;

  const saved = localStorage.getItem(KEY);
  const initial = ORDER.includes(saved)
    ? saved
    : (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");

  const apply = (t) => {
    root.dataset.theme = t;
    const b = document.getElementById("theme-toggle");
    if (b) b.textContent = LABEL[t];
  };

  apply(initial);

  const b = document.getElementById("theme-toggle");
  if (!b) return;
  b.addEventListener("click", () => {
    const next = ORDER[(ORDER.indexOf(root.dataset.theme) + 1) % ORDER.length];
    localStorage.setItem(KEY, next);
    apply(next);
  });
})();
