var chai = require("chai"),
    expect = chai.expect,
    Windmill = require("../lib/Windmill");


describe("Windmill", function () {
  
  describe("on initialize a windmill", function () {
    
    var windmill = new Windmill();
    
    it("should have a board with 24 spots", function () {
      
      expect(windmill.board.length).to.be.equals(24);
      
    });
    
  });
  
  describe("on generating possible states with empty board", function () {
    
    var windmill = new Windmill();
    var possibleStates = windmill.generatePossibleStates();
    
    it("should return 24 possible states", function () {
      
      expect(possibleStates.length).to.be.equals(24);
      
    });
    
    it("board should keep its value", function () {
     
      windmill.board.forEach(function (spot) {
        expect(spot.owner).to.equals(null);
      });
      
    });
    
  });
  
  describe("on changing state from empty board", function () {
    
    var windmill = new Windmill();
    var possibleStates = windmill.generatePossibleStates();
    windmill.changeState(possibleStates[0]);
    
    it("should change the board state", function () {
      
      var changed = false;
      
      windmill.board.forEach(function (spot) {
        
        if (spot.owner != null) {
          changed = true;
        }
        
        expect(changed).to.equals(true);
        
      });
      
      
    });
    
    it("phase should be 'place'", function () {
      
      expect(windmill.phase).to.be.equals("place");
      
    });
    
    it("movement should be 'placing'", function () {
      
      expect(windmill.movement).to.be.equals("placing");
      
    });
    
    it("player should be 2", function () {
     
      expect(windmill.player).to.be.equals(2);
      
    });
    
  });
  
  describe("on forming a windmill during place phase", function () {
   
    var windmill = new Windmill();
    var possibleStates = windmill.generatePossibleStates();
    windmill.changeState(possibleStates[0]);
    
    possibleStates = windmill.generatePossibleStates();
    windmill.changeState(possibleStates[15]);
    
    possibleStates = windmill.generatePossibleStates();
    windmill.changeState(possibleStates[0]);
    
    possibleStates = windmill.generatePossibleStates();
    windmill.changeState(possibleStates[15]);
    
    possibleStates = windmill.generatePossibleStates();
    windmill.changeState(possibleStates[0]);
    
    it("movement should be removing", function () {
      
      expect(windmill.movement).to.be.equals("removing");
      
    });
    
    it("possibleStates should have lenght equal 2", function () {
     
      expect(windmill.generatePossibleStates().length).to.be.equals(2);
      
    });
    
    it("player should be equal 1", function () {
     
      expect(windmill.player).to.be.equals(1);
      
    });
    
  });
  
  describe("after placing all 18 pieces", function () {
    var windmill = new Windmill();
    var possibleStates;
    
    for(var i = 0; i < 18; i++) {
     
      possibleStates = windmill.generatePossibleStates();
      windmill.changeState(possibleStates[0]);
      
    }
    
    it("phase should be equal 'move'",function () {
      
      expect(windmill.phase).to.be.equals("move");
      
    });
    
   
    it("movement should be moving", function () {
      
      expect(windmill.movement).to.be.equals("moving");
      
    });
    
    it("possibleStates should be equal 3", function () {
      
      expect(windmill.generatePossibleStates().length).to.be.equals(3);
      
    });
    
  });
  
  describe("after placing all 18 pieces", function () {
    var windmill = new Windmill();
    var possibleStates;
    
    for(var i = 0; i < 18; i++) {
     
      possibleStates = windmill.generatePossibleStates();
      windmill.changeState(possibleStates[0]);
      
    }
    
    describe("then moving to form a windmill", function () {
      
      windmill.changeStateByMove(10, "down");
      windmill.changeStateByMove(3, "down");
      
      it("movement should be removing", function () {
        
        expect(windmill.movement).to.be.equals("removing");
        
      });
      
    });
  });
    
  describe("after placing all 18 pieces", function () {
    var windmill = new Windmill();
    var possibleStates;
    
    for(var i = 0; i < 18; i++) {
     
      possibleStates = windmill.generatePossibleStates();
      windmill.changeState(possibleStates[0]);
      
    }
    
    describe("then moving to form a windmill", function () {
      
      windmill.changeStateByMove(10, "down");
      windmill.changeStateByMove(3, "down");
      
      
      describe("then removing until player 1 can swap", function () {
        
        windmill.removeByIndex(0);
        windmill.changeStateByMove(16,"down");
        windmill.changeStateByMove(10,"up");
        windmill.changeStateByMove(19,"up");
        windmill.changeStateByMove(3,"down");
        windmill.removeByIndex(2);
        
        windmill.changeStateByMove(16,"down");
        windmill.changeStateByMove(10,"up");
        windmill.changeStateByMove(19,"up");
        windmill.changeStateByMove(3,"down");
        windmill.removeByIndex(4);
        
        windmill.changeStateByMove(16,"down");
        windmill.changeStateByMove(10,"up");
        windmill.changeStateByMove(19,"up");
        windmill.changeStateByMove(3,"down");
        windmill.removeByIndex(6);
        
        windmill.changeStateByMove(16,"down");
        windmill.changeStateByMove(10,"up");
        windmill.changeStateByMove(19,"up");
        windmill.changeStateByMove(3,"down");
        windmill.removeByIndex(8);
        
        windmill.changeStateByMove(16,"down");
        windmill.changeStateByMove(10,"up");
        windmill.changeStateByMove(19,"up");
        windmill.changeStateByMove(3,"down");
        windmill.removeByIndex(12);
        
        it("movement should be equal swaping", function () {
         
          expect(windmill.movement).to.be.equals("swaping");
          
        });
        
        it("should have 36 possible states", function () {
          
          expect(windmill.generatePossibleStates().length).to.be.equals(36);
          
        });
        
      });
      
    });
    
  });
  
  
  describe("after placing all 18 pieces", function () {
    var windmill = new Windmill();
    var possibleStates;
    
    for(var i = 0; i < 18; i++) {
     
      possibleStates = windmill.generatePossibleStates();
      windmill.changeState(possibleStates[0]);
      
    }
    
    describe("then moving to form a windmill", function () {
      
      windmill.changeStateByMove(10, "down");
      windmill.changeStateByMove(3, "down");
      
      
      describe("then removing until player 1 can swap", function () {
        
        windmill.removeByIndex(0);
        windmill.changeStateByMove(16,"down");
        windmill.changeStateByMove(10,"up");
        windmill.changeStateByMove(19,"up");
        windmill.changeStateByMove(3,"down");
        windmill.removeByIndex(2);
        
        windmill.changeStateByMove(16,"down");
        windmill.changeStateByMove(10,"up");
        windmill.changeStateByMove(19,"up");
        windmill.changeStateByMove(3,"down");
        windmill.removeByIndex(4);
        
        windmill.changeStateByMove(16,"down");
        windmill.changeStateByMove(10,"up");
        windmill.changeStateByMove(19,"up");
        windmill.changeStateByMove(3,"down");
        windmill.removeByIndex(6);
        
        windmill.changeStateByMove(16,"down");
        windmill.changeStateByMove(10,"up");
        windmill.changeStateByMove(19,"up");
        windmill.changeStateByMove(3,"down");
        windmill.removeByIndex(8);
        
        windmill.changeStateByMove(16,"down");
        windmill.changeStateByMove(10,"up");
        windmill.changeStateByMove(19,"up");
        windmill.changeStateByMove(3,"down");
        windmill.removeByIndex(12);
        
        
        describe("then swaping until forms a windmill", function () {
         
          windmill.swapByIndex(16, 2);
          console.log(windmill.windmillFormed(2));
          windmill.changeStateByMove(9,"down");
          windmill.swapByIndex(18, 23);
          
          
          
          it("movement should be removing", function () {
            
            expect(windmill.movement).to.be.equals("removing"); 
            
          });
          
          it("player should be 1", function () {
            
            expect(windmill.player).to.be.equals(1); 
            
          });
          
        });
        
        
      });
      
    });
    
  });

  
  describe("on a state of removing for player 1 and player 2 has a windmill", function () {
   
    var windmill = new Windmill();
    
    windmill.phase = "move";
    windmill.movement = "removing";
    windmill.player = 1;
    windmill.placedPieces = 18;
    
    windmill.board[0].owner = 1;
    windmill.board[1].owner = 1;
    windmill.board[2].owner = 1;
    
    windmill.board[14].owner = 2;
    
    windmill.board[21].owner = 2;
    windmill.board[22].owner = 2;
    windmill.board[23].owner = 2;
    
    it("it should proibit to remove from windmill", function () {
      
      expect(windmill.generatePossibleStates().length).to.be.equals(1);
      
    });
    
    
  });
  
  describe("on a winning state for player 1", function () {
   
    var windmill = new Windmill();
    
    windmill.phase = "move";
    windmill.movement = "removing";
    windmill.player = 1;
    windmill.placedPieces = 18;
    
    windmill.board[0].owner = 1;
    windmill.board[1].owner = 1;
    windmill.board[2].owner = 1;
    
    windmill.board[14].owner = 2;
    
    windmill.board[22].owner = 2;
    windmill.board[23].owner = 2;
    
    windmill.removeByIndex(14);
    
    it("phase should be end", function () {
      
      expect(windmill.phase).to.be.equals("end");
      
    });
    
    it("movement should be none", function () {
      
      expect(windmill.movement).to.be.equals("none");
      
    });
    
    it("winner should be 1", function () {
      
      expect(windmill.winner).to.be.equals(1);
      
    });
    
    it("no moves are able after end", function () {
      
      expect(windmill.changeState().error).to.be.equals(true);
      expect(windmill.changeStateByMove().error).to.be.equals(true);
      expect(windmill.removeByIndex().error).to.be.equals(true);
      
    })
    
    
  });
  
  
});