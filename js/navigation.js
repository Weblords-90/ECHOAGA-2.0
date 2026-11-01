
export function initializeNavigation(navigateTo) {
  const navigation = document.getElementById("bottomNavigation");

  if (!navigation) return;

  navigation.addEventListener("click", event => {
    const target = event.target;

    if (!(target instanceof Element)) return;

    const button = target.closest("button[data-screen]");

    if (!button || !navigation.contains(button)) return;

    navigateTo(button.dataset.screen);
  });
}
