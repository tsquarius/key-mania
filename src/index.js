import Arrows from './arrows';
import GameView from './game_view';
import Game from './game';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game-canvas");
  canvas.width = 500;
  canvas.height = 500;
  const ctx = canvas.getContext("2d");

  const game = new Game;
  const gameView = new GameView(game, ctx);

  gameView.start();

  // ctx.strokeStyle = "#FF0000";
  // ctx.beginPath();
  // ctx.lineWidth = 5;
  // ctx.moveTo(62.5, 0);
  // ctx.lineTo(62.5, 500);
  // ctx.stroke();

  // ctx.strokeStyle = "#FF0000";
  // ctx.beginPath();
  // ctx.lineWidth = 5;
  // ctx.moveTo(187.5, 0);
  // ctx.lineTo(187.5, 500);
  // ctx.stroke();

  // ctx.strokeStyle = "#FF0000";
  // ctx.beginPath();
  // ctx.lineWidth = 5;
  // ctx.moveTo(312.5, 0);
  // ctx.lineTo(312.5, 500);
  // ctx.stroke();

  // ctx.strokeStyle = "#FF0000";
  // ctx.beginPath();
  // ctx.lineWidth = 5;
  // ctx.moveTo(437.5, 0);
  // ctx.lineTo(437.5, 500);
  // ctx.stroke();



  // ctx.strokeStyle = "#000";
  // ctx.beginPath();
  // ctx.lineWidth = 5;
  // ctx.moveTo(0, 80);
  // ctx.lineTo(500, 80);
  // ctx.stroke();

  // ctx.strokeStyle = "#000";
  // ctx.beginPath();
  // ctx.lineWidth = 5;
  // ctx.moveTo(0, 60);
  // ctx.lineTo(500, 60);
  // ctx.stroke();

  // ctx.strokeStyle = "#000";
  // ctx.beginPath();
  // ctx.lineWidth = 5;
  // ctx.moveTo(0, 20);
  // ctx.lineTo(500, 20);
  // ctx.stroke();
  
  // ctx.strokeStyle = "#000";
  // ctx.beginPath();
  // ctx.lineWidth = 5;
  // ctx.moveTo(0, 40);
  // ctx.lineTo(500, 40);
  // ctx.stroke();

  // const arrow = new Arrows({position: [10, 440], velocity: 2});
  // arrow.render(ctx);

  // arrow.move();
  // arrow.render(ctx);

  // arrow.move();
  // arrow.render(ctx);



  // ctx.beginPath();
  // ctx.rect(10, 440, 105, 60);
  // ctx.stroke();

  // ctx.beginPath();
  // ctx.rect(135, 440, 105, 60);
  // ctx.stroke();

  // ctx.beginPath();
  // ctx.rect(260, 440, 105, 60);
  // ctx.stroke();

  // ctx.beginPath();
  // ctx.rect(385, 440, 105, 60);
  // ctx.stroke();


});