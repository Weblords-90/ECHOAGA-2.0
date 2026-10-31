
import { initializeNavigation } from "./navigation.js";

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
}

function navigateTo(screen) {
  const screens = ["home", "discover", "library", "profile", "settings"];

  if (!screens.includes(screen)) return;

  state.currentScreen = screen;

  document.querySelectorAll("[data-screen].screen").forEach(element => {
    element.classList.toggle("active", element.dataset.screen === screen);
  });

  document.querySelectorAll("#bottomNavigation [data-screen]").forEach(element => {
    element.classList.toggle("active", element.dataset.screen === screen);
  });
}

function initializeApp() {
  if (!app) return;

  applyTheme(state.theme);
  initializeNavigation(navigateTo);
  navigateTo(state.currentScreen);

  console.log("ECHOAGA 2.0 initialized.");
}

document.addEventListener("DOMContentLoaded", initializeApp);
