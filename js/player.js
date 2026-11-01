
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
      <button type="button" data-player-back aria-label="Back 15 seconds">↶15</button>
      <button type="button" data-player-play class="play-button" aria-label="Play">▶</button>
      <button type="button" data-player-forward aria-label="Forward 30 seconds">30↷</button>
    </div>
    <div class="mini-player-progress">
      <input type="range" data-player-seek min="0" max="100" value="0" step="0.1" aria-label="Audiobook progress">
      <div class="mini-player-time">
        <span data-player-current>0:00</span>
        <span data-player-duration>0:00</span>
      </div>
    </div>
  `;

  audio = new Audio();
  audio.preload = "metadata";

  const playButton = container.querySelector("[data-player-play]");
  const backButton = container.querySelector("[data-player-back]");
  const forwardButton = container.querySelector("[data-player-forward]");
  const seek = container.querySelector("[data-player-seek]");
  const currentTime = container.querySelector("[data-player-current]");
  const duration = container.querySelector("[data-player-duration]");
  const title = container.querySelector("[data-player-title]");
  const author = container.querySelector("[data-player-author]");

  function updateButton() {
    const playing = !audio.paused;

    playButton.textContent = playing ? "Ⅱ" : "▶";
    playButton.setAttribute("aria-label", playing ? "Pause" : "Play");
  }

  function updateProgress() {
    const total = Number.isFinite(audio.duration) ? audio.duration : 0;
    const current = Number.isFinite(audio.currentTime) ? audio.currentTime : 0;

    seek.max = String(total || 100);
    seek.value = String(Math.min(current, total || 100));

    currentTime.textContent = formatTime(current);
    duration.textContent = formatTime(total);

    seek.style.setProperty(
      "--player-progress",
      `${total ? (current / total) * 100 : 0}%`
    );
  }

  async function play() {
    if (!audio.src) return;

    try {
      await audio.play();
    } catch {
      if (window.echoagaNotify) {
        window.echoagaNotify("Unable to play this audiobook. Please try again.", "error");
      }
    }

    updateButton();
  }

  function pause() {
    audio.pause();
    updateButton();
  }

  playButton.addEventListener("click", () => {
    audio.paused ? play() : pause();
  });

  backButton.addEventListener("click", () => {
    audio.currentTime = Math.max(0, audio.currentTime - 15);
  });

  forwardButton.addEventListener("click", () => {
    if (Number.isFinite(audio.duration)) {
      audio.currentTime = Math.min(audio.duration, audio.currentTime + 30);
    }
  });

  seek.addEventListener("input", () => {
    const value = Number(seek.value);
    currentTime.textContent = formatTime(value);
    seek.style.setProperty(
      "--player-progress",
      `${audio.duration ? (value / audio.duration) * 100 : 0}%`
    );
  });

  seek.addEventListener("change", () => {
    if (Number.isFinite(audio.duration)) {
      audio.currentTime = Number(seek.value);
    }
  });

  audio.addEventListener("timeupdate", updateProgress);
  audio.addEventListener("durationchange", updateProgress);
  audio.addEventListener("loadedmetadata", updateProgress);
  audio.addEventListener("play", updateButton);
  audio.addEventListener("pause", updateButton);
  audio.addEventListener("ended", updateButton);

  audio.addEventListener("error", () => {
    updateButton();

    if (window.echoagaNotify) {
      window.echoagaNotify("Audio file could not be loaded.", "error");
    }
  });

  window.echoagaPlayer = {
    load(book) {
      if (!book || typeof book.audioUrl !== "string" || !book.audioUrl.trim()) {
        return false;
      }

      let audioUrl;

      try {
        audioUrl = new URL(book.audioUrl, window.location.href);

        if (!["http:", "https:"].includes(audioUrl.protocol)) {
          return false;
        }
      } catch {
        return false;
      }

      audio.pause();
      audio.src = audioUrl.href;
      audio.load();

      currentBook = book;

      title.textContent = book.title || "Untitled Audiobook";
      author.textContent = book.author || "Unknown Author";

      container.hidden = false;

      updateButton();
      updateProgress();

      return true;
    },

    play,
    pause,

    seekTo(seconds) {
      if (!Number.isFinite(seconds) || !Number.isFinite(audio.duration)) return;
      audio.currentTime = Math.max(0, Math.min(seconds, audio.duration));
    },

    getAudio() {
      return audio;
    },

    getCurrentBook() {
      return currentBook;
    }
  };
}

export { initializePlayer };
