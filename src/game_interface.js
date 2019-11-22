import Game from "./game";

const SONG_SETTINGS = {
  jungle: { arrows: 450, velocity: 4.5, frequency: 300 },
  fiji: { arrows: 230, velocity: 3.5, frequency: 400 }
};

const gameOverNoise = document.createElement("audio");
gameOverNoise.src = "./assets/gameover.wav";

export default class GameInterface {
  constructor(ctx, audio) {
    this.song = null;
    this.game = null;
    this.ctx = ctx;
    this.play = false;
    this.audio = audio;
    this.seconds = 4;
  }

  selectSong(song) {
    this.play = false;
    this.song = song;
  }

  start() {
    this.play = true;
    this.seconds = 3;
    if (!this.song) return;
    this.game = new Game(SONG_SETTINGS[this.song]);
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  countDown(btn) {
    const countDownEl = document.getElementById("countdown");
    const timer = setInterval(() => {
      this.seconds--;
      if (this.seconds === 3) {
      countDownEl.textContent = "Starting in...";
      } else {
        countDownEl.textContent = this.seconds;
      }
      if (this.seconds === 0) {
        clearInterval(timer);
        this.audio.stopMusic();
        this.audio.playMusic(btn);
        this.start();
        countDownEl.textContent = "";
      }
    }, 1000);
  }

  // Game is over if player misses too many OR no more arrows
  stopGame() {
    if (this.game.gameLost() || this.game.gameFinished()) {
      this.play = false;
      document.getElementById("play").textContent = "Play Again";
      this.audio.stopMusic();
      this.audio.audioElement.currentTime = 0;
      gameOverNoise.play();
    }

    if (this.game.gameLost()) {
      this.ctx.font = "40px Arial";
      this.ctx.fillStyle = "red";
      this.ctx.fillText("GAME OVER", 140, 250);
    }

    if (this.game.gameFinished()) {
      this.ctx.font = "40px Arial";
      this.ctx.fillStyle = "red";
      this.ctx.fillText("COMPLETED!", 120, 250);
    }

  }

  animate(time) {
    if (this.play) {
      const timeDelta = time - this.lastTime;
      this.game.activateArrow();
      this.game.moveArrows(timeDelta);
      this.game.render(this.ctx, time);

      this.lastTime = time;

      this.stopGame();

      requestAnimationFrame(this.animate.bind(this));
    }
  }
}
