
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
  signOut,
  setPersistence,
  browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB66koQo6FELH0AT9OBtYZgCP4Y5zJigCs",
  authDomain: "echoaga-1a942.firebaseapp.com",
  projectId: "echoaga-1a942",
  storageBucket: "echoaga-1a942.firebasestorage.app",
  messagingSenderId: "483961141529",
  appId: "1:483961141529:web:e07f44179f076aaa14ed88",
  measurementId: "G-HD2VQ20Q0Q"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account"
});

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const loginSubmit = document.getElementById("loginSubmit");
const signupSubmit = document.getElementById("signupSubmit");
const googleButton = document.getElementById("googleButton");

const authReady = setPersistence(auth, browserLocalPersistence);

function showMessage(message, isError = false) {
  window.showAuthMessage(message, isError);
}

function updateUserInterface(user) {
  const accountButton = document.getElementById("accountButton");
  const userPill = document.getElementById("userPill");
  const userLabel = document.getElementById("userLabel");
  const logoutButton = document.getElementById("logoutButton");

  const profileName = document.getElementById("profileName");
  const profileAvatar = document.querySelector(".profile-avatar");
  const profileSignIn = document.querySelector(
    "#profile .profile-hero-footer button"
  );

  if (!accountButton || !userPill || !userLabel || !logoutButton) return;

  if (user) {
    const name = user.displayName || user.email || "My account";

    accountButton.style.display = "none";
    userPill.style.display = "flex";
    logoutButton.style.display = "inline-block";
    userLabel.textContent = name;

    if (profileName) {
      profileName.textContent = name;
    }

    if (profileAvatar) {
      profileAvatar.textContent = name.charAt(0).toUpperCase();
    }

    if (profileSignIn) {
      profileSignIn.hidden = true;
      profileSignIn.style.display = "none";
    }
  } else {
    accountButton.style.display = "inline-block";
    userPill.style.display = "none";
    logoutButton.style.display = "none";

    if (profileName) {
      profileName.textContent = "Welcome to ECHOAGA";
    }

    if (profileAvatar) {
      profileAvatar.textContent = "E";
    }

    if (profileSignIn) {
      profileSignIn.hidden = false;
      profileSignIn.style.display = "flex";
    }
  }
}

onAuthStateChanged(auth, user => {
  updateUserInterface(user);
});

function friendlyError(error) {
  const messages = {
    "auth/email-already-in-use": "This email already has an account. Try signing in.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/invalid-credential": "Email or password is incorrect.",
    "auth/weak-password": "Please choose a stronger password.",
    "auth/network-request-failed": "Network error. Check your internet connection.",
    "auth/popup-blocked": "Your browser blocked the Google sign-in window. Allow popups and try again.",
    "auth/popup-closed-by-user": "Google sign-in was cancelled. Please try again.",
    "auth/unauthorized-domain": "This website is not authorized for Firebase authentication.",
    "auth/operation-not-allowed": "This sign-in method is currently disabled.",
    "auth/account-exists-with-different-credential": "An account already exists with this email. Try your original sign-in method.",
    "auth/too-many-requests": "Too many attempts. Please try again later.",
    "auth/user-disabled": "This account has been disabled."
  };

  return messages[error?.code] || "Something went wrong. Please try again.";
}

signupForm.addEventListener("submit", async event => {
  event.preventDefault();

  window.clearAuthMessage();

  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value;

  if (!name) {
    showMessage("Please enter your name.", true);
    return;
  }

  window.setBusy(signupSubmit, true, "CREATE MY ACCOUNT");

  try {
    await authReady;

    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(credential.user, {
      displayName: name
    });

    updateUserInterface(credential.user);

    signupForm.reset();
    window.closeAuth();
    showMessage("Your ECHOAGA account is ready. Welcome, " + name + "!");
  } catch (error) {
    showMessage(friendlyError(error), true);
  } finally {
    window.setBusy(signupSubmit, false, "CREATE MY ACCOUNT");
  }
});

loginForm.addEventListener("submit", async event => {
  event.preventDefault();

  window.clearAuthMessage();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  window.setBusy(loginSubmit, true, "SIGN IN TO ECHOAGA");

  try {
    await authReady;

    const credential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    updateUserInterface(credential.user);

    loginForm.reset();
    window.closeAuth();
    showMessage("You're signed in. Welcome back!");
  } catch (error) {
    showMessage(friendlyError(error), true);
  } finally {
    window.setBusy(loginSubmit, false, "SIGN IN TO ECHOAGA");
  }
});

window.googleSignIn = async function() {
  window.clearAuthMessage();

  window.setBusy(googleButton, true, "CONNECTING TO GOOGLE…");

  try {
    await authReady;

    const result = await signInWithPopup(auth, googleProvider);

    updateUserInterface(result.user);

    window.closeAuth();
    showMessage("Google sign-in successful. Welcome to ECHOAGA!");
  } catch (error) {
    showMessage(friendlyError(error), true);
  } finally {
    window.setBusy(googleButton, false, "Continue with Google");
  }
};

window.resetPassword = async function() {
  const email = document.getElementById("loginEmail").value.trim();

  if (!email) {
    showMessage("Enter your email address first.", true);
    document.getElementById("loginEmail").focus();
    return;
  }

  try {
    await authReady;
    await sendPasswordResetEmail(auth, email);

    showMessage("Password reset email sent. Check your inbox and spam folder.");
  } catch (error) {
    showMessage(friendlyError(error), true);
  }
};

window.logoutUser = async function() {
  try {
    await authReady;
    await signOut(auth);

    updateUserInterface(null);
    showMessage("You have been signed out.");
  } catch (error) {
    window.openAuth();
    showMessage(friendlyError(error), true);
  }
};
 
