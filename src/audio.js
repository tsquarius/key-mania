// goals:
// Play song for the specific session
// Noises for when arrow hits
// Sound level controller

//jungle = 2:37  / 157.92 =>  115 BPM
//tropical = 1:39 / 220.392 => 70 BPM

export default class GameAudio {
  constructor() {
    this.audioCtx = new AudioContext();
    this.audioElement = null;
    this.songId = null;
    this.track = {};
    this.volume = {};
    window.track = this.track;
    window.volume = this.volume;
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

    const currentVolume = document.querySelector("#volume").value;
    this.volume[this.songId].gain.value = currentVolume;
  }

  adjustVolume(val) {
    if (!this.songId) return;
    this.volume[this.songId].gain.value = val;
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
    document.querySelector("#play").dataset.playing = "false";
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
    }
  }
}
