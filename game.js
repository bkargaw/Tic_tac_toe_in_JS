// The Game class should have a play method that loops, reading in user moves. When the game is over, exit the loop.

const Board = require('./board.js');
const Player = require('./player.js');
var clear = require('clear');

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
    if (this.getMark() === 'x') {
      this.currentPlayer = this.playerTwo;
    }else {
      this.currentPlayer = this.playerOne;
    }
  }

  gameOver(){
    return this.board.won();
  }

  print(){
    clear();
    this.board.render();
  }

  getMark(){
    return this.currentPlayer.mark;
  }

  getWinningMark(){
    return this.board.winner();
  }

}

module.exports = Game;
