import GameView from "./game_view";
import Game from "./game";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game-canvas");
  canvas.width = 500;
  canvas.height = 500;
  const ctx = canvas.getContext("2d");

  const game = new Game();
  const gameView = new GameView(game, ctx);

  window.game = game;
  gameView.start();
  document.body.onkeydown = function(e) {
    switch(e.keyCode) {
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

});
