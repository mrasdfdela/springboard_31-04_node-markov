/** Textual markov chain generator */

class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    
    this.wordBank = [...new Set(this.words)];
    this.wordChains = this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let wordChains = {};
    this.wordBank.forEach((word) => {
      wordChains[word] = this.makeWordChain(word, this.words);
    });
    return wordChains;
  }

  makeWordChain(lookupWord, words){
    let arr = [];
    words.forEach( (word, idx) => {
      if (word === lookupWord && idx < words.length-1) {
        arr.push(words[idx+1]);
      }
    });
    return arr;
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    let wordChainArr = [];

    let idx = this.randIdxFromArr(this.wordBank);
    let currWordBank = this.wordBank;
    for (let i = 0; i < numWords; i++) {
      if (currWordBank.length == 0){
        return wordChainArr;
      } else {
        wordChainArr.push(currWordBank[idx]);
        currWordBank = this.wordChains[currWordBank[idx]];
        idx = this.randIdxFromArr(currWordBank);
      }
    }
    return wordChainArr;
  }

  randIdxFromArr(arr){
    let idx = Math.floor(Math.random() * arr.length);
    return idx;
  }
}

module.exports = { MarkovMachine };