
const STORAGE_KEY = "echoaga-bookmarks";

function getBookmarks() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function saveBookmarks(bookmarks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
}

function initializeBookmarks() {
  function updateButtons() {
    const bookmarks = getBookmarks();

    document.querySelectorAll("[data-bookmark-id]").forEach(button => {
      const id = button.dataset.bookmarkId;
      const saved = bookmarks.includes(id);

      button.classList.toggle("bookmarked", saved);
      button.setAttribute("aria-pressed", String(saved));
      button.textContent = saved ? "♥" : "♡";
    });
  }

  document.addEventListener("click", event => {
    const button = event.target.closest("[data-bookmark-id]");

    if (!button) return;

    const id = button.dataset.bookmarkId;
    if (!id) return;

    const bookmarks = getBookmarks();
    const saved = bookmarks.includes(id);

    const updated = saved
      ? bookmarks.filter(item => item !== id)
      : [...bookmarks, id];

    saveBookmarks(updated);
    updateButtons();

    document.dispatchEvent(new CustomEvent("echoaga:bookmarkschange", {
      detail: { bookmarks: updated }
    }));
  });

  window.echoagaBookmarks = {
    getAll: getBookmarks,
    isSaved: id => getBookmarks().includes(id),
    update: updateButtons
  };

  updateButtons();
}

export { initializeBookmarks };

