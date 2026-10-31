const libraryCategories = {
  psychology: {
    title: "Psychology",
    subcategories: [
      "Human Mind",
      "Mental Well-being",
      "Relationships and Emotions",
      "Habits and Thinking of the Human Mind"
    ]
  },
  "self-improvement": {
    title: "Self-Improvement",
    subcategories: [
      "Habits and Discipline",
      "Productivity and Mindset",
      "Motivation and Inspiration",
      "Confidence and Communication"
    ]
  },
  manga: {
    title: "Manga",
    subcategories: [
      "Action",
      "Adventure",
      "Romance and Drama",
      "Fantasy and Supernatural",
      "Horror and Mystery"
    ]
  },
  novels: {
    title: "Novels",
    subcategories: [
      "Romance and Relationships",
      "Mystery",
      "Supernatural",
      "Fiction",
      "Genre Fiction"
    ]
  },
  mystery: {
    title: "Mystery",
    subcategories: [
      "Puzzle Mystery",
      "Murder Mystery",
      "Crime Mystery",
      "Detective Mystery"
    ]
  },
  "sci-fi": {
    title: "Sci-Fi",
    subcategories: [
      "Space and Aliens",
      "Time Travel and Parallel Universes",
      "AI and Robotics"
    ]
  }
};

export function initializeLibrary() {
    alert("Library module is running");
  const library = document.getElementById("library");
  const section = library?.querySelector(".library-category-section");

  if (!library || !section) return;

  const originalContent = section.innerHTML;

  section.addEventListener("click", event => {
        alert("Library click detected");
    const categoryButton = event.target.closest("[data-category]");
    const backButton = event.target.closest("[data-library-back]");

    if (backButton) {
      section.innerHTML = originalContent;
      return;
    }

    if (!categoryButton) return;

    const category = libraryCategories[categoryButton.dataset.category];

    if (!category) return;

    section.innerHTML = `
      <button type="button" data-library-back class="library-back">← Back to Library</button>
      <h2>${category.title}</h2>
      <div class="library-category-grid">
        ${category.subcategories.map(item => `
          <button type="button" class="library-category">
            <h3>${item}</h3>
          </button>
        `).join("")}
      </div>
    `;
  });
}
