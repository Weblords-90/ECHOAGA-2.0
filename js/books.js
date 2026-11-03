
const echoagaBooks = [
  {
    id: "quiet-mind",
    title: "The Quiet Mind",
    author: "A. Rowan",
    category: "psychology",
    color: "#244b3b",
    accent: "#d5b66c",
    symbol: "◉",
    description: "Explore the hidden patterns of thought, emotion and the human mind.",
    progress: 68
  },
  {
    id: "human-mind",
    title: "Inside the Human Mind",
    author: "E. Morgan",
    category: "psychology",
    color: "#24364b",
    accent: "#c6a76a",
    symbol: "✧",
    description: "A fictional journey through memory, behaviour and perception.",
    progress: 0
  },
  {
    id: "next-version",
    title: "The Next Version",
    author: "J. Vale",
    category: "self-improvement",
    color: "#31513d",
    accent: "#dfc27b",
    symbol: "✦",
    description: "Small decisions, powerful habits and the journey of personal growth.",
    progress: 32
  },
  {
    id: "small-wins",
    title: "Small Wins",
    author: "M. Ellis",
    category: "self-improvement",
    color: "#4b3827",
    accent: "#e0b96d",
    symbol: "↗",
    description: "A fictional guide to building momentum through everyday actions.",
    progress: 0
  },
  {
    id: "starblade",
    title: "The Last Starblade",
    author: "K. Arashi",
    category: "manga",
    color: "#382b50",
    accent: "#d9b86d",
    symbol: "刀",
    description: "A mysterious warrior discovers a power hidden beyond the stars.",
    progress: 0
  },
  {
    id: "echoes-kairo",
    title: "Echoes of Kairo",
    author: "R. Sato",
    category: "manga",
    color: "#263e54",
    accent: "#d5b66c",
    symbol: "月",
    description: "An original fantasy adventure through a forgotten city.",
    progress: 0
  },
  {
    id: "thousand-autumns",
    title: "A Thousand Autumns",
    author: "L. Winters",
    category: "novels",
    color: "#5a343b",
    accent: "#e2bd79",
    symbol: "❧",
    description: "A fictional story of memory, distance and unexpected connections.",
    progress: 0
  },
  {
    id: "glass-garden",
    title: "The Glass Garden",
    author: "N. Hart",
    category: "novels",
    color: "#315247",
    accent: "#d7c18a",
    symbol: "❀",
    description: "A mysterious garden holds the secrets of a forgotten family.",
    progress: 0
  },
  {
    id: "silent-key",
    title: "The Silent Key",
    author: "C. Blackwood",
    category: "mystery",
    color: "#292e3d",
    accent: "#d5b66c",
    symbol: "⌘",
    description: "One key, a locked room and a secret nobody wants uncovered.",
    progress: 84
  },
  {
    id: "hollow-lane",
    title: "Midnight at Hollow Lane",
    author: "I. Graves",
    category: "mystery",
    color: "#49313a",
    accent: "#d6b875",
    symbol: "☾",
    description: "A strange disappearance leads to a trail of impossible clues.",
    progress: 0
  },
  {
    id: "red-moon",
    title: "Beyond the Red Moon",
    author: "T. Orion",
    category: "sci-fi",
    color: "#263d55",
    accent: "#e0bd70",
    symbol: "☄",
    description: "An original science-fiction adventure beyond the edge of known space.",
    progress: 0
  },
  {
    id: "memory-engine",
    title: "The Memory Engine",
    author: "A. Nova",
    category: "sci-fi",
    color: "#34304f",
    accent: "#d9b86d",
    symbol: "⌬",
    description: "A machine capable of storing memories begins to rewrite reality.",
    progress: 0
  }
];

const categoryNames = {
  psychology: "Psychology",
  "self-improvement": "Self-Improvement",
  manga: "Manga",
  novels: "Novels",
  mystery: "Mystery",
  "sci-fi": "Sci-Fi"
};

function createEchoagaBook(book) {
  const card = document.createElement("article");
  card.className = "echoaga-book-card";
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", `View ${book.title}`);
  card.dataset.echoagaBook = book.id;
  card.dataset.search = [
    book.title,
    book.author,
    book.category,
    categoryNames[book.category],
    book.description
  ].join(" ").toLowerCase();

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

function renderBookGrid(container, books) {
  if (!container) return;

  container.replaceChildren();

  books.forEach(book => {
    container.appendChild(createEchoagaBook(book));
  });
}

function renderDiscoverBooks() {
  const discover = document.getElementById("discover");
  const firstSection = discover?.querySelector(".discover-section");

  if (!firstSection || document.getElementById("echoagaDiscoverBooks")) return;

  firstSection.querySelector(".discover-placeholder")?.remove();

  const grid = document.createElement("div");
  grid.id = "echoagaDiscoverBooks";
  grid.className = "echoaga-book-grid";

  echoagaBooks.forEach(book => {
    grid.appendChild(createEchoagaBook(book));
  });

  firstSection.appendChild(grid);
}

function showBookDetails(book) {
  let dialog = document.getElementById("echoagaBookDialog");

  if (!dialog) {
    dialog = document.createElement("dialog");
    dialog.id = "echoagaBookDialog";
    dialog.className = "echoaga-book-dialog";
    document.body.appendChild(dialog);
  }

  dialog.replaceChildren();

  const close = document.createElement("button");
  close.type = "button";
  close.className = "echoaga-dialog-close";
  close.textContent = "×";
  close.setAttribute("aria-label", "Close book details");
  close.addEventListener("click", () => dialog.close());

  const heading = document.createElement("span");
  heading.className = "echoaga-dialog-brand";
  heading.textContent = "ECHOAGA COLLECTION";

  const title = document.createElement("h2");
  title.textContent = book.title;

  const author = document.createElement("p");
  author.className = "echoaga-dialog-author";
  author.textContent = `Created by ${book.author}`;

  const category = document.createElement("span");
  category.className = "echoaga-dialog-category";
  category.textContent = categoryNames[book.category];

  const description = document.createElement("p");
  description.className = "echoaga-dialog-description";
  description.textContent = book.description;

  const note = document.createElement("p");
  note.className = "echoaga-dialog-note";
  note.textContent = book.category === "manga"
    ? "Demo manga • Page-by-page reading is coming soon."
    : "Demo audiobook • Audio playback is not available yet.";

  dialog.append(close, heading, title, author, category, description, note);

  if (!dialog.open) {
    dialog.showModal();
  }
}

function initializeEchoagaBooks() {
  const homeBooks = echoagaBooks.slice(0, 8);
  const continueBooks = echoagaBooks.filter(book => book.progress > 0);

  renderBookGrid(
    document.getElementById("homeBookGrid"),
    homeBooks
  );

  renderBookGrid(
    document.getElementById("continueBookGrid"),
    continueBooks
  );

  renderDiscoverBooks();

  const librarySection = document.querySelector("#library .library-category-section");

  if (librarySection && !document.getElementById("echoagaLibraryBooks")) {
    const catalog = document.createElement("section");
    catalog.id = "echoagaLibraryBooks";
    catalog.className = "echoaga-library-catalog";

    Object.entries(categoryNames).forEach(([key, name]) => {
      const group = document.createElement("section");
      group.className = "echoaga-library-group";
      group.dataset.echoagaCategory = key;

      const heading = document.createElement("h2");
      heading.textContent = name;

      const grid = document.createElement("div");
      grid.className = "echoaga-book-grid";

      const books = echoagaBooks.filter(book => book.category === key);
      books.forEach(book => grid.appendChild(createEchoagaBook(book)));

      group.append(heading, grid);
      catalog.appendChild(group);
    });

    librarySection.after(catalog);
  }

  document.addEventListener("click", event => {
    if (!(event.target instanceof Element)) return;

    const card = event.target.closest("[data-echoaga-book]");
    if (!card) return;

    const book = echoagaBooks.find(item => item.id === card.dataset.echoagaBook);
    if (book) showBookDetails(book);
  });

  document.addEventListener("keydown", event => {
    if (event.key !== "Enter" && event.key !== " ") return;
    if (!(event.target instanceof Element)) return;

    const card = event.target.closest("[data-echoaga-book]");
    if (!card) return;

    event.preventDefault();

    const book = echoagaBooks.find(item => item.id === card.dataset.echoagaBook);
    if (book) showBookDetails(book);
  });
}


if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeEchoagaBooks, { once: true });
} else {
  initializeEchoagaBooks();
}

export { echoagaBooks, categoryNames, createEchoagaBook };

