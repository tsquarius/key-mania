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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ArrowGroup; });\n// This will hold a collection of arrows\n\nclass ArrowGroup {\n  constructor(vel) {\n    this.velocity = vel;\n    this.queue = [];\n    this.active = [];\n  }\n\n  arrowsLeft() {\n    return this.queue.length + this.active.length;\n  }\n\n  addQueue(arrow) {\n    this.queue.push(arrow);\n  }\n\n  activateArrow() {\n    const arrow = this.queue.pop();\n    arrow.assignVelocity(this.velocity);\n    this.active.push(arrow);\n  }\n\n  oldestActiveArrow() {\n    return this.active[0];\n  }\n\n  removeOutOfBounds() {\n    if (this.isEmpty()) return;\n\n    if (this.oldestActiveArrow().position[1] < 15) {\n      this.triggerRemoveArrow();\n      return true;\n    }\n    return false;\n  }\n\n  triggerRemoveArrow() {\n    this.removed = this.active.shift();\n  }\n\n  moveActiveArrows(timeDelta) {\n    if (this.isEmpty()) return;\n\n    this.active.forEach(arrow => {\n      arrow.move(timeDelta);\n    });\n  }\n\n  isEmpty() {\n    return this.active.length === 0;\n  }\n\n  haveArrowsInQueue() {\n    return this.queue.length > 0;\n  }\n\n  renderActiveArrows(ctx) {\n    this.active.forEach(arrow => {\n      arrow.render(ctx);\n    });\n  }\n}\n\n\n//# sourceURL=webpack:///./src/arrow_group.js?");

/***/ }),

/***/ "./src/arrows.js":
/*!***********************!*\
  !*** ./src/arrows.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Arrows; });\n/* harmony import */ var _sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sprite */ \"./src/sprite.js\");\n\n\nconst DEFAULT_POS = {\n  left: [37.5, 500],\n  down: [162.5, 500],\n  up: [287.5, 500],\n  right: [412.5, 500]\n};\n\nconst TIME_DELTA = 1000 / 60;\n\nclass Arrows {\n  constructor(data) {\n    this.direction = data.direction;\n    this.position = DEFAULT_POS[this.direction];\n    this.velocity = 0;\n    this.striked = false;\n    this.sprite = new _sprite__WEBPACK_IMPORTED_MODULE_0__[\"default\"](data.img);\n  }\n\n  move(timeDelta) {\n    const velocityScale = timeDelta / TIME_DELTA;\n    const [posX, posY] = this.position;\n    this.position = [posX, posY - this.velocity * velocityScale];\n    if (this.striked) {\n      this.sprite.update(timeDelta / TIME_DELTA);\n    }\n  }\n\n  render(ctx) {\n    const [posX, posY] = this.position;\n    if (!this.striked) {\n      this.sprite.render(ctx, posX, posY);\n    } else {\n      this.sprite.renderPop(ctx, posX, posY);\n    }\n  }\n\n  assignVelocity(vel) {\n    this.velocity = vel;\n  }\n}\n\n\n//# sourceURL=webpack:///./src/arrows.js?");

/***/ }),

/***/ "./src/audio.js":
/*!**********************!*\
  !*** ./src/audio.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return GameAudio; });\nclass GameAudio {\n  constructor() {\n    this.audioCtx = new AudioContext();\n    this.audioElement = null;\n    this.songId = null;\n    this.track = {};\n    this.volume = {};\n  }\n\n  selectTrack(songId) {\n    if (this.songId) {\n      this.stopMusic();\n    }\n    this.songId = songId;\n    this.updateCurrentAudioEl();\n\n    if (!this.track[songId]) this.addTrackToObject();\n    this.connectVolume(songId);\n  }\n\n  updateCurrentAudioEl() {\n    const audioEl = document.getElementById(this.songId);\n    audioEl.currentTime = 0;\n    this.audioElement = audioEl;\n  }\n\n  addTrackToObject() {\n    let track = this.audioCtx.createMediaElementSource(this.audioElement);\n    track.connect(this.audioCtx.destination);\n    this.track[this.songId] = track;\n  }\n\n  connectVolume(songId) {\n    if (!this.volume[songId]) {\n      const gainNode = this.audioCtx.createGain();\n      this.track[songId].connect(gainNode).connect(this.audioCtx.destination);\n      this.volume[songId] = gainNode;\n    }\n\n    const currentVolume = document.querySelector(\"#volume\").value;\n    this.volume[this.songId].gain.value = currentVolume;\n  }\n\n  adjustVolume(val) {\n    if (!this.songId) return;\n    this.volume[this.songId].gain.value = val;\n  }\n\n  playMusic(btn) {\n    if (!this.songId) return;\n\n    if (this.audioCtx.state === \"suspended\") {\n      this.audioCtx.resume();\n    }\n\n    if (btn.dataset.playing === \"false\") {\n      this.audioElement.play();\n      btn.dataset.playing = \"true\";\n    } else if (btn.dataset.playing === \"true\") {\n      this.audioElement.pause();\n      btn.dataset.playing = \"false\";\n    }\n\n    // stop when music ends\n    this.audioElement.addEventListener(\n      \"ended\",\n      () => {\n        btn.dataset.playing = \"false\";\n      },\n      false\n    );\n  }\n\n  stopMusic() {\n    document.querySelector(\"#play\").dataset.playing = \"false\";\n    if (this.audioElement) {\n      this.audioElement.pause();\n      this.audioElement.currentTime = 0;\n    }\n  }\n}\n\n\n//# sourceURL=webpack:///./src/audio.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Game; });\n/* harmony import */ var _arrows__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrows */ \"./src/arrows.js\");\n/* harmony import */ var _arrow_group__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./arrow_group */ \"./src/arrow_group.js\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n/* harmony import */ var _score__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./score */ \"./src/score.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n\n\n\n\n\n\nconst ARROW_IMAGES = {\n  left: _utils__WEBPACK_IMPORTED_MODULE_4__[\"leftArrow\"],\n  right: _utils__WEBPACK_IMPORTED_MODULE_4__[\"rightArrow\"],\n  down: _utils__WEBPACK_IMPORTED_MODULE_4__[\"downArrow\"],\n  up: _utils__WEBPACK_IMPORTED_MODULE_4__[\"upArrow\"]\n};\n\nclass Game {\n  constructor(data) {\n    this.arrows = {\n      left: null,\n      right: null,\n      up: null,\n      down: null\n    };\n    this.score = new _score__WEBPACK_IMPORTED_MODULE_3__[\"default\"](this);\n    this.player = new _player__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({ game: this, score: this.score });\n    this.activateArrow = _utils__WEBPACK_IMPORTED_MODULE_4__[\"throttle\"](\n      this.activateArrow.bind(this),\n      data.frequency\n    );\n    this.createArrowGroups(data.velocity);\n    this.populateArrows(data.arrows);\n  }\n\n  createArrowGroups(vel) {\n    Object.keys(this.arrows).forEach(dir => {\n      this.arrows[dir] = new _arrow_group__WEBPACK_IMPORTED_MODULE_1__[\"default\"](vel);\n    });\n  }\n\n  populateArrows(quantity) {\n    const numArrows = Array.from(new Array(quantity), (x, i) => i);\n    numArrows.forEach(x => {\n      const direction = _utils__WEBPACK_IMPORTED_MODULE_4__[\"randomDirection\"]();\n      this.arrows[direction].addQueue(\n        new _arrows__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({ direction: direction, img: ARROW_IMAGES[direction] })\n      );\n    });\n  }\n\n  gameFinished() {\n    return Object.values(this.arrows).every(\n      el => !el.haveArrowsInQueue() && el.isEmpty()\n    );\n  }\n\n  gameLost() {\n    return this.score.missStreak >= 20;\n  }\n\n  noMoreQueue() {\n    return Object.values(this.arrows).every(el => !el.haveArrowsInQueue());\n  }\n\n  activatePairArrows() {\n    const [firstDir, secondDir] = _utils__WEBPACK_IMPORTED_MODULE_4__[\"randomPair\"]();\n    const firstArrow = this.arrows[firstDir];\n    const secondArrow = this.arrows[secondDir];\n\n    if (firstArrow.haveArrowsInQueue()) {\n      firstArrow.activateArrow();\n    }\n\n    if (secondArrow.haveArrowsInQueue()) {\n      secondArrow.activateArrow();\n    }\n  }\n\n  activateSingleArrow() {\n    let direction = _utils__WEBPACK_IMPORTED_MODULE_4__[\"randomDirection\"]();\n    while (!this.arrows[direction].haveArrowsInQueue()) {\n      direction = _utils__WEBPACK_IMPORTED_MODULE_4__[\"randomDirection\"]();\n    }\n\n    this.arrows[direction].activateArrow();\n  }\n\n  activateArrow() {\n    if (this.noMoreQueue()) return;\n    const activateType = Math.floor(Math.random() * 14);\n    if (activateType === 0 || activateType === 1) {\n      this.activatePairArrows();\n    } else if (activateType === 2) {\n      return;\n    } else {\n      this.activateSingleArrow();\n    }\n  }\n\n  removeArrow(direction) {\n    this.arrows[direction].triggerRemoveArrow();\n  }\n\n  moveArrows(timeDelta) {\n    Object.values(this.arrows).forEach(arrows => {\n      if (arrows.removeOutOfBounds()) {\n        this.score.addScore(\"miss\");\n      }\n\n      arrows.moveActiveArrows(timeDelta);\n    });\n  }\n\n  render(ctx, time) {\n    ctx.clearRect(0, 0, 500, 500);\n    this.player.render(ctx, time);\n    this.score.render();\n\n    Object.values(this.arrows).forEach(arrows => {\n      arrows.renderActiveArrows(ctx);\n    });\n  }\n}\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_interface.js":
/*!*******************************!*\
  !*** ./src/game_interface.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return GameInterface; });\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\nconst SONG_SETTINGS = {\n  jungle: { arrows: 450, velocity: 4.5, frequency: 300 },\n  fiji: { arrows: 230, velocity: 3.5, frequency: 400 }\n};\n\nconst gameOverNoise = document.createElement(\"audio\");\ngameOverNoise.src = \"./assets/gameover.wav\";\n\nclass GameInterface {\n  constructor(ctx, audio) {\n    this.song = null;\n    this.game = null;\n    this.ctx = ctx;\n    this.play = false;\n    this.audio = audio;\n    this.seconds = 4;\n  }\n\n  selectSong(song) {\n    this.play = false;\n    this.song = song;\n  }\n\n  start() {\n    this.play = true;\n    this.seconds = 3;\n    if (!this.song) return;\n    this.game = new _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](SONG_SETTINGS[this.song]);\n    this.lastTime = 0;\n    requestAnimationFrame(this.animate.bind(this));\n  }\n\n  countDown(btn) {\n    const countDownEl = document.getElementById(\"countdown\");\n    const timer = setInterval(() => {\n      this.seconds--;\n      if (this.seconds === 3) {\n      countDownEl.textContent = \"Starting in...\";\n      } else {\n        countDownEl.textContent = this.seconds;\n      }\n      if (this.seconds === 0) {\n        clearInterval(timer);\n        this.audio.stopMusic();\n        this.audio.playMusic(btn);\n        this.start();\n        countDownEl.textContent = \"\";\n      }\n    }, 1000);\n  }\n\n  // Game is over if player misses too many OR no more arrows\n  stopGame() {\n    if (this.game.gameLost() || this.game.gameFinished()) {\n      this.play = false;\n      document.getElementById(\"play\").textContent = \"Play Again\";\n      this.audio.stopMusic();\n      this.audio.audioElement.currentTime = 0;\n      gameOverNoise.play();\n    }\n\n    if (this.game.gameLost()) {\n      this.ctx.font = \"40px Arial\";\n      this.ctx.fillStyle = \"red\";\n      this.ctx.fillText(\"GAME OVER\", 140, 250);\n    }\n\n    if (this.game.gameFinished()) {\n      this.ctx.font = \"40px Arial\";\n      this.ctx.fillStyle = \"red\";\n      this.ctx.fillText(\"COMPLETED!\", 120, 250);\n    }\n\n  }\n\n  animate(time) {\n    if (this.play) {\n      const timeDelta = time - this.lastTime;\n      this.game.activateArrow();\n      this.game.moveArrows(timeDelta);\n      this.game.render(this.ctx, time);\n\n      this.lastTime = time;\n\n      this.stopGame();\n\n      requestAnimationFrame(this.animate.bind(this));\n    }\n  }\n}\n\n\n//# sourceURL=webpack:///./src/game_interface.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game_interface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game_interface */ \"./src/game_interface.js\");\n/* harmony import */ var _audio__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./audio */ \"./src/audio.js\");\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  const canvas = document.getElementById(\"game-canvas\");\n  canvas.width = 500;\n  canvas.height = 500;\n  const ctx = canvas.getContext(\"2d\");\n  const AudioContext = window.AudioContext || window.webkitAudioContext;\n  const playButton = document.querySelector(\"#play\");\n  const musicSelector = document.getElementById(\"song-selector\");\n  const volumeControl = document.querySelector(\"#volume\");\n\n  const audio = new _audio__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n  const gameInterface = new _game_interface__WEBPACK_IMPORTED_MODULE_0__[\"default\"](ctx, audio);\n\n  musicSelector.addEventListener(\"change\", e => {\n    audio.selectTrack(e.target.value);\n    gameInterface.selectSong(e.target.value);\n  });\n\n  playButton.addEventListener(\"click\", () => {\n    if (!audio.audioElement) return;\n    gameInterface.countDown(playButton);\n  });\n\n  document.body.onkeydown = function(e) {\n    if (!gameInterface.game) return;\n\n    if ([87,38].includes(e.keyCode)) {\n      e.preventDefault();\n      gameInterface.game.player.hitArrow(\"up\");\n    } else if ([83, 40].includes(e.keyCode)) {\n      e.preventDefault();\n      gameInterface.game.player.hitArrow(\"down\");\n    } else if([65,37].includes(e.keyCode)) {\n      e.preventDefault();\n      gameInterface.game.player.hitArrow(\"left\");\n    } else if ([68, 39].includes(e.keyCode)) {\n      e.preventDefault();\n      gameInterface.game.player.hitArrow(\"right\");\n    }\n  };\n\n  volumeControl.addEventListener(\n    \"input\",\n    e => {\n      audio.adjustVolume(e.target.value);\n    },\n    false\n  );\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Player; });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n\n\nconst DEFAULT_POS = {\n  left: [37.5, 60],\n  down: [162.5, 60],\n  up: [287.5, 60],\n  right: [412.5, 60]\n};\n\nclass Player {\n  constructor(data) {\n    this.game = data.game;\n    this.score = data.score;\n    this.images = {\n      left: _utils__WEBPACK_IMPORTED_MODULE_0__[\"fixedLeft\"],\n      right: _utils__WEBPACK_IMPORTED_MODULE_0__[\"fixedRight\"],\n      down: _utils__WEBPACK_IMPORTED_MODULE_0__[\"fixedDown\"],\n      up: _utils__WEBPACK_IMPORTED_MODULE_0__[\"fixedUp\"]\n    };\n    this.strikedArrow = null;\n  }\n\n  hitArrow(direction) {\n    const target = this.game.arrows[direction].oldestActiveArrow();\n    if (!target) return;\n\n    // Only consider clicks if it is close to the hit-zone\n    if (target.position[1] < 90) {\n      const acc = this.checkAccuracy(target.position);\n      if (acc != \"miss\") {\n        target.striked = true;\n        this.strikedArrow = target;\n      }\n      this.game.removeArrow(direction);\n      this.score.addScore(acc);\n    }\n  }\n\n  checkAccuracy(position) {\n    const top = position[1];\n    const diff = Math.abs(60 - top);\n\n    if (diff <= 3) {\n      return \"perfect\";\n    } else if (diff <= 8) {\n      return \"great\";\n    } else if (diff <= 15) {\n      return \"good\";\n    } else {\n      return \"miss\";\n    }\n  }\n\n  render(ctx) {\n    Object.keys(this.images).forEach(dir => {\n      const [posX, posY] = DEFAULT_POS[dir];\n      ctx.drawImage(this.images[dir], posX, posY);\n    });\n\n    if (this.strikedArrow) {\n      this.strikedArrow.move(17);\n      this.strikedArrow.render(ctx);\n    }\n  }\n}\n\n\n//# sourceURL=webpack:///./src/player.js?");

/***/ }),

/***/ "./src/score.js":
/*!**********************!*\
  !*** ./src/score.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Score; });\nconst SCORE_MAP = {\n  perfect: 100,\n  great: 80,\n  good: 50,\n  miss: 0\n};\n\nclass Score {\n  constructor(game) {\n    this.score = 0;\n    this.message = \"\";\n    this.combo = 0;\n    this.missStreak = 0;\n    this.game = game;\n  }\n\n  arrowsLeft() {\n    let totalArrows = 0;\n    Object.values(this.game.arrows).forEach(group => {\n      totalArrows += group.arrowsLeft();\n    });\n\n    return totalArrows;\n  }\n\n  addScore(accuracy) {\n    let multiplier;\n    if (this.combo >= 20) {\n      multiplier = 2;\n    } else if (this.combo >= 10) {\n      multiplier = 1.5;\n    } else {\n      multiplier = 1;\n    }\n\n    this.score += SCORE_MAP[accuracy] * multiplier;\n    this.message = accuracy.toString();\n    if (this.message === \"miss\") {\n      this.combo = 0;\n      this.missStreak += 1;\n    } else {\n      this.combo += 1;\n      this.missStreak = 0;\n    }\n  }\n\n  render() {\n    const scoreBoard = document.getElementById(\"score\");\n    const message = document.getElementById(\"message\");\n    const combo = document.getElementById(\"combo\");\n    const arrows = document.getElementById(\"arrows\");\n\n    scoreBoard.textContent = this.score;\n    message.textContent = this.message;\n    combo.textContent = this.combo;\n    arrows.textContent = this.arrowsLeft();\n  }\n}\n\n\n//# sourceURL=webpack:///./src/score.js?");

/***/ }),

/***/ "./src/sprite.js":
/*!***********************!*\
  !*** ./src/sprite.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Sprite; });\nclass Sprite {\n  constructor(img) {\n    this.img = img;\n    this.frameIndex = 0;\n    this.tickCount = 0;\n    this.ticksPerFrame = 1;\n    this.numberOfFrames = 6;\n  }\n\n  update(timeDelta) {\n    this.tickCount += 1 * timeDelta;\n    if (this.tickCount > this.ticksPerFrame) {\n      this.tickCount = 0;\n\n      if (this.frameIndex < this.numberOfFrames - 1) {\n        this.frameIndex += 1;\n      } else if (this.frameIndex === this.numberOfFrames - 1) {\n        this.img = null;\n      }\n    }\n  }\n\n  render(ctx, posX, posY) {\n    ctx.drawImage(this.img, 0, 0, 50, 50, posX, posY, 50, 50);\n  }\n\n  renderPop(ctx, posX, posY) {\n    if (!this.img) return;\n    ctx.drawImage(\n      this.img,\n      this.frameIndex * 50,\n      0,\n      50,\n      50,\n      posX,\n      posY,\n      50,\n      50\n    );\n  }\n}\n\n\n//# sourceURL=webpack:///./src/sprite.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: throttle, randomDirection, randomPair, leftArrow, rightArrow, downArrow, upArrow, fixedLeft, fixedRight, fixedDown, fixedUp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"throttle\", function() { return throttle; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"randomDirection\", function() { return randomDirection; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"randomPair\", function() { return randomPair; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"leftArrow\", function() { return leftArrow; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"rightArrow\", function() { return rightArrow; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"downArrow\", function() { return downArrow; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"upArrow\", function() { return upArrow; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fixedLeft\", function() { return fixedLeft; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fixedRight\", function() { return fixedRight; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fixedDown\", function() { return fixedDown; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fixedUp\", function() { return fixedUp; });\nfunction throttle(callback, interval) {\n  let tooSoon = false;\n  return (...args) => {\n    if (!tooSoon) {\n      tooSoon = true;\n      setTimeout(() => (tooSoon = false), interval);\n      callback(...args);\n    }\n  };\n}\n\n//generate a random direction\nconst ArrowDirections = [\"left\", \"right\", \"up\", \"down\"];\n\nfunction randomDirection() {\n  const rndm = Math.floor(Math.random() * 4);\n  return ArrowDirections[rndm];\n}\n\n// generate combo key strokes\nconst ArrowPairs = [\n  [\"left\", \"right\"],\n  [\"left\", \"up\"],\n  [\"left\", \"down\"],\n  [\"right\", \"up\"],\n  [\"right\", \"down\"],\n  [\"up\", \"down\"]\n];\n\nfunction randomPair() {\n  const rndm = Math.floor(Math.random() * 6);\n  return ArrowPairs[rndm];\n}\n\n// pre-load images\nconst leftArrow = new Image();\nconst rightArrow = new Image();\nconst downArrow = new Image();\nconst upArrow = new Image();\n\nleftArrow.src = \"./assets/left50Mosaic.png\";\nrightArrow.src = \"./assets/right50Mosaic.png\";\nupArrow.src = \"./assets/up50Mosaic.png\";\ndownArrow.src = \"./assets/down50Mosaic.png\";\n\nconst fixedLeft = new Image();\nconst fixedRight = new Image();\nconst fixedDown = new Image();\nconst fixedUp = new Image();\n\nfixedLeft.src = \"./assets/leftGray50.png\";\nfixedRight.src = \"./assets/rightGray50.png\";\nfixedDown.src = \"./assets/downGray50.png\";\nfixedUp.src = \"./assets/upGray50.png\";\n\n\n//# sourceURL=webpack:///./src/utils.js?");

/***/ })

/******/ });