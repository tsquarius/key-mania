import GameView from "./game_view";
import Game from "./game";
import GameAudio from "./audio";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game-canvas");
  canvas.width = 500;
  canvas.height = 500;
  const ctx = canvas.getContext("2d");

  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const playButton = document.querySelector("#music");
  const audio = new GameAudio();
  // audioElement.crossOrigin = "anonymous";
  const musicSelector = document.getElementById("song-selector");
  const volumeControl = document.querySelector("#volume");

  const game = new Game();
  const gameView = new GameView(game, ctx);

  window.game = game;

  const start = document.getElementById("play");
  start.addEventListener("click", () => {
    gameView.play = true;
    gameView.start();
  });

  document.body.onkeydown = function(e) {
    switch (e.keyCode) {
      case 87:
        game.player.hitArrow("up");
        break;
      case 83:
        game.player.hitArrow("down");
        break;
      case 65:
        game.player.hitArrow("left");
        break;
      case 68:
        game.player.hitArrow("right");
        break;
    }
  };

  // this will get replaced with the start game button
  playButton.addEventListener("click", () => {
    audio.playMusic(playButton);
  });

  // this should trigger a change in difficulty
  musicSelector.addEventListener("change", e => {
    audio.selectTrack(e.target.value);
  });

  // can remain as is
  volumeControl.addEventListener(
    "input",
    () => {
      audio.adjustVolume(volumeControl);
    },
    false
  );
});
