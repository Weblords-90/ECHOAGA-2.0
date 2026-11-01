
let audio = null;
let currentBook = null;

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";

  const minutes = Math.floor(seconds / 60);
  const remaining = Math.floor(seconds % 60);

  return `${minutes}:${String(remaining).padStart(2, "0")}`;
}

function initializePlayer() {
  const container = document.getElementById("miniPlayer");

  if (!container) return;

  container.innerHTML = `
    <div class="mini-player-art">♫</div>
    <div class="mini-player-info">
      <h4 data-player-title>Nothing playing</h4>
      <p data-player-author>Choose an audiobook</p>
    </div>
    <div class="mini-player-controls">
      <button type="button" data-player-play class="play-button" aria-label="Play">▶</button>
    </div>
  `;

  audio = new Audio();
  audio.preload = "metadata";

  const playButton = container.querySelector("[data-player-play]");
  const title = container.querySelector("[data-player-title]");
  const author = container.querySelector("[data-player-author]");

  function updateButton() {
    const playing = !audio.paused;
    playButton.textContent = playing ? "Ⅱ" : "▶";
    playButton.setAttribute("aria-label", playing ? "Pause" : "Play");
  }

  async function play() {
    if (!audio.src) return;

    try {
      await audio.play();
    } catch (error) {
      console.error("Audio playback failed:", error);
    }
  }

  function pause() {
    audio.pause();
  }

  playButton.addEventListener("click", () => {
    if (audio.paused) {
      play();
    } else {
      pause();
    }
  });

  audio.addEventListener("play", updateButton);
  audio.addEventListener("pause", updateButton);
  audio.addEventListener("ended", updateButton);

  window.echoagaPlayer = {
    load(book) {
      if (!book?.audioUrl) return;

      currentBook = book;
      audio.src = book.audioUrl;
      title.textContent = book.title || "Untitled Audiobook";
      author.textContent = book.author || "Unknown Author";

      container.hidden = false;
      updateButton();
    },
    play,
    pause,
    getAudio() {
      return audio;
    },
    getCurrentBook() {
      return currentBook;
    }
  };
}

export { initializePlayer };

