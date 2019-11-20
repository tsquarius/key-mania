// goals:
// Play song for the specific session
// Noises for when arrow hits
// Sound level controller

//jungle = 2:37  / 157.92
//tropical = 3:40 / 220.392

export default class GameAudio {
  constructor() {
    this.audioCtx = new AudioContext();
    this.audioElement = null;
    this.songId = null;
    this.track = {};
    this.volume = {};
    this.playButton = document.querySelector("#music");
    window.track = this.track;
  }

  // changes audio element based on dropdown
  selectTrack(songId) {
    if (this.songId) {
      this.stopMusic();
    }
    this.songId = songId;
    this.updateCurrentAudioEl();

    if (!this.track[songId]) this.addTrackToObject();
    this.connectVolume(songId);
  }

  updateCurrentAudioEl() {
    const audioEl = document.getElementById(this.songId);
    audioEl.currentTime = 0;
    this.audioElement = audioEl;
  }

  addTrackToObject() {
    let track = this.audioCtx.createMediaElementSource(this.audioElement);
    track.connect(this.audioCtx.destination);
    this.track[this.songId] = track;
  }

  connectVolume(songId) {
    if (!this.volume[songId]) {
      const gainNode = this.audioCtx.createGain();
      this.track[songId].connect(gainNode).connect(this.audioCtx.destination);
      this.volume[songId] = gainNode;
    }
  }

  adjustVolume(controller) {
    this.volume[this.songId].gain.value = controller.value;
  }

  playMusic(btn) {
    if (!this.songId) return;

    if (this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }

    if (btn.dataset.playing === "false") {
      this.audioElement.play();
      btn.dataset.playing = "true";
    } else if (btn.dataset.playing === "true") {
      this.audioElement.pause();
      btn.dataset.playing = "false";
    }

    // stop when music ends
    this.audioElement.addEventListener(
      "ended",
      () => {
        btn.dataset.playing = "false";
      },
      false
    );
  }

  stopMusic() {
    this.playButton.dataset.playing = "false";
    this.audioElement.pause();
  }
}
