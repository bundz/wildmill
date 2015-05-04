var Spot = function () { 
  this.left = null;
  this.up = null;
  this.right = null;
  this.down = null;
  this.owner = null;
};

Spot.prototype.verifyWindmill = function () {
  
  var hasWindmill = false;
  
  if (this.owner == null) {
    return false;
  }
  
  if (this.up) {
    if(this.up.up) {
      hasWindmill = hasWindmill || (this.up.owner == this.up.up.owner) && (this.up.owner == this.owner);
    } else {
      hasWindmill = hasWindmill || (this.up.owner == this.down.owner) && (this.up.owner == this.owner);
    }
  }
  
  if (this.right) {
    if (this.right.right) {
      hasWindmill = hasWindmill || (this.right.owner == this.right.right.owner) && (this.right.owner == this.owner);
    } else {
      hasWindmill = (hasWindmill || this.right.owner == this.left.owner) && (this.left.owner == this.owner); 
    }
  }
  
  if (this.down) {
    if(this.down.down) {
      hasWindmill = hasWindmill || (this.down.owner == this.down.down.owner) && (this.down.owner == this.owner);
    } else {
      hasWindmill = hasWindmill || (this.down.owner == this.up.owner) && (this.down.owner == this.owner);
    }
  }
  
  if (this.left) {
    if (this.left.left) {
      hasWindmill = hasWindmill || (this.left.owner == this.left.left.owner) && (this.left.owner == this.owner);
    } else {
      hasWindmill = hasWindmill || (this.left.owner == this.right.owner) && (this.right.owner == this.owner); 
    }
  }
  
  return hasWindmill;
  
};

module.exports = Spot;