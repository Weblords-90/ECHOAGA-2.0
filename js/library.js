
import {
  echoagaBooks,
  categoryNames,
  createEchoagaBook
} from "./books.js";

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
  const searchInput = library?.querySelector(".library-search input, input.library-search");

  if (!library || !section) return;

  const originalContent = section.innerHTML;

  let activeCategory = null;
  let activeSubcategory = null;
  let searchQuery = "";

  let searchStatus = library.querySelector("#librarySearchStatus");

  if (!searchStatus && searchInput) {
    searchStatus = document.createElement("div");
    searchStatus.id = "librarySearchStatus";
    searchStatus.className = "library-search-status";
    searchStatus.setAttribute("role", "status");
    searchStatus.setAttribute("aria-live", "polite");
    searchStatus.hidden = true;
    searchInput.insertAdjacentElement("afterend", searchStatus);
  }

  function updateSearchStatus(message) {
    if (!searchStatus) return;

    searchStatus.textContent = message;
    searchStatus.hidden = !message;
  }

  function renderCategories() {
    section.innerHTML = originalContent;
  }

  function createBackButton(destination, label) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "library-back";
    button.dataset.libraryBack = destination;
    button.textContent = label;
    return button;
  }

  function renderSubcategories(category) {
    section.replaceChildren();

    const backButton = createBackButton(
      "categories",
      "← Back to Library"
    );

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

  function renderBookResults(books, headingText, backDestination, backLabel) {
    section.replaceChildren();

    const backButton = createBackButton(
      backDestination,
      backLabel
    );

    const heading = document.createElement("h2");
    heading.textContent = headingText;

    const description = document.createElement("p");
    description.className = "echoaga-demo-description";
    description.textContent = books.length
      ? "Explore the ECHOAGA demo collection."
      : "No books are available in this section yet.";

    const grid = document.createElement("div");
    grid.className = "echoaga-book-grid";

    books.forEach(book => {
      grid.appendChild(createEchoagaBook(book));
    });

    section.append(backButton, heading, description, grid);
  }

  function renderBooks(categoryKey, subcategory) {
    const matchingBooks = echoagaBooks.filter(book =>
      book.category === categoryKey &&
      book.subcategory === subcategory
    );

    activeCategory = categoryKey;
    activeSubcategory = subcategory;

    renderBookResults(
      matchingBooks,
      subcategory,
      "subcategories",
      "← Back to Categories"
    );
  }

  function renderSearchResults(query) {
    const matchingBooks = echoagaBooks.filter(book =>
      ([
        book.title,
        book.author,
        book.category,
        categoryNames[book.category],
        book.subcategory,
        book.description
      ].join(" ").toLowerCase()).includes(query)
    );

    renderBookResults(
      matchingBooks,
      "Search Results",
      "search",
      "← Back"
    );

    updateSearchStatus(
      matchingBooks.length
        ? `${matchingBooks.length} result${matchingBooks.length === 1 ? "" : "s"} found.`
        : "No books found. Try another search."
    );
  }

  function restoreCurrentView() {
    if (activeCategory && activeSubcategory) {
      renderBooks(activeCategory, activeSubcategory);
      return;
    }

    if (activeCategory) {
      renderSubcategories(libraryCategories[activeCategory]);
      return;
    }

    renderCategories();
  }

  section.addEventListener("click", event => {
    if (!(event.target instanceof Element)) return;

    const backButton = event.target.closest("[data-library-back]");
    const categoryButton = event.target.closest("[data-category]");
    const subcategoryButton = event.target.closest("[data-subcategory]");

    if (backButton && section.contains(backButton)) {
      const destination = backButton.dataset.libraryBack;

      if (destination === "search") {
        restoreCurrentView();
        return;
      }

      if (destination === "subcategories" && activeCategory) {
        activeSubcategory = null;
        renderSubcategories(libraryCategories[activeCategory]);
        return;
      }

      activeCategory = null;
      activeSubcategory = null;
      renderCategories();
      return;
    }

    if (categoryButton && section.contains(categoryButton)) {
      const key = categoryButton.dataset.category;
      const category = libraryCategories[key];

      if (!category) return;

      activeCategory = key;
      activeSubcategory = null;
      renderSubcategories(category);
      return;
    }

    if (subcategoryButton && section.contains(subcategoryButton)) {
      if (!activeCategory) return;

      const selectedSubcategory = subcategoryButton.dataset.subcategory;
      const category = libraryCategories[activeCategory];

      if (!category?.subcategories.includes(selectedSubcategory)) return;

      renderBooks(activeCategory, selectedSubcategory);
    }
  });

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      searchQuery = searchInput.value.trim().toLowerCase();

      if (searchQuery) {
        renderSearchResults(searchQuery);
      } else {
        updateSearchStatus("");
        restoreCurrentView();
      }
    });
  }
                  }
