
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

  function renderCategories() {
    section.innerHTML = originalContent;
  }

  function renderSubcategories(category) {
    section.replaceChildren();

    const backButton = document.createElement("button");
    backButton.type = "button";
    backButton.className = "library-back";
    backButton.dataset.libraryBack = "";
    backButton.textContent = "← Back to Library";

    const heading = document.createElement("h2");
    heading.textContent = category.title;

    const container = document.createElement("div");
    container.className = "library-subcategories";

    category.subcategories.forEach(item => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "library-subcategory";
      button.dataset.subcategory = item;
      button.textContent = item;
      container.appendChild(button);
    });

    section.append(backButton, heading, container);
  }

  function renderEmptyState(subcategory) {
    section.replaceChildren();

    const backButton = document.createElement("button");
    backButton.type = "button";
    backButton.className = "library-back";
    backButton.dataset.libraryBack = "";
    backButton.textContent = "← Back to Categories";

    const heading = document.createElement("h2");
    heading.textContent = subcategory;

    const emptyState = document.createElement("div");
    emptyState.className = "library-empty";
    emptyState.textContent = "Audiobooks in this category will appear here.";

    section.append(backButton, heading, emptyState);
  }

  section.addEventListener("click", event => {
    if (!(event.target instanceof Element)) return;

    const backButton = event.target.closest("[data-library-back]");
    const categoryButton = event.target.closest("[data-category]");
    const subcategoryButton = event.target.closest("[data-subcategory]");

    if (backButton && section.contains(backButton)) {
      renderCategories();
      return;
    }

    if (categoryButton && section.contains(categoryButton)) {
      const category = libraryCategories[categoryButton.dataset.category];

      if (!category) return;

      renderSubcategories(category);
      return;
    }

    if (subcategoryButton && section.contains(subcategoryButton)) {
      renderEmptyState(subcategoryButton.dataset.subcategory);
    }
  });
}
