
export function initializeNavigation(navigateTo) {
  const navigation = document.getElementById("bottomNavigation");

  if (!navigation) return;

  navigation.addEventListener("click", event => {
    const button = event.target.closest("button[data-screen]");

    if (!button || !navigation.contains(button)) return;

    navigateTo(button.dataset.screen);
  });

  navigation.addEventListener("keydown", event => {
    if (event.key !== "Enter" && event.key !== " ") return;

    const button = event.target.closest("button[data-screen]");

    if (!button || !navigation.contains(button)) return;

    event.preventDefault();
    navigateTo(button.dataset.screen);
  });
}
