/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // *********
    // generates Markov chains from text
    // **********
    // create an empty map
    let chains = new Map();
    // loop over the array of words
    for (let i = 0; i < this.words.length; i++) {
      const word = this.words[i];
      const nextWord = this.words[i + 1] || null;
      // if not already there, add the word to chains with empty array as value
      if (!chains.has(word)){
        chains.set(word, []);
      }
      // push the next word onto the array in the value for the current word
      chains.get(word).push(nextWord);
    }
    this.chains = chains;
  }

  /** Pick random choice from array */

  static choice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    // numChains = this.chains.size;
    let keys = Array.from(this.chains.keys());
    // choose key from chains at random
    let randWord = MarkovMachine.choice(keys);
    // choose from its array randomly
    let output = [];

    while (output.length < numWords && randWord !== null) {
      // write the word to output array
      output.push(randWord);
      // choose next word at random from current randWord's chain
      randWord = MarkovMachine.choice(this.chains.get(randWord));
    }

    return output.join(" ");
  } 
}

module.exports = {
  MarkovMachine,
};
