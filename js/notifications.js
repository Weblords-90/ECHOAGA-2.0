
function initializeNotifications() {
  let container = document.getElementById("notificationContainer");

  if (!container) {
    container = document.createElement("div");
    container.id = "notificationContainer";
    container.setAttribute("aria-live", "polite");
    container.setAttribute("aria-atomic", "false");
    document.body.appendChild(container);
  }

  function notify(message, type = "info", duration = 3500) {
    const allowedTypes = ["success", "error", "info"];
    const notificationType = allowedTypes.includes(type) ? type : "info";

    const notification = document.createElement("div");
    notification.className = `echoaga-notification ${notificationType}`;

    const icons = {
      success: "✓",
      error: "!",
      info: "✦"
    };

    const icon = document.createElement("span");
    icon.className = "echoaga-notification-icon";
    icon.textContent = icons[notificationType];

    const text = document.createElement("span");
    text.className = "echoaga-notification-message";
    text.textContent = String(message);

    const close = document.createElement("button");
    close.type = "button";
    close.className = "echoaga-notification-close";
    close.textContent = "×";
    close.setAttribute("aria-label", "Dismiss notification");

    let timer;

    function removeNotification() {
      if (notification.classList.contains("removing")) return;

      clearTimeout(timer);
      notification.classList.add("removing");

      notification.addEventListener("animationend", () => {
        notification.remove();
      }, { once: true });
    }

    close.addEventListener("click", removeNotification);

    notification.append(icon, text, close);
    container.appendChild(notification);

    if (duration > 0) {
      timer = setTimeout(removeNotification, duration);
    }

    while (container.children.length > 4) {
      container.firstElementChild.remove();
    }

    return removeNotification;
  }

  window.echoagaNotify = notify;

  document.addEventListener("echoaga:bookmarkschange", event => {
    const bookmarks = event.detail?.bookmarks || [];

    notify(
      bookmarks.length ? "Audiobook saved to your library." : "Bookmark removed.",
      "success"
    );
  });
}

export { initializeNotifications };
      
