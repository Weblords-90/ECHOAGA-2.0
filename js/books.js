
const echoagaBooks = [
  {
    id: "quiet-mind",
    title: "The Quiet Mind",
    author: "Aarav Mehta",
    category: "psychology",
    subcategory: "Mental Well-being",
    type: "audiobook",
    description: "A journey into understanding your thoughts and finding inner peace.",
    cover: "assets/covers/quiet-mind.jpg",
    rating: 4.8,
    duration: "5h 20m",
    chapters: 12,
    featured: true
  },
  {
    id: "human-mind",
    title: "Inside the Human Mind",
    author: "Dr. Rohan Kapoor",
    category: "psychology",
    subcategory: "Human Mind",
    type: "audiobook",
    description: "Explore the mysteries of human behaviour, emotions and thinking.",
    cover: "assets/covers/human-mind.jpg",
    rating: 4.7,
    duration: "6h 10m",
    chapters: 14,
    featured: false
  },
  {
    id: "next-version",
    title: "Your Next Version",
    author: "Kabir Malhotra",
    category: "self-improvement",
    subcategory: "Habits and Discipline",
    type: "audiobook",
    description: "Build better habits and become the best version of yourself.",
    cover: "assets/covers/next-version.jpg",
    rating: 4.9,
    duration: "4h 45m",
    chapters: 10,
    featured: true
  },
  {
    id: "small-wins",
    title: "The Power of Small Wins",
    author: "Ishita Sharma",
    category: "self-improvement",
    subcategory: "Motivation and Inspiration",
    type: "audiobook",
    description: "Discover how small actions can create extraordinary results.",
    cover: "assets/covers/small-wins.jpg",
    rating: 4.6,
    duration: "3h 50m",
    chapters: 9,
    featured: false
  },
  {
    id: "starblade",
    title: "Starblade Chronicles",
    author: "Ren Takahashi",
    category: "manga",
    subcategory: "Action",
    type: "manga",
    description: "A young warrior discovers a mysterious power hidden within an ancient blade.",
    cover: "assets/covers/starblade.jpg",
    rating: 4.9,
    chapters: 24,
    featured: true
  },
  {
    id: "echoes-kairo",
    title: "Echoes of Kairo",
    author: "Mika Sato",
    category: "manga",
    subcategory: "Adventure",
    type: "manga",
    description: "An unforgettable adventure through a world full of secrets.",
    cover: "assets/covers/echoes-kairo.jpg",
    rating: 4.8,
    chapters: 18,
    featured: false
  },
  {
    id: "thousand-autumns",
    title: "A Thousand Autumns",
    author: "Anaya Verma",
    category: "novels",
    subcategory: "Romance and Relationships",
    type: "audiobook",
    description: "A heartfelt story about love, distance and second chances.",
    cover: "assets/covers/thousand-autumns.jpg",
    rating: 4.7,
    duration: "7h 15m",
    chapters: 16,
    featured: true
  },
  {
    id: "glass-garden",
    title: "The Glass Garden",
    author: "Meera Khanna",
    category: "novels",
    subcategory: "Fiction",
    type: "audiobook",
    description: "A mysterious garden changes the lives of everyone who enters it.",
    cover: "assets/covers/glass-garden.jpg",
    rating: 4.6,
    duration: "6h 30m",
    chapters: 15,
    featured: false
  },
  {
    id: "silent-key",
    title: "The Silent Key",
    author: "Arjun Sethi",
    category: "mystery",
    subcategory: "Puzzle Mystery",
    type: "audiobook",
    description: "A strange key leads to a puzzle that nobody has ever solved.",
    cover: "assets/covers/silent-key.jpg",
    rating: 4.8,
    duration: "5h 40m",
    chapters: 13,
    featured: true
  },
  {
    id: "hollow-lane",
    title: "Secrets of Hollow Lane",
    author: "Naina Roy",
    category: "mystery",
    subcategory: "Detective Mystery",
    type: "audiobook",
    description: "A detective investigates a disappearance in a quiet town.",
    cover: "assets/covers/hollow-lane.jpg",
    rating: 4.7,
    duration: "6h 05m",
    chapters: 14,
    featured: false
  },
  {
    id: "red-moon",
    title: "Beyond the Red Moon",
    author: "Devansh Rao",
    category: "sci-fi",
    subcategory: "Space and Aliens",
    type: "audiobook",
    description: "A space expedition discovers something beyond human imagination.",
    cover: "assets/covers/red-moon.jpg",
    rating: 4.9,
    duration: "7h 00m",
    chapters: 17,
    featured: true
  },
  {
    id: "memory-engine",
    title: "The Memory Engine",
    author: "Sana Iyer",
    category: "sci-fi",
    subcategory: "AI and Robotics",
    type: "audiobook",
    description: "An advanced machine begins remembering things that never happened.",
    cover: "assets/covers/memory-engine.jpg",
    rating: 4.8,
    duration: "5h 55m",
    chapters: 12,
    featured: false
  }
];

const categoryNames = {
  psychology: "Psychology",
  "self-improvement": "Self Improvement",
  manga: "Manga",
  novels: "Novels",
  mystery: "Mystery",
  "sci-fi": "Science Fiction"
};

function createEchoagaBook(book) {
  const card = document.createElement("div");

  card.className = "book-card";
  card.dataset.bookId = book.id;
  card.dataset.category = book.category;
  card.dataset.subcategory = book.subcategory;
  card.dataset.type = book.type;

  card.dataset.search = [
    book.title,
    book.author,
    book.category,
    book.subcategory,
    book.type,
    book.description
  ].join(" ").toLowerCase();

  card.innerHTML = `
    <div class="book-cover">
      <img src="${book.cover}" alt="${book.title}" loading="lazy">
    </div>
    <div class="book-info">
      <h3>${book.title}</h3>
      <p>${book.author}</p>
      <span class="book-rating">★ ${book.rating}</span>
    </div>
  `;

  return card;
}

function initializeEchoagaBooks() {
  const container = document.getElementById("echoagaLibraryBooks");

  if (!container) return;

  container.innerHTML = "";

  echoagaBooks.forEach(book => {
    container.appendChild(createEchoagaBook(book));
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeEchoagaBooks, { once: true });
} else {
  initializeEchoagaBooks();
}

export { echoagaBooks, categoryNames, createEchoagaBook };
    
