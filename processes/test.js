import Job from "../xemi/jobs/job.js";
import Colonist from "../xemi/people/colonist.js";

const job = new Job({
  issuer: "jack",
  contracts: [],
  exclusive: false,
  name: "Explore Magan's Rest",
  description: "Magan's Rest looks like the ideal spot for a landing. Go check it out!",
  personSecondsRequired: 10,
  wage: 0.1,
  dangers: [],
  foes: [],
});

const colonist = new Colonist();
const colonist2 = new Colonist();
const colonist3 = new Colonist();

// assign the colonist to the job.
// todo, figure out exclusivity v. inclusivity.  
// todo, figure out rails to "cash out"

// once those are done, start creating colonial varietals
// start adding dangers. 
// start creating foes. The fun stuff. 

job.issue();
job.assign([colonist, colonist2, colonist3]);

