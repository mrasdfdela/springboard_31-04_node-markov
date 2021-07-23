/** Command-line tool to generate Markov text. */
const fs = require("fs");
let { MarkovMachine } = require("./markov");
let path = process.argv[2];

let text = fs.readFileSync(path, "utf8");
machine = new MarkovMachine(text);
console.log(machine.makeText(100));