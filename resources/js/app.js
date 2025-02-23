import "./bootstrap";
import Alpine from "alpinejs";

window.Alpine = Alpine;
Alpine.start();

// Progress tracking
document.addEventListener("alpine:init", () => {
  Alpine.store("progress", {
    tracks: {},
    updateTrackProgress(trackId, newProgress) {
      this.tracks[trackId] = newProgress;
    },
  });
});
