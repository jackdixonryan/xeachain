import * as uuid from "uuid";
// players enter companies, or players ARE companies? 
// if players are IN companies, then there's a complicating factor of how to determine player wage and company wage. 
// lets avoid that confounding factor for now by saying that there's no difference.
class Company {
  constructor(args) {
    const {
      name,
      description
    } = args;

    this.name = name;
    this.description = description;
    this.contractsIssued = [];
    this.contracts = [];
    this.dateFormed = new Date();
    // sure, we'll give some starter Xecs.
    this.xec = 1;
    this.guid = "CMY-" + uuid.v4();
    this.colonists = [];
  }

  // xecDiff can be +/-
  updateBalance(xecDiff) {
    this.xec += xecDiff;
  }
}

const mine = new Company({
  name: "Xemithus Corps",
  description: "We fight for our home!"
});

mine.updateBalance(-0.234)

console.log(mine);

