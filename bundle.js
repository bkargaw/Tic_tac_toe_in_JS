/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// The Game class should have a play method that loops, reading in user moves. When the game is over, exit the loop.

const Board = __webpack_require__(2);
const Player = __webpack_require__(3);

class Game {
  constructor() {
    this.board = new Board();
    this.playerOne = new Player('x');
    this.playerTwo = new Player('o');
    this.currentPlayer = this.playerOne;
  }

  run (reader, completionCallback){
    this.promptMove(reader, (row,col) => {
      if (!this.move(row,col)){
        console.log("invalid move");
      }else{
        this.switchPlayer();
      }

      if (this.gameOver()){
        this.print();
        console.log(`${this.getWinningMark()} Wins.`);
        completionCallback();
      }else{
        this.run(reader, completionCallback);
      }
    });
  }


  promptMove(reader,callback){
    this.print();
      reader.question("Enter a row to mark: ", start => {
        const row = parseInt(start);
        reader.question("Enter a column to mark: ", end => {
          const col = parseInt(end);
          callback(row, col);
        });
      });
  }

  move(row, col){
    if (this.validMove(row, col)){
      this.board.placeMark([row,col], this.getMark());
      return true;
    }else {
      return false;
    }
  }

  validMove(row, col){
    return this.board.isValidPos([row,col]);
  }

  switchPlayer(){
    this.currentPlayer = (this.currentPlayer === this.playerOne ?
                            this.playerOne : this.playerTwo);
  }

  gameOver(){
    return this.board.won();
  }

  print(){
    this.board.render();
  }

  getMark(){
    return this.currentPlayer.mark();
  }

  getWinningMark(){
    return this.board.winningSymble();
  }

}

module.exports = Game;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

class Board {
  constructor() {
    this.grid = Board.getEmptyBoard();
    this.winningSymble = null;
  }

  static getEmptyBoard () {
    let grid = new Array(3);
    for (var i = 0; i < 3; i++) {
      grid[i] = new Array(3);
      for (var j = 0; j < 3; j++) {
        grid[i][j] = null;
      }
    }
    return grid;
  }

  // returns the winning symble ('o' or 'x')
  winner() {
    return this.winningSymble;
  }

  // bool that returns true if pos is null
  empty(pos) {
    return this.grid[pos[0]][pos[1]] === null;
  }

  // places a mark at pos on the grid
  placeMark(pos, mark) {
    if (this.isValidPos(pos)){
      this.grid[pos[0]][pos[1]]= mark;
      return true;
    }
    return false;
  }

  isValidPos(pos){
    let validPos = [0, 1, 2];
    let row = pos[0];
    let col = pos[1];
    return(row in validPos && col in validPos);
  }

  //cosole.log the grid and all the values in it
  render() {
    this.grid.forEach(el => console.log(el));
  }

  // bool to check if game is over
  won() {
    return( this.rowWin()|| this.colWin() || this.diaglWin());

  }
  // bool that checks if win is had in a row
  rowWin() {
    for (var i = 0; i < this.grid.length; i++) {
      if (this.grid[i].every( el => el === this.grid[i][0])) {
        this.winningSymble = this.grid[i][0];
        return true;
      }
    }
    return false;
  }

  // bool that checks if win is had in a column
  colWin() {
    for (var i = 0; i < this.grid.length; i++) {
      let colArray = [];
      for (var j = 0; j < this.grid.length; j++) {
        colArray.push(this.grid[i][j]);
      }
      if (colArray.every( el => el === colArray[i])) {
        this.winningSymble = colArray[i];
        return true;
      }
    }
    return false;
  }


  // bool that checks if win is had in a diagonal
  diagWin() {
    let idxDiag1 = [[0, 0], [1, 1], [2, 2]];
    let idxDiag2 = [[2, 0],[1, 1],[0, 2]];
    let diag1 = [];
    idxDiag1.forEach((pos) => diag1.push(this.grid[pos[0]][pos[1]]));
    let diag2 = [];
    idxDiag2.forEach((pos) => diag2.push(this.grid[pos[0]][pos[1]]));
    if (diag1.every( el => el === diag1[0])) {
      this.winningSymble = diag1[0];
      return true;
    }
    if (diag2.every( el => el === diag2[0])){
      this.winningSymble = diag2[0];
      return true;
    }
    return false;
  }

}

module.exports = Board;

// let b = new Board();
//
// b.placeMark([0,0],'x');
// b.placeMark([1,1],'x');
// b.placeMark([2,2],'x');
// console.log(b.diagWin());

// b.placeMark([2,0],'x');
// b.placeMark([1,1],'x');
// b.placeMark([0,2],'x');
// console.log(b.diagWin());


/***/ }),
/* 3 */
/***/ (function(module, exports) {


class Player {
  constructor(mark) {
    this.mark = mark;
  }
  
  mark(){
    return this.mark;
  }
}

module.exports = Player;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {const Game = __webpack_require__(1);
const readline = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"readline\""); e.code = 'MODULE_NOT_FOUND';; throw e; }()));

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let g = new Game();
g.run(reader, completion);

function completion() {
  reader.question("Play again? y or n: ", restartGame => {
    if (restartGame === "y") {
      g = new Game();
      g.run(reader, completion);
    } else {
      reader.close();
    }
  });
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ })
/******/ ]);