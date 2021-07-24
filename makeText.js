/** Command-line tool to generate Markov text. */
const fs = require("fs");
const {default: axios } = require("axios");
let { MarkovMachine } = require("./markov");
let cmd = process.argv[2];
let path = process.argv[3];


async function genMarkov(cmd, path) {
  if (cmd === 'file') {
    let text = fs.readFileSync(path, "utf8");
    let machine = new MarkovMachine(text);
    console.log(`... generated text from file ${path} ...`);
    console.log(machine.makeText(50));
  } else if (cmd === 'url') {
    let text = await axios.get(path);
    let machine = new MarkovMachine(text.data);
    console.log(`... generated text from url ${path} ...`);
    console.log(machine.makeText(50));
  }
}

genMarkov(cmd,path);