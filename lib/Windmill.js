var Spot = require("./Spot");

var Windmill = function (firstToPlay) {
  this.board = createSpots();
  this.phase = "place";
  this.player = firstToPlay || 1;
  this.movement = "placing";
  this.placedPieces = 0;
};



function createSpots () {
  
  var spots = [];
  
  for(var i = 0; i < 24; i++) {
   
    spots.push(new Spot());
    
  }
  
  spots[0].right = spots[1];
  spots[0].down = spots[9];
  
  spots[1].left = spots[0];
  spots[1].right = spots[2];
  spots[1].down = spots[4];
  
  spots[2].left = spots[1];
  spots[2].down = spots[14];
  
  spots[3].right = spots[4];
  spots[3].down = spots[10];
  
  spots[4].left = spots[3];
  spots[4].right = spots[5];
  spots[4].up = spots[1];
  spots[4].down = spots[7];
  
  spots[5].left = spots[4];
  spots[5].down = spots[13];
  
  spots[6].right = spots[7];
  spots[6].down = spots[11];
  
  spots[7].left = spots[6];
  spots[7].right = spots[8];
  spots[7].up = spots[4];
  
  spots[8].left = spots[7];
  spots[8].down = spots[12];
  
  spots[9].up = spots[0];
  spots[9].right = spots[10];
  spots[9].down = spots[21];
  
  spots[10].left = spots[9];
  spots[10].right = spots[11];
  spots[10].up = spots[3];
  spots[10].down = spots[18];
  
  spots[11].left = spots[10];
  spots[11].up = spots[6];
  spots[11].down = spots[15];
  
  spots[12].right = spots[13];
  spots[12].up = spots[8];
  spots[12].down = spots[17];
  
  spots[13].left = spots[12];
  spots[13].right = spots[14];
  spots[13].up = spots[5];
  spots[13].down = spots[20];
  
  spots[14].left = spots[13];
  spots[14].up = spots[2];
  spots[14].down = spots[23];
  
  spots[15].right = spots[16];
  spots[15].up = spots[11];
  
  spots[16].left = spots[15]; 
  spots[16].right = spots[17];
  spots[16].down = spots[19];
  
  spots[17].left = spots[16];
  spots[17].up = spots[12];
  
  spots[18].right = spots[19];
  spots[18].up = spots[10];
  
  spots[19].left = spots[18];
  spots[19].right = spots[20];
  spots[19].up = spots[16];
  spots[19].down = spots[22];
  
  spots[20].left = spots[19];
  spots[20].up = spots[13];
  
  spots[21].right = spots[22];
  spots[21].up = spots[9];
  
  spots[22].left = spots[21];
  spots[22].right = spots[23];
  spots[22].up = spots[19];
  
  spots[23].left = spots[22];
  spots[23].up = spots[14];
  
  return spots;
};

Windmill.prototype.generatePossibleStates = function () {
  
  var states;
  
  switch (this.movement) {
      case "placing":
        states = this.generatePlacingStates();
        break;
      case "swaping":
        states = this.generateSwapingStates();
        break;
      case "removing":
        states = this.generateRemovingStates();
        break;
      case "moving":
        states = this.generateMovingStates();
        break;
      case "none":
        states = [];
        break;
      default:
        break;     
  }
  
  return states;
  
};

Windmill.prototype.generatePlacingStates = function () {

  var states = [];
  var board;
  
  for (var i = 0; i < this.board.length; i++) {
    
    if (this.board[i].owner == null) {
     
      board = this.cloneBoard();
      board[i].owner = this.player;
      board.lastMove = i;
      states.push(board);
      
    }
    
  }
  
  return states;
  
};

Windmill.prototype.generateRemovingStates = function () {
  
  var states = [];
  var board;
  
  for (var i = 0; i < this.board.length; i++) {
    
    if (this.board[i].owner && this.board[i].owner != this.player && !this.board[i].verifyWindmill()) {
     
      board = this.cloneBoard();
      board[i].owner = null;
      board.lastMove = i;
      states.push(board);
      
    }
    
  }
  
  return states;
  
  
};

Windmill.prototype.generateMovingStates = function () {
  
  var states = [];
  var board;
  
  for (var i = 0; i < this.board.length; i++) {
    
    if (this.board[i].owner == this.player) {
      
      board = this.cloneBoard();
      
      if (this.board[i].down && this.board[i].down.owner == null) {
        board[i].down.owner = this.player;
        board[i].owner = null;
        board.lastMove = board.indexOf(this.board[i].down);
        states.push(board);
        board = this.cloneBoard();
      }
      
      if (this.board[i].right && this.board[i].right.owner == null) {
        board[i].right.owner = this.player;
        board[i].owner = null;
        board.lastMove = board.indexOf(this.board[i].right);
        states.push(board);
        board = this.cloneBoard();
      }
      
      if (this.board[i].up && this.board[i].up.owner == null) {
        board[i].up.owner = this.player;
        board[i].owner = null;
        board.lastMove = board.indexOf(this.board[i].up);
        states.push(board);
        board = this.cloneBoard();
      }
      
      if (this.board[i].left && this.board[i].left.owner == null) {
        board[i].left.owner = this.player;
        board[i].owner = null;
        board.lastMove = board.indexOf(this.board[i].left);
        states.push(board);
      }
      
    }
    
  }
  
  return states;
  
};

Windmill.prototype.generateSwapingStates = function () {
  
  var states = [];
  var board;
  
  for (var i = 0; i < this.board.length; i++) {
    
    if (this.board[i].owner == this.player) {
     
      for (var j = 0; j < this.board.length; j++) {
        
        if(this.board[j].owner == null) {
          
          board = this.cloneBoard();
          board[j].owner = this.player;
          board[i].owner = null;
          board.lastMove = j;
          states.push(board);
          
        }
        
      }
      
    }
    
  }
  
  return states;
  
};

Windmill.prototype.changeState = function (state) {
  
  if (this.phase == "end") {
    return { error: true, message: "Game Over." };
  }
  
  var possibleState = this.isPossibleState(state);
  
  if (!possibleState) {
    return { error: true, message: "Not valid state." };
  }
  
  this.board = possibleState;
  
  this.updateStatus();
  
};

Windmill.prototype.changeStateByMove = function (index, move) {
  
  if (this.phase == "end") {
    return { error: true, message: "Game Over." };
  }
  
  if (!this.board[index][move] || this.board[index][move].owner != null || this.phase != "move" || this.board[index].owner != this.player) {
    return { error: true, message: "Not valid state." };
  }
  
  this.board[index][move].owner = this.board[index].owner;
  this.board[index].owner = null;
  
  this.board.lastMove = this.board.indexOf(this.board[index][move]);
  
  this.updateStatus();
  
};

Windmill.prototype.removeByIndex = function (index) {
  
  if (this.phase == "end") {
    return { error: true, message: "Game Over." };
  }
  
  if (!this.board[index] || this.board[index].owner == null || this.movement != "removing" || this.board[index].owner == this.player || this.board[index].verifyWindmill()) {
    return { error: true, message: "Not valid state." };
  }
  
  this.board[index].owner = null;
  
  this.board.lastMove = index;
  
  this.updateStatus();
  
};

Windmill.prototype.swapByIndex = function (from, to) {
  
  if (this.phase == "end") {
    return { error: true, message: "Game Over." };
  }
  
  if (!this.board[from] || !this.board[to] || this.board[from].owner != this.player || this.movement != "swaping" || this.board[to].owner != null) {
    return { error: true, message: "Not valid state." };
  }
  
  this.board[to].owner = this.board[from].owner;
  this.board[from].owner = null;
  
  this.board.lastMove = to;
  
  this.updateStatus();
  
};

Windmill.prototype.updateStatus = function () {
  
  if (this.phase == "end") {
    return { error: true, message: "Game Over." };
  }
  
  if (this.phase == "place") {
    this.placedPieces++;
  }
  
  if (this.placedPieces > 17) {
    this.phase = "move";
  }
  
  if (this.windmillFormed()) {
    this.movement = "removing";
  } else {
    
    this.player = this.player == 1 ? 2 : 1;
    
    if (this.phase == "place") {
      this.movement = "placing";
    } else {
      this.movement = "moving";
      
      
      if(this.canSwap()) {
        this.movement = "swaping";  
      }
      
    }
    
  }
  
  if (this.phase == "move" && this.verifyEnd()) {
   
    this.phase = "end";
    this.winner = this.whoIsTheWinner();
    this.movement = "none";
    
  }
  
};

Windmill.prototype.windmillFormed = function () {
  
  var lastMove = this.board.lastMove;
  
  return this.board[lastMove].verifyWindmill();
    
};

Windmill.prototype.canSwap = function () {
  
  var pieces = 0;
  
  if (this.phase == "move") {
    
    for(var i = 0; i < this.board.length; i++) {
     
      if (this.board[i].owner == this.player) {
        
        pieces++;
        
      }
      
    }
    
    return pieces < 4;
    
  }
  
  return false;
  
};

Windmill.prototype.verifyEnd = function () {
  
  var p1 = 0;
  var p2 = 0;
  
  this.board.forEach(function (spot) {
    
    if(spot.owner == 1) {
      p1++; 
    }
    if(spot.owner == 2) {
      p2++; 
    }
    
  });
  
  return p1 < 3 || p2 < 3;
  
};

Windmill.prototype.whoIsTheWinner = function () {
  
  var p1 = 0;
  
   this.board.forEach(function (spot) {
    
    if(spot.owner == 1) {
      p1++; 
    }
     
   });
  
  if(p1 > 2) {
    return 1; 
  }
  
  return 2;
  
  
};


Windmill.prototype.isPossibleState = function (state) {
  
  var possibleStates = this.generatePossibleStates();
  
  var possibleState = findState(possibleStates, state);
  
  if (possibleState) {
    return possibleState;
  }
  
  return null;
  
};

Windmill.prototype.cloneBoard = function () {
  
  var clone = createSpots();
  
  for (var i = 0; i < this.board.length; i++) {
    
    clone[i].owner = this.board[i].owner;
    
  }
  
  return clone;
  
};

function findState (states, state) {
  
  for (var i = 0; i < states.length; i++) {
    
    if (areStatesEqual(states[i], state)) {
      return states[i];
    }
    
  }
  
  return null;
  
}

function areStatesEqual (s1, s2) {
 
  for(var i = 0; i < s1.length; i++) {
   
    if (s1[i].owner != s2[i].owner) {
      return false;
    }
    
  }
  
  return true;
  
}

module.exports = Windmill;
  
