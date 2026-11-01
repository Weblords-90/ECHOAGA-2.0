
function initializeSettings() {
  const settings = document.getElementById("settings");

  if (!settings) return;

  const themeButtons = settings.querySelectorAll("[data-theme-choice]");

  function updateThemeSelection() {
    const currentTheme = document.body.dataset.theme || "basic";

    themeButtons.forEach(button => {
      const selected = button.dataset.themeChoice === currentTheme;

      button.classList.toggle("selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
  }

  themeButtons.forEach(button => {
    button.addEventListener("click", updateThemeSelection);
  });

  updateThemeSelection();

  document.addEventListener("echoaga:themechange", updateThemeSelection);
}

export { initializeSettings };

