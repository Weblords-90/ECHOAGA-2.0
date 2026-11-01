
const authOverlay = document.getElementById("authOverlay");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const authMessage = document.getElementById("authMessage");
const authTitle = document.getElementById("authTitle");

let previousFocus = null;

function openAuth() {
  if (!authOverlay) return;

  previousFocus = document.activeElement;
  authOverlay.hidden = false;
  showLogin();

  document.getElementById("loginEmail")?.focus();
}

function closeAuth() {
  if (!authOverlay) return;

  authOverlay.hidden = true;

  if (previousFocus instanceof HTMLElement) {
    previousFocus.focus();
  }
}

function showLogin() {
  if (!loginForm || !signupForm || !authMessage) return;

  loginForm.hidden = false;
  signupForm.hidden = true;
  authMessage.textContent = "";
  authMessage.dataset.error = "false";

  if (authTitle) authTitle.textContent = "Welcome Back";
}

function showSignup() {
  if (!loginForm || !signupForm || !authMessage) return;

  loginForm.hidden = true;
  signupForm.hidden = false;
  authMessage.textContent = "";
  authMessage.dataset.error = "false";

  if (authTitle) authTitle.textContent = "Create Your Account";
}

function showAuthMessage(message, isError = false) {
  if (!authMessage) return;

  authMessage.textContent = String(message);
  authMessage.dataset.error = String(isError);
}

function clearAuthMessage() {
  showAuthMessage("");
}

function setBusy(button, busy, label) {
  if (!button) return;

  button.disabled = busy;
  button.textContent = busy ? "PLEASE WAIT..." : label;
}

function friendlyError(error) {
  const messages = {
    "auth/email-already-in-use": "This email already has an account.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/invalid-credential": "Email or password is incorrect.",
    "auth/weak-password": "Please choose a stronger password.",
    "auth/network-request-failed": "Network error. Please try again.",
    "auth/popup-blocked": "Your browser blocked the sign-in process.",
    "auth/too-many-requests": "Too many attempts. Please try again later."
  };

  return messages[error?.code] || "Something went wrong. Please try again.";
}

function updateProfileName(name) {
  const profileName = document.getElementById("profileName");

  if (profileName) {
    profileName.textContent = name || "Welcome to ECHOAGA";
  }
}

window.openAuth = openAuth;
window.closeAuth = closeAuth;
window.showLogin = showLogin;
window.showSignup = showSignup;
window.showAuthMessage = showAuthMessage;
window.clearAuthMessage = clearAuthMessage;
window.setBusy = setBusy;
window.friendlyError = friendlyError;
window.updateProfileName = updateProfileName;

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && authOverlay && !authOverlay.hidden) {
    closeAuth();
  }
});
