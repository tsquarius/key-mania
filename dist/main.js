/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/arrows.js":
/*!***********************!*\
  !*** ./src/arrows.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Arrows; });\nconst DEFAULT_POS = {\n  left: [10,500],\n  right: [135, 500],\n  up: [260, 500],\n  down: [385, 500]\n};\n\nconst TIME_DELTA = 1000 / 60;\n\nclass Arrows {\n  constructor(data) {\n    this.direction = data.direction; // which way the arrow is pointing\n    this.position = DEFAULT_POS[this.direction]; // upper left most\n    // this.top = 0; // should be this.position[1]\n    // this.bottom = 0; // should be this.position[1] + height\n    this.width = data.width || 105; // will be defined later\n    this.height = data.height || 60; // to be determined\n    this.velocity = 0; // movement speed\n    this.striked = false; // checks if a user has tried to hit this\n  }\n\n  move(timeDelta) {\n    const velocityScale = timeDelta / TIME_DELTA;\n    const [posX, posY] = this.position;\n    this.position = [posX, posY - this.velocity * velocityScale];\n  }\n\n  render(ctx) {\n    const [posX, posY] = this.position;\n    ctx.beginPath();\n    ctx.rect(posX, posY, this.width, this.height);\n    ctx.stroke();\n  }\n\n  assignVelocity(vel) {\n    this.velocity = vel;\n  }\n\n}\n\n//# sourceURL=webpack:///./src/arrows.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Game; });\n/* harmony import */ var _arrows__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrows */ \"./src/arrows.js\");\n\n\nconst ArrowDirections = [\n  'left', 'right', 'up', 'down'\n];\n\nconst DEFAULT_ARROWS = {\n  easy: 200,\n  medium: 300,\n  hard: 400\n};\n\n\nfunction debounce(callback, wait) {\n  let timeout;\n  return (...args) => {\n    const context = this;\n    clearTimeout(timeout);\n    timeout = setTimeout(() => callback.apply(context, args), wait);\n  };\n}\n\n\nclass Game {\n  constructor() {\n    this.arrowsQueue = [];\n    this.arrowsActive = [];\n    this.velocity = 4;\n    // this.difficulty = difficulty;\n    this.populateArrows();\n    this.activateArrow = debounce(this.activateArrow.bind(this), 18);\n  }\n\n  populateArrows() {\n    const numArrows = Array.from(new Array(200), (x,i) => i);\n    numArrows.forEach(x => {\n      const rndm = Math.floor(Math.random() * 4);\n      const direction = ArrowDirections[rndm];\n      this.arrowsQueue.push(new _arrows__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({direction}));\n    });\n  }\n\n  activateArrow() {\n    if (this.arrowsQueue.length > 0) {\n      const arrow = this.arrowsQueue.pop();\n      arrow.assignVelocity(this.velocity);\n      this.arrowsActive.push(arrow);\n    }\n  }\n\n  moveArrows(timeDelta) {\n    this.arrowsActive.forEach(arrow => {\n      arrow.move(timeDelta);\n    });\n  }\n\n  render(ctx) {\n    ctx.clearRect(0, 0, 500, 500);\n    this.arrowsActive.forEach(arrow => {\n      arrow.render(ctx);\n    });\n  }\n}\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return GameView; });\n// import Game from './game';\n\nfunction debounce(func, wait) {\n  let timeout;\n  return function(...args) {\n    const context = this;\n    clearTimeout(timeout);\n    timeout = setTimeout(() => func.apply(context, args), wait);\n  };\n}\n\n\nclass GameView {\n  constructor(game, ctx) {\n    this.game = game;\n    this.ctx = ctx;\n  }\n\n  start() {\n    this.lastTime = 0;\n    requestAnimationFrame(this.animate.bind(this));\n  }\n\n  animate(time) {\n    const timeDelta = time - this.lastTime;\n    this.game.activateArrow();\n    this.game.moveArrows(timeDelta);\n    this.game.render(this.ctx);\n    this.lastTime = time;\n    // console.log(this.game.arrowsActive.length);\n    \n    requestAnimationFrame(this.animate.bind(this));\n  }\n\n}\n\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _arrows__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrows */ \"./src/arrows.js\");\n/* harmony import */ var _game_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  const canvas = document.getElementById(\"game-canvas\");\n  canvas.width = 500;\n  canvas.height = 500;\n  const ctx = canvas.getContext(\"2d\");\n\n  const game = new _game__WEBPACK_IMPORTED_MODULE_2__[\"default\"];\n  const gameView = new _game_view__WEBPACK_IMPORTED_MODULE_1__[\"default\"](game, ctx);\n\n  gameView.start();\n\n  // ctx.strokeStyle = \"#FF0000\";\n  // ctx.beginPath();\n  // ctx.lineWidth = 5;\n  // ctx.moveTo(62.5, 0);\n  // ctx.lineTo(62.5, 500);\n  // ctx.stroke();\n\n  // ctx.strokeStyle = \"#FF0000\";\n  // ctx.beginPath();\n  // ctx.lineWidth = 5;\n  // ctx.moveTo(187.5, 0);\n  // ctx.lineTo(187.5, 500);\n  // ctx.stroke();\n\n  // ctx.strokeStyle = \"#FF0000\";\n  // ctx.beginPath();\n  // ctx.lineWidth = 5;\n  // ctx.moveTo(312.5, 0);\n  // ctx.lineTo(312.5, 500);\n  // ctx.stroke();\n\n  // ctx.strokeStyle = \"#FF0000\";\n  // ctx.beginPath();\n  // ctx.lineWidth = 5;\n  // ctx.moveTo(437.5, 0);\n  // ctx.lineTo(437.5, 500);\n  // ctx.stroke();\n\n\n\n  // ctx.strokeStyle = \"#000\";\n  // ctx.beginPath();\n  // ctx.lineWidth = 5;\n  // ctx.moveTo(0, 80);\n  // ctx.lineTo(500, 80);\n  // ctx.stroke();\n\n  // ctx.strokeStyle = \"#000\";\n  // ctx.beginPath();\n  // ctx.lineWidth = 5;\n  // ctx.moveTo(0, 60);\n  // ctx.lineTo(500, 60);\n  // ctx.stroke();\n\n  // ctx.strokeStyle = \"#000\";\n  // ctx.beginPath();\n  // ctx.lineWidth = 5;\n  // ctx.moveTo(0, 20);\n  // ctx.lineTo(500, 20);\n  // ctx.stroke();\n  \n  // ctx.strokeStyle = \"#000\";\n  // ctx.beginPath();\n  // ctx.lineWidth = 5;\n  // ctx.moveTo(0, 40);\n  // ctx.lineTo(500, 40);\n  // ctx.stroke();\n\n  // const arrow = new Arrows({position: [10, 440], velocity: 2});\n  // arrow.render(ctx);\n\n  // arrow.move();\n  // arrow.render(ctx);\n\n  // arrow.move();\n  // arrow.render(ctx);\n\n\n\n  // ctx.beginPath();\n  // ctx.rect(10, 440, 105, 60);\n  // ctx.stroke();\n\n  // ctx.beginPath();\n  // ctx.rect(135, 440, 105, 60);\n  // ctx.stroke();\n\n  // ctx.beginPath();\n  // ctx.rect(260, 440, 105, 60);\n  // ctx.stroke();\n\n  // ctx.beginPath();\n  // ctx.rect(385, 440, 105, 60);\n  // ctx.stroke();\n\n\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });