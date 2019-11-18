document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game-canvas");
  canvas.width = 500;
  canvas.height = 500;
  const ctx = canvas.getContext("2d");

  ctx.strokeStyle = "#FF0000";
  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.moveTo(62.5, 0);
  ctx.lineTo(62.5, 500);
  ctx.stroke();

  ctx.strokeStyle = "#FF0000";
  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.moveTo(187.5, 0);
  ctx.lineTo(187.5, 500);
  ctx.stroke();

  ctx.strokeStyle = "#FF0000";
  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.moveTo(312.5, 0);
  ctx.lineTo(312.5, 500);
  ctx.stroke();

  ctx.strokeStyle = "#FF0000";
  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.moveTo(437.5, 0);
  ctx.lineTo(437.5, 500);
  ctx.stroke();



  ctx.strokeStyle = "#000";
  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.moveTo(0, 380);
  ctx.lineTo(500, 380);
  ctx.stroke();

  ctx.strokeStyle = "#000";
  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.moveTo(0, 400);
  ctx.lineTo(500, 400);
  ctx.stroke();

  ctx.strokeStyle = "#000";
  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.moveTo(0, 420);
  ctx.lineTo(500, 420);
  ctx.stroke();
  
  ctx.strokeStyle = "#000";
  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.moveTo(0, 440);
  ctx.lineTo(500, 440);
  ctx.stroke();

});