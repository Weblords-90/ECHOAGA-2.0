
import { initializeNavigation } from "./navigation.js";
import { initializeLibrary } from "./library.js";
import { initializeDiscover } from "./discover.js";
const app = document.getElementById("app");

const state = {
  currentScreen: "home",
  theme: localStorage.getItem("echoaga-theme") || "basic",
  isPlaying: false,
  currentBook: null
};

function applyTheme(theme) {
  if (!["basic", "premium"].includes(theme)) return;

  state.theme = theme;
  document.body.dataset.theme = theme;
  localStorage.setItem("echoaga-theme", theme);

  document.querySelectorAll("[data-theme-choice]").forEach(button => {
    const selected = button.dataset.themeChoice === theme;
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
}

function navigateTo(screen) {
  const screens = ["home", "discover", "library", "profile", "settings"];

  if (!screens.includes(screen)) return;

  state.currentScreen = screen;

  document.querySelectorAll("[data-screen].screen").forEach(element => {
    const active = element.dataset.screen === screen;
    element.classList.toggle("active", active);
    element.setAttribute("aria-hidden", String(!active));
  });

  document.querySelectorAll("#bottomNavigation [data-screen]").forEach(element => {
    const active = element.dataset.screen === screen;
    element.classList.toggle("active", active);
    element.setAttribute("aria-current", active ? "page" : "false");
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function initializeApp() {
  if (!app) return;

  applyTheme(state.theme);
  initializeNavigation(navigateTo);
  initializeLibrary();
  initializeDiscover();
  navigateTo(state.currentScreen);
  

  document.addEventListener("click", event => {
    const themeButton = event.target.closest("[data-theme-choice]");

    if (themeButton) {
      applyTheme(themeButton.dataset.themeChoice);
    }
  });

  window.echoaga = {
    navigateTo,
    applyTheme,
    state
  };

  console.log("ECHOAGA 2.0 initialized.");
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp, { once: true });
} else {
  initializeApp();
}
