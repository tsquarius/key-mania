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

/***/ "./src/arrow_group.js":
/*!****************************!*\
  !*** ./src/arrow_group.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ArrowGroup; });\n// This will hold a collection of arrows\n\nclass ArrowGroup {\n  constructor(vel) {\n    this.velocity = vel;\n    this.queue = [];\n    this.active = [];\n  }\n\n  arrowsLeft() {\n    return this.queue.length + this.active.length; \n  }\n\n  addQueue(arrow) {\n    this.queue.push(arrow);\n  }\n\n  activateArrow() {\n    const arrow = this.queue.pop();\n    arrow.assignVelocity(this.velocity);\n    this.active.push(arrow);\n  }\n\n  oldestActiveArrow() {\n    return this.active[0];\n  }\n\n  removeOutOfBounds() {\n    if (this.isEmpty()) return;\n\n    if (this.oldestActiveArrow().position[1] < 15) {\n      this.triggerRemoveArrow();\n      return true;\n    }\n\n    return false;\n  }\n\n  triggerRemoveArrow() {\n    this.active.shift();\n  }\n\n  moveActiveArrows(timeDelta) {\n    if (this.isEmpty()) return;\n\n    this.active.forEach(arrow => {\n      arrow.move(timeDelta);\n    });\n  }\n\n  isEmpty() {\n    return this.active.length === 0;\n  }\n\n  haveArrowsInQueue() {\n    return this.queue.length > 0;\n  }\n\n  renderActiveArrows(ctx) {\n    this.active.forEach(arrow => {\n      arrow.render(ctx);\n    });\n  }\n}\n\n\n//# sourceURL=webpack:///./src/arrow_group.js?");

/***/ }),

/***/ "./src/arrows.js":
/*!***********************!*\
  !*** ./src/arrows.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Arrows; });\nconst DEFAULT_POS = {\n  left: [37.5, 500],\n  down: [162.5, 500],\n  up: [287.5, 500],\n  right: [412.5, 500]\n};\n\nconst TIME_DELTA = 1000 / 60;\n\nconst ARROW_IMAGES = {\n  left: '../assets/left50.png',\n  right: '../assets/right50.png',\n  up: '../assets/up50.png',\n  down: '../assets/down50.png'\n};\n\n\nclass Arrows {\n  constructor(data) {\n    this.direction = data.direction; // which way the arrow is pointing\n    this.position = DEFAULT_POS[this.direction]; // upper left most\n    this.velocity = 0; // movement speed\n    this.striked = false; // checks if a user has tried to hit this\n    this.img = new Image();\n    this.img.src = ARROW_IMAGES[data.direction];\n  }\n\n  move(timeDelta) {\n    const velocityScale = timeDelta / TIME_DELTA;\n    const [posX, posY] = this.position;\n    this.position = [posX, posY - this.velocity * velocityScale];\n  }\n\n  render(ctx) {\n    const [posX, posY] = this.position;\n    ctx.drawImage(this.img, posX, posY);\n\n  }\n\n  assignVelocity(vel) {\n    this.velocity = vel;\n  }\n}\n\n\n//# sourceURL=webpack:///./src/arrows.js?");

/***/ }),

/***/ "./src/audio.js":
/*!**********************!*\
  !*** ./src/audio.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return GameAudio; });\n// goals:\n// Play song for the specific session\n// Noises for when arrow hits\n// Sound level controller\n\n//jungle = 2:37  / 157.92 =>  115 BPM\n//tropical = 1:39 / 220.392 => 70 BPM\n\nclass GameAudio {\n  constructor() {\n    this.audioCtx = new AudioContext();\n    this.audioElement = null;\n    this.songId = null;\n    this.track = {};\n    this.volume = {};\n    window.track = this.track;\n    window.volume = this.volume;\n  }\n\n  // changes audio element based on dropdown\n  selectTrack(songId) {\n    if (this.songId) {\n      this.stopMusic();\n    }\n    this.songId = songId;\n    this.updateCurrentAudioEl();\n\n    if (!this.track[songId]) this.addTrackToObject();\n    this.connectVolume(songId);\n  }\n\n  updateCurrentAudioEl() {\n    const audioEl = document.getElementById(this.songId);\n    audioEl.currentTime = 0;\n    this.audioElement = audioEl;\n  }\n\n  addTrackToObject() {\n    let track = this.audioCtx.createMediaElementSource(this.audioElement);\n    track.connect(this.audioCtx.destination);\n    this.track[this.songId] = track;\n  }\n\n  connectVolume(songId) {\n    if (!this.volume[songId]) {\n      const gainNode = this.audioCtx.createGain();\n      this.track[songId].connect(gainNode).connect(this.audioCtx.destination);\n      this.volume[songId] = gainNode;\n    }\n\n    const currentVolume = document.querySelector(\"#volume\").value;\n    this.volume[this.songId].gain.value = currentVolume;\n  }\n\n  adjustVolume(val) {\n    if (!this.songId) return;\n    this.volume[this.songId].gain.value = val;\n  }\n\n  playMusic(btn) {\n    if (!this.songId) return;\n\n    if (this.audioCtx.state === \"suspended\") {\n      this.audioCtx.resume();\n    }\n\n    if (btn.dataset.playing === \"false\") {\n      this.audioElement.play();\n      btn.dataset.playing = \"true\";\n    } else if (btn.dataset.playing === \"true\") {\n      this.audioElement.pause();\n      btn.dataset.playing = \"false\";\n    }\n\n    // stop when music ends\n    this.audioElement.addEventListener(\n      \"ended\",\n      () => {\n        btn.dataset.playing = \"false\";\n      },\n      false\n    );\n  }\n\n  stopMusic() {\n    document.querySelector(\"#play\").dataset.playing = \"false\";\n    if (this.audioElement) {\n      this.audioElement.pause();\n      this.audioElement.currentTime = 0;\n    }\n  }\n}\n\n\n//# sourceURL=webpack:///./src/audio.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Game; });\n/* harmony import */ var _arrows__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrows */ \"./src/arrows.js\");\n/* harmony import */ var _arrow_group__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./arrow_group */ \"./src/arrow_group.js\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n/* harmony import */ var _score__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./score */ \"./src/score.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n\n\n\n\n\n\nclass Game {\n  constructor(data) {\n    this.arrows = {\n      left: new _arrow_group__WEBPACK_IMPORTED_MODULE_1__[\"default\"](data.velocity),\n      right: new _arrow_group__WEBPACK_IMPORTED_MODULE_1__[\"default\"](data.velocity),\n      up: new _arrow_group__WEBPACK_IMPORTED_MODULE_1__[\"default\"](data.velocity),\n      down: new _arrow_group__WEBPACK_IMPORTED_MODULE_1__[\"default\"](data.velocity)\n    };\n    this.score = new _score__WEBPACK_IMPORTED_MODULE_3__[\"default\"](this);\n    this.player = new _player__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({ game: this, score: this.score });\n    this.activateArrow = _utils__WEBPACK_IMPORTED_MODULE_4__[\"throttle\"](\n      this.activateArrow.bind(this),\n      data.frequency\n    );\n    this.populateArrows(data.arrows);\n  }\n\n  populateArrows(quantity) {\n    const numArrows = Array.from(new Array(quantity), (x, i) => i);\n    numArrows.forEach(x => {\n      const direction = _utils__WEBPACK_IMPORTED_MODULE_4__[\"randomDirection\"]();\n      this.arrows[direction].addQueue(\n        new _arrows__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({ direction: direction })\n      );\n    });\n  }\n\n  gameOver() {\n    return Object.values(this.arrows).every(\n      el => !el.haveArrowsInQueue() && el.isEmpty()\n    );\n  }\n\n  noMoreQueue() {\n    return Object.values(this.arrows).every(el => !el.haveArrowsInQueue());\n  }\n\n  activateArrow() {\n    if (this.noMoreQueue()) return;\n\n    let direction = _utils__WEBPACK_IMPORTED_MODULE_4__[\"randomDirection\"]();\n    while (!this.arrows[direction].haveArrowsInQueue()) {\n      direction = _utils__WEBPACK_IMPORTED_MODULE_4__[\"randomDirection\"]();\n    }\n\n    if (!this.arrows[direction].haveArrowsInQueue()) return;\n    this.arrows[direction].activateArrow();\n  }\n\n  removeArrow(direction) {\n    this.arrows[direction].triggerRemoveArrow();\n  }\n\n  moveArrows(timeDelta) {\n    Object.values(this.arrows).forEach(arrows => {\n      if (arrows.removeOutOfBounds()) {\n        this.score.addScore(\"miss\");\n      }\n\n      arrows.moveActiveArrows(timeDelta);\n    });\n  }\n\n  render(ctx) {\n    ctx.clearRect(0, 0, 500, 500);\n    this.player.render(ctx);\n    this.score.render();\n\n    Object.values(this.arrows).forEach(arrows => {\n      arrows.renderActiveArrows(ctx);\n    });\n  }\n}\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return GameView; });\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n// Game over message!\n\n\n\nconst SONG_SETTINGS = {\n  jungle: { arrows: 450, velocity: 4.5, frequency: 300 },\n  fiji: { arrows: 230, velocity: 2.8, frequency: 400 }\n};\n\nclass GameView {\n  constructor(ctx, audio) {\n    this.song = null;\n    this.game = null;\n    this.ctx = ctx;\n    this.play = false;\n    this.audio = audio;\n  }\n\n  selectSong(song) {\n    this.play = false;\n    this.song = song;\n    // this.game = new Game(SONG_SETTINGS[song]);\n  }\n\n  start() {\n    if (!this.song) return;\n    this.play = true;\n    this.game = new _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](SONG_SETTINGS[this.song]);\n    this.lastTime = 0;\n    requestAnimationFrame(this.animate.bind(this));\n  }\n\n  // Game is over if player misses too many OR no more arrows\n  stopGame() {\n    if (this.game.score.missStreak >= 20 || this.game.gameOver()) {\n      this.play = false;\n      document.getElementById(\"play\").textContent = \"Play Again\";\n      this.audio.stopMusic();\n      this.audio.audioElement.currentTime = 0;\n    }\n  }\n\n  animate(time) {\n    if (this.play) {\n      const timeDelta = time - this.lastTime;\n      this.game.activateArrow();\n      this.game.moveArrows(timeDelta);\n      this.game.render(this.ctx);\n      this.lastTime = time;\n\n      this.stopGame();\n\n      requestAnimationFrame(this.animate.bind(this));\n    }\n  }\n}\n\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\n/* harmony import */ var _audio__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./audio */ \"./src/audio.js\");\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  //canvas context\n  const canvas = document.getElementById(\"game-canvas\");\n  canvas.width = 500;\n  canvas.height = 500;\n  const ctx = canvas.getContext(\"2d\");\n  const AudioContext = window.AudioContext || window.webkitAudioContext;\n  const playButton = document.querySelector(\"#play\");\n  const restartButton = document.querySelector(\"#restart\");\n  const musicSelector = document.getElementById(\"song-selector\");\n  const volumeControl = document.querySelector(\"#volume\");\n\n  const audio = new _audio__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n  const gameView = new _game_view__WEBPACK_IMPORTED_MODULE_0__[\"default\"](ctx, audio);\n\n  // this should trigger a change in difficulty\n  musicSelector.addEventListener(\"change\", e => {\n    audio.selectTrack(e.target.value);\n    gameView.selectSong(e.target.value);\n  });\n\n  playButton.addEventListener(\"click\", () => {\n    playButton.textContent = \"Restart\";\n    audio.stopMusic();\n    audio.playMusic(playButton);\n    gameView.start();\n  });\n\n\n  document.body.onkeydown = function(e) {\n    switch (e.keyCode) {\n      case 87 || false:\n        gameView.game.player.hitArrow(\"up\");\n        break;\n      case 83 || false:\n        gameView.game.player.hitArrow(\"down\");\n        break;\n      case 65 || false:\n        gameView.game.player.hitArrow(\"left\");\n        break;\n      case 68 || false:\n        gameView.game.player.hitArrow(\"right\");\n        break;\n    }\n  };\n\n  volumeControl.addEventListener(\n    \"input\",\n    e => {\n      audio.adjustVolume(e.target.value);\n    },\n    false\n  );\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Player; });\nconst ARROW_IMAGES = {\n  left: \"../assets/leftGray50.png\",\n  right: \"../assets/rightGray50.png\",\n  up: \"../assets/upGray50.png\",\n  down: \"../assets/downGray50.png\"\n};\n\nconst DEFAULT_POS = {\n  left: [37.5, 60],\n  down: [162.5, 60],\n  up: [287.5, 60],\n  right: [412.5, 60]\n};\n\n\nclass Player {\n  constructor(data) {\n    this.game = data.game;\n    this.score = data.score;\n    this.images = {\n      left: new Image(),\n      right: new Image(),\n      down: new Image(),\n      up: new Image()\n    }\n    this.loadImageSources();\n  }\n\n  loadImageSources() {\n    Object.keys(this.images).forEach(dir => {\n      this.images[dir].src = ARROW_IMAGES[dir];\n    });\n  }\n\n  hitArrow(direction) {\n    const target = this.game.arrows[direction].oldestActiveArrow();\n    if (!target) return;\n\n    // Only consider clicks if it is close to the hit-zone\n    if (target.position[1] < 90) {\n      const acc = this.checkAccuracy(target.position);\n      this.game.removeArrow(direction);\n      this.score.addScore(acc);\n    }\n  }\n\n  checkAccuracy(position) {\n    const top = position[1];\n    const diff = Math.abs(60 - top);\n\n    if (diff <= 3) {\n      return \"perfect\";\n    } else if (diff <= 8) {\n      return \"great\";\n    } else if (diff <= 15) {\n      return \"good\";\n    } else {\n      return \"miss\";\n    }\n  }\n\n  render(ctx) {\n    Object.keys(this.images).forEach(dir => {\n      const [posX, posY] = DEFAULT_POS[dir];\n      ctx.drawImage(this.images[dir], posX, posY);\n    });\n  }\n}\n\n\n//# sourceURL=webpack:///./src/player.js?");

/***/ }),

/***/ "./src/score.js":
/*!**********************!*\
  !*** ./src/score.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Score; });\nconst SCORE_MAP = {\n  perfect: 100,\n  great: 80,\n  good: 50,\n  miss: 0\n};\n\n// Add combo + score multiplier later\n\nclass Score {\n  constructor(game) {\n    this.score = 0;\n    this.message = \"\";\n    this.combo = 0;\n    this.missStreak = 0;\n    this.game = game;\n  }\n\n  arrowsLeft() {\n    let totalArrows = 0;\n    Object.values(this.game.arrows).forEach(group => {\n      totalArrows += group.arrowsLeft();\n    });\n\n    return totalArrows;\n  }\n\n  addScore(accuracy) {\n    this.score += SCORE_MAP[accuracy];\n    this.message = accuracy.toString();\n    if (this.message === \"miss\") {\n      this.combo = 0;\n      this.missStreak += 1;\n    } else {\n      this.combo += 1;\n      this.missStreak = 0;\n    }\n  }\n\n  render() {\n    const scoreBoard = document.getElementById(\"score\");\n    const message = document.getElementById(\"message\");\n    const combo = document.getElementById(\"combo\");\n    const arrows = document.getElementById(\"arrows\");\n\n    scoreBoard.textContent = this.score;\n    message.textContent = this.message;\n    combo.textContent = this.combo;\n    arrows.textContent = this.arrowsLeft();\n    \n  }\n}\n\n\n//# sourceURL=webpack:///./src/score.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: throttle, randomDirection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"throttle\", function() { return throttle; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"randomDirection\", function() { return randomDirection; });\nfunction throttle(callback, interval) {\n  let tooSoon = false;\n  return (...args) => {\n    if (!tooSoon) {\n      tooSoon = true;\n      setTimeout(() => (tooSoon = false), interval);\n      callback(...args);\n    }\n  };\n}\n\n\nconst ArrowDirections = [\"left\", \"right\", \"up\", \"down\"];\nfunction randomDirection() {\n  const rndm = Math.floor(Math.random() * 4);\n  return ArrowDirections[rndm];\n}\n\n//# sourceURL=webpack:///./src/utils.js?");

/***/ })

/******/ });