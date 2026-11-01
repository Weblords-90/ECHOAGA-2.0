
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

const demoBooks = {
  psychology: [
    { id: "quiet-mind", title: "The Quiet Mind", author: "A. Rowan", color: "#244b3b", accent: "#d5b66c", symbol: "◉" },
    { id: "human-mind", title: "Inside the Human Mind", author: "E. Morgan", color: "#24364b", accent: "#c6a76a", symbol: "✧" }
  ],
  "self-improvement": [
    { id: "next-version", title: "The Next Version", author: "J. Vale", color: "#31513d", accent: "#dfc27b", symbol: "✦" },
    { id: "small-wins", title: "Small Wins", author: "M. Ellis", color: "#4b3827", accent: "#e0b96d", symbol: "↗" }
  ],
  manga: [
    { id: "starblade", title: "The Last Starblade", author: "K. Arashi", color: "#382b50", accent: "#d9b86d", symbol: "刀" },
    { id: "echoes-kairo", title: "Echoes of Kairo", author: "R. Sato", color: "#263e54", accent: "#d5b66c", symbol: "月" }
  ],
  novels: [
    { id: "thousand-autumns", title: "A Thousand Autumns", author: "L. Winters", color: "#5a343b", accent: "#e2bd79", symbol: "❧" },
    { id: "glass-garden", title: "The Glass Garden", author: "N. Hart", color: "#315247", accent: "#d7c18a", symbol: "❀" }
  ],
  mystery: [
    { id: "silent-key", title: "The Silent Key", author: "C. Blackwood", color: "#292e3d", accent: "#d5b66c", symbol: "⌘" },
    { id: "hollow-lane", title: "Midnight at Hollow Lane", author: "I. Graves", color: "#49313a", accent: "#d6b875", symbol: "☾" }
  ],
  "sci-fi": [
    { id: "red-moon", title: "Beyond the Red Moon", author: "T. Orion", color: "#263d55", accent: "#e0bd70", symbol: "☄" },
    { id: "memory-engine", title: "The Memory Engine", author: "A. Nova", color: "#34304f", accent: "#d9b86d", symbol: "⌬" }
  ]
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
    backButton.dataset.libraryBack = "categories";
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

  function createBookCard(book) {
    const card = document.createElement("article");
    card.className = "echoaga-book-card";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `View ${book.title}`);
    card.dataset.echoagaBook = book.id;

    const bookElement = document.createElement("div");
    bookElement.className = "echoaga-book";
    bookElement.style.setProperty("--book-color", book.color);
    bookElement.style.setProperty("--book-accent", book.accent);

    const spine = document.createElement("div");
    spine.className = "echoaga-book-spine";
    spine.textContent = "ECHOAGA";

    const cover = document.createElement("div");
    cover.className = "echoaga-book-cover";

    const brand = document.createElement("span");
    brand.className = "echoaga-book-brand";
    brand.textContent = "ECHOAGA";

    const symbol = document.createElement("span");
    symbol.className = "echoaga-book-symbol";
    symbol.textContent = book.symbol;

    const title = document.createElement("strong");
    title.className = "echoaga-book-title";
    title.textContent = book.title;

    const author = document.createElement("span");
    author.className = "echoaga-book-author";
    author.textContent = book.author;

    cover.append(brand, symbol, title, author);
    bookElement.append(spine, cover);

    const caption = document.createElement("div");
    caption.className = "echoaga-book-caption";

    const captionTitle = document.createElement("h3");
    captionTitle.textContent = book.title;

    const captionAuthor = document.createElement("p");
    captionAuthor.textContent = book.author;

    caption.append(captionTitle, captionAuthor);
    card.append(bookElement, caption);

    return card;
  }

  function renderBooks(categoryKey, subcategory) {
    section.replaceChildren();

    const backButton = document.createElement("button");
    backButton.type = "button";
    backButton.className = "library-back";
    backButton.dataset.libraryBack = "subcategories";
    backButton.textContent = "← Back to Categories";

    const heading = document.createElement("h2");
    heading.textContent = subcategory;

    const description = document.createElement("p");
    description.className = "echoaga-demo-description";
    description.textContent = "Explore the ECHOAGA demo collection.";

    const grid = document.createElement("div");
    grid.className = "echoaga-book-grid";

    (demoBooks[categoryKey] || []).forEach(book => {
      grid.appendChild(createBookCard(book));
    });

    section.append(backButton, heading, description, grid);
  }

  let activeCategory = null;

  section.addEventListener("click", event => {
    if (!(event.target instanceof Element)) return;

    const backButton = event.target.closest("[data-library-back]");
    const categoryButton = event.target.closest("[data-category]");
    const subcategoryButton = event.target.closest("[data-subcategory]");

    if (backButton && section.contains(backButton)) {
      if (backButton.dataset.libraryBack === "subcategories" && activeCategory) {
        renderSubcategories(libraryCategories[activeCategory]);
      } else {
        activeCategory = null;
        renderCategories();
      }
      return;
    }

    if (categoryButton && section.contains(categoryButton)) {
      const key = categoryButton.dataset.category;
      const category = libraryCategories[key];

      if (!category) return;

      activeCategory = key;
      renderSubcategories(category);
      return;
    }

    if (subcategoryButton && section.contains(subcategoryButton)) {
      if (!activeCategory) return;

      renderBooks(activeCategory, subcategoryButton.dataset.subcategory);
    }
  });
}
