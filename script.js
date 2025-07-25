document.addEventListener("DOMContentLoaded", function () {
  const intro = document.getElementById("intro");
  const bassEntry = document.getElementById("bass_entry");
  const mainContent = document.getElementById("main-content");
  const customImage = document.getElementById("custom-image");
  const surpriseBtn = document.getElementById("surprise-btn");
  const phrases = document.getElementById("phrases");
  const surprise = document.getElementById("surprise");
  const videoContainer = document.getElementById("video-container");
  const customVideo = document.getElementById("custom-video");
  const bassSound = document.getElementById("bass-sound");

  function isMobile() {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }

  bassEntry.addEventListener("click", function () {
  bassSound.currentTime = 0;
  bassSound.play().catch((error) => {
    console.warn("Error al intentar reproducir el sonido:", error);
  });

  intro.style.display = "none";
  mainContent.style.display = "block";
  customImage.style.display = "block";
  surpriseBtn.style.display = "inline-block";
});

  surpriseBtn.addEventListener("click", function () {
    bassSound.pause();
    bassSound.currentTime = 0;

    phrases.style.display = "block";
    surprise.style.display = "block";

    // Mostrar y preparar el video
    videoContainer.style.display = "flex";

    if (isMobile()) {
      // En móvil: video silenciado y mostrar botón para activar sonido
      customVideo.muted = true;
      customVideo.play();

      if (!document.getElementById("unmute-btn")) {
        const btn = document.createElement("button");
        btn.id = "unmute-btn";
        btn.textContent = "🔊 Activar sonido";
        btn.className = "unmute-btn";
        btn.style.marginTop = "1rem";

        btn.addEventListener("click", () => {
          customVideo.muted = false;
          customVideo.play();
          btn.style.display = "none";
        });

        videoContainer.appendChild(btn);
      }
    } else {
      // En PC: video con sonido y autoplay
      customVideo.muted = false;
      customVideo.play();

      // Quitar botón de activar sonido si existía
      const existingBtn = document.getElementById("unmute-btn");
      if (existingBtn) {
        existingBtn.remove();
      }
    }
  });
});
