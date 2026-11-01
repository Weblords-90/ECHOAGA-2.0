
function initializeProfile() {
  const profileName = document.getElementById("profileName");
  const profileAvatar = document.querySelector(".profile-avatar");
  const profileSignIn = document.querySelector("#profile .profile-card button");
  const userPill = document.getElementById("userPill");
  const accountButton = document.getElementById("accountButton");
  const userLabel = document.getElementById("userLabel");

  if (!profileName || !profileAvatar || !userPill || !accountButton) return;

  function updateProfile() {
    const loggedIn = userPill.style.display === "flex";
    const name = loggedIn
      ? userLabel.textContent.trim()
      : "Welcome to ECHOAGA";

    profileName.textContent = name || "Welcome to ECHOAGA";
    profileAvatar.textContent = loggedIn && name
      ? name.charAt(0).toUpperCase()
      : "E";

    if (profileSignIn) {
      profileSignIn.hidden = loggedIn;
    }
  }

  const observer = new MutationObserver(updateProfile);

  observer.observe(userPill, {
    attributes: true,
    attributeFilter: ["style"]
  });

  observer.observe(userLabel, {
    childList: true,
    characterData: true,
    subtree: true
  });

  observer.observe(accountButton, {
    attributes: true,
    attributeFilter: ["style"]
  });

  updateProfile();
}

export { initializeProfile };

