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
    return(row in validPos && col in validPos && this.grid[row][col] === null);
  }

  //cosole.log the grid and all the values in it
  render() {
    this.grid.forEach(el => console.log(el));
  }

  // bool to check if game is over
  won() {
    return( this.rowWin()|| this.colWin() || this.diagWin());

  }
  // bool that checks if win is had in a row
  rowWin() {
    for (var i = 0; i < this.grid.length; i++) {
      if (this.grid[i].every( el => el === this.grid[i][0])
                                    && this.grid[i][0] !== null) {
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
      if (colArray.every( el => el === colArray[i]) && colArray[i] !== null) {
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
    if (diag1.every( el => el === diag1[0]) && diag1[0] !==null) {
      this.winningSymble = diag1[0];
      return true;
    }
    if (diag2.every( el => el === diag2[0]) && diag2[0] !==null){
      this.winningSymble = diag2[0];
      return true;
    }
    return false;
  }

}

module.exports = Board;

// let b = new Board();
// console.log(b.won());
// console.log(b.diagWin());
// console.log(b.colWin());
// console.log(b.rowWin());
// //
// b.placeMark([1,1],'x');
// console.log(b.won());
// // b.placeMark([1,1],'x');
// // b.placeMark([2,2],'x');
// console.log(b.diagWin());
// console.log(b.colWin());
// console.log(b.rowWin());

// b.placeMark([2,0],'x');
// b.placeMark([1,1],'x');
// b.placeMark([0,2],'x');
// console.log(b.diagWin());
