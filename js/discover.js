
const searchInput = document.getElementById("discoverSearch");
const discover = document.getElementById("discover");

function initializeDiscover() {
  if (!searchInput || !discover) return;

  let status = document.getElementById("discoverSearchStatus");

  if (!status) {
    status = document.createElement("div");
    status.id = "discoverSearchStatus";
    status.className = "discover-search-status";
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");
    status.hidden = true;
    searchInput.insertAdjacentElement("afterend", status);
  }

  function searchAudiobooks() {
    const query = searchInput.value.trim().toLowerCase();
    const cards = [...discover.querySelectorAll("[data-book-card]")];

    if (cards.length === 0) {
      status.textContent = query
        ? "Audiobook search will be available when our catalogue is added."
        : "";
      status.hidden = !query;

      discover.querySelectorAll(".discover-section").forEach(section => {
        section.hidden = false;
      });

      return;
    }

    let visibleCount = 0;

    cards.forEach(card => {
      const searchableText = (
        card.dataset.search || card.textContent || ""
      ).toLowerCase();

      const matches = !query || searchableText.includes(query);

      card.hidden = !matches;

      if (matches) visibleCount++;
    });

    discover.querySelectorAll(".discover-section").forEach(section => {
      const sectionCards = [...section.querySelectorAll("[data-book-card]")];

      section.hidden = query !== "" &&
        sectionCards.length > 0 &&
        !sectionCards.some(card => !card.hidden);
    });

    if (!query) {
      status.textContent = "";
      status.hidden = true;
      return;
    }

    status.textContent = visibleCount === 0
      ? "No audiobooks found. Try another search."
      : `${visibleCount} audiobook${visibleCount === 1 ? "" : "s"} found.`;

    status.hidden = false;
  }

  searchInput.addEventListener("input", searchAudiobooks);
}

export { initializeDiscover };
                                                             
