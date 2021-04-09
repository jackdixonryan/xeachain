// the job class lets us create task. Every task can be rewarded by XEC, Xemithus Exploratory Currency. Harder jobs run higher risks, require more people to complete, take longer, etc. The XEC reward for completing the job is calculated from these factors.

import * as uuid from "uuid";

class Job {
  constructor(args) {
    // using args for ease of declaration. 
    const {
      issuer,
      contracts,
      exclusive,
      name,
      description,
      personSecondsRequired,
      wage,
      dangers,
      foes,
    } = args;

    // the person who issued the job
    this.issuer = issuer;

    // the people trying to work the job fall into a date-sorted array. 
    this.contracts = contracts;
    // if set to true, only one person can work the contract at a given time. Otherwise, the reward can be divided among multiple contracts. 
    this.exclusive = exclusive;
    // a brief name for the job.
    this.name = name;
    // a longer description of the task.
    this.description = description;
    // 
    this.personSecondsRequired = personSecondsRequired;
    this.personSeconds = 0;
    this.wage = wage;
    // any potential dangers that could confront the mission 
    this.dangers = dangers;
    // any enemies that could confront the mission. In the event of assassination / capture missions. Foes passed to this array MUST BE ENCOUNTERED. Chance encounters are classed as dangers. 
    this.foes = foes;
    // if the job is done. 
    this.completed = false;
    // when the job was issued.
    this.dateIssued = new Date();
    this.dateCompleted = null;
    this.xec = this.calculateXec();
    this.guid = "JOB-" + uuid.v4();
  }
  
  // wage * workRequired (in person-hours) 
  // foes + dangers
    // CR per foe / XEC modifier -
    // CR per danger / XEC modifier - say, danger cr 1.5.
  calculateXec() {
    let base = this.personSecondsRequired * this.wage;
    
    // the two modifiers will further modify the base variable appropriately based on the CR of the danger. Either that, or they modify the wage...
    if (this.foes.length > 0) {

    }
    
    if (this.dangers.length > 0) {

    }
    return base;
  }

  // an array of colonists can be assigned to the job to complete it. 
  assign(colonists) {
    // first, log the contract as the most recent to be created.  Unshift the array b/c it's stack form -- ie, contracts[0]
    this.contracts.unshift({
      guid: "CNT-" + uuid.v4(),
      colonists: colonists.map(col => col.guid),
      dateStarted: new Date(),
      dateCompleted: null,
      xecEarned: 0
    });
  }

  // function initializes the issuance of the contract and starts the earning cap.
  issue() {
    const self = this;
    const intervalId = setInterval(function secondTick() {
      if (self.contracts.length > 0 && !self.completed) {
        const leadingContract = self.contracts[0];
        let numAssignees = leadingContract.colonists.length;
        // make sure to guard against xec leakage from overpowering the contract with colonists.
        if (self.personSeconds + numAssignees > self.personSecondsRequired) {
          numAssignees = self.personSecondsRequired - self.personSeconds;
        }
        const earningForSecond = self.wage * numAssignees;
        leadingContract.xecEarned += earningForSecond;
        self.personSeconds += numAssignees;
        // this would have to shift up to prevent bleeding from assigning many colonists to the job. 
        if (self.personSeconds  >= self.personSecondsRequired) {
          // is this kind of self-reference possible in this scenario?
          self.completed = true;
          self.dateCompleted = new Date();
          self.contracts[0].dateCompleted = new Date();
          clearInterval(intervalId);
        }
      }
    }, 1000);
  }

  // revokes a contract ie, prevents it from money-making 
  revoke(contractGuid) {
    const contract = this.contracts.find((contract) => contract.guid === contractGuid);
    if (contract) {
      console.log(contract);
    }
  }
};

export default Job;