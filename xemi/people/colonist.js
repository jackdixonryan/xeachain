import * as uuid from "uuid";

// here we have the base class, the Colonist.
// all other "people" types are based on the colonist.
class Colonist {
  // in a base level colonist (ie, no specialization) the colonists stat block is very weak.
  constructor() {
    // hp is the amount of punishment the colonist can take from physical assailment. 
    this.hp = 1;
    // stamina is the amount of stuff the colonist can do before they need to take a rest. 
    this.stamina = 1;
    // fortitude is the amount of punishment the colonist can take from the elements. 
    this.fortitude = 1;
    // sanity represents the mental well-being of the settler.
    this.sanity = 1;
    // cost represents how much the acquisition of a new colonist will cost. 
    this.cost = 1;
    this.guid = "COL-" + uuid.v4();
  }
}

export default Colonist;