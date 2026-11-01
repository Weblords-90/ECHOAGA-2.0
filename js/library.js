
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
  const library = document.getElementById("library");
  const section = library?.querySelector(".library-category-section");

  if (!library || !section) return;

  const originalContent = section.innerHTML;

  section.addEventListener("click", event => {
    const backButton = event.target.closest("[data-library-back]");
    const categoryButton = event.target.closest("[data-category]");
    const subcategoryButton = event.target.closest("[data-subcategory]");

    if (backButton) {
      section.innerHTML = originalContent;
      return;
    }

    if (categoryButton) {
      const category = libraryCategories[categoryButton.dataset.category];

      if (!category) return;

      section.innerHTML = `
        <button type="button" data-library-back class="library-back">← Back to Library</button>
        <h2>${category.title}</h2>
        <div class="library-subcategories">
          ${category.subcategories.map(item => `
            <button type="button" class="library-subcategory" data-subcategory="${item}">
              ${item}
            </button>
          `).join("")}
        </div>
      `;
      return;
    }

    if (subcategoryButton) {
      section.innerHTML = `
        <button type="button" data-library-back class="library-back">← Back to Categories</button>
        <h2>${subcategoryButton.dataset.subcategory}</h2>
        <div class="library-empty">
          Audiobooks in this category will appear here.
        </div>
      `;
    }
  });
}
