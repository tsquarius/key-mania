import GameView from "./game_view";
import GameAudio from "./audio";

document.addEventListener("DOMContentLoaded", () => {
  //canvas context
  const canvas = document.getElementById("game-canvas");
  canvas.width = 500;
  canvas.height = 500;
  const ctx = canvas.getContext("2d");
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const playButton = document.querySelector("#play");
  const restartButton = document.querySelector("#restart");
  const musicSelector = document.getElementById("song-selector");
  const volumeControl = document.querySelector("#volume");

  const audio = new GameAudio();
  const gameView = new GameView(ctx, audio);

  // this should trigger a change in difficulty
  musicSelector.addEventListener("change", e => {
    audio.selectTrack(e.target.value);
    gameView.selectSong(e.target.value);
  });

  playButton.addEventListener("click", () => {
    playButton.textContent = "Restart";
    audio.stopMusic();
    audio.playMusic(playButton);
    gameView.start();
  });


  document.body.onkeydown = function(e) {
    switch (e.keyCode) {
      case 87 || 38:
        gameView.game.player.hitArrow("up");
        break;
      case 83 || 40:
        gameView.game.player.hitArrow("down");
        break;
      case 65 || 37:
        gameView.game.player.hitArrow("left");
        break;
      case 68 || 39:
        gameView.game.player.hitArrow("right");
        break;
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
