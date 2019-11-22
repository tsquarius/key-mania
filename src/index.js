import GameInterface from "./game_interface";
import GameAudio from "./audio";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game-canvas");
  canvas.width = 500;
  canvas.height = 500;
  const ctx = canvas.getContext("2d");
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const playButton = document.querySelector("#play");
  const musicSelector = document.getElementById("song-selector");
  const volumeControl = document.querySelector("#volume");

  const audio = new GameAudio();
  const gameInterface = new GameInterface(ctx, audio);

  musicSelector.addEventListener("change", e => {
    audio.selectTrack(e.target.value);
    gameInterface.selectSong(e.target.value);
  });

  playButton.addEventListener("click", () => {
    if (!audio.audioElement) return;
    gameInterface.countDown(playButton);
  });

  document.body.onkeydown = function(e) {
    if (!gameInterface.game) return;

    if ([87,38].includes(e.keyCode)) {
      e.preventDefault();
      gameInterface.game.player.hitArrow("up");
    } else if ([83, 40].includes(e.keyCode)) {
      e.preventDefault();
      gameInterface.game.player.hitArrow("down");
    } else if([65,37].includes(e.keyCode)) {
      e.preventDefault();
      gameInterface.game.player.hitArrow("left");
    } else if ([68, 39].includes(e.keyCode)) {
      e.preventDefault();
      gameInterface.game.player.hitArrow("right");
    }
  };

  volumeControl.addEventListener(
    "input",
    e => {
      audio.adjustVolume(e.target.value);
    },
    false
  );
});
