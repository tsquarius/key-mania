// import Game from './game';

function debounce(func, wait) {
  let timeout;
  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}


export default class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }

  start() {
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;
    this.game.activateArrow();
    this.game.moveArrows(timeDelta);
    this.game.render(this.ctx);
    this.lastTime = time;
    // console.log(this.game.arrowsActive.length);
    
    requestAnimationFrame(this.animate.bind(this));
  }

}
