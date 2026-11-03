
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

  function searchBooks() {
    const query = searchInput.value.trim().toLowerCase();
    const cards = [...discover.querySelectorAll("[data-echoaga-book]")];

    if (cards.length === 0) {
      status.textContent = query
        ? "Our catalogue is being prepared. Check back soon."
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
      const sectionCards = [...section.querySelectorAll("[data-echoaga-book]")];

      section.hidden = query !== "" &&
        sectionCards.length > 0 &&
        !sectionCards.some(card => !card.hidden);
    });

    status.textContent = !query
      ? ""
      : visibleCount === 0
        ? "No books found. Try another search."
        : `${visibleCount} result${visibleCount === 1 ? "" : "s"} found.`;

    status.hidden = !query;
  }

  searchInput.addEventListener("input", searchBooks);
}

export { initializeDiscover };
