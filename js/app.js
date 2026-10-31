
const app = document.getElementById("app");

const state = {
  currentScreen: "home",
  theme: localStorage.getItem("echoaga-theme") || "basic",
  isPlaying: false,
  currentBook: null
};

function applyTheme(theme) {
  state.theme = theme;
  document.body.dataset.theme = theme;
  localStorage.setItem("echoaga-theme", theme);
}

function navigateTo(screen) {
  const screens = ["home", "discover", "library", "profile", "settings"];

  if (!screens.includes(screen)) return;

  state.currentScreen = screen;

  document.querySelectorAll("[data-screen]").forEach(element => {
    element.classList.toggle(
      "active",
      element.dataset.screen === screen
    );
  });
}

function initializeApp() {
  if (!app) {
    console.error("ECHOAGA app container not found.");
    return;
  }

  applyTheme(state.theme);
  navigateTo(state.currentScreen);

  console.log("ECHOAGA 2.0 initialized.");
}

document.addEventListener("DOMContentLoaded", initializeApp);

