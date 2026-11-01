
function initializeProfile() {
  const profileName = document.getElementById("profileName");
  const profileAvatar = document.querySelector(".profile-avatar");
  const profileSignIn = document.querySelector("#profile .profile-hero-footer button");
  const userPill = document.getElementById("userPill");
  const userLabel = document.getElementById("userLabel");

  if (!profileName || !profileAvatar || !profileSignIn || !userPill || !userLabel) return;

  function updateProfile() {
    const loggedIn = getComputedStyle(userPill).display !== "none";
    const name = loggedIn ? userLabel.textContent.trim() : "";

    profileName.textContent = name || "Welcome to ECHOAGA";
    profileAvatar.textContent = name
      ? name.charAt(0).toUpperCase()
      : "E";

    profileSignIn.hidden = loggedIn;
    profileSignIn.style.display = loggedIn ? "none" : "flex";
  }

  const observer = new MutationObserver(updateProfile);

  observer.observe(userPill, {
    attributes: true,
    attributeFilter: ["style", "class"]
  });

  observer.observe(userLabel, {
    childList: true,
    characterData: true,
    subtree: true
  });

  updateProfile();
}

export { initializeProfile };
