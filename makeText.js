/** Command-line tool to generate Markov text. */
const fs = require("fs");

const axios = require("axios");
const process = require("process");
const markov = require("./markov");

const sourceType = process.argv[2];
const path = process.argv[3];

/** Make Markov machine from text and generate text from it. */

function generateText(text) {
  let mm = new markov.MarkovMachine(text);
  console.log(mm.makeText());
}

function cat(path) {
  // read file with fs.readFile
  fs.readFile(path, "utf8", function(err, data) {
    if (err) { 
      console.error(`Error reading ${path}: ${err}`);
      process.exit(1);
    } else {
      // use the contents as text to create the instance of MarkovMachine
      generateText(data);
    }
  });
}

async function webCat(path) {
  // read file with axios
  try {
    let res = await axios({
      method: 'get',
      url: path,
    });
  } catch (err) {
    console.error(`Error reading ${path}: ${err}`);
    process.exit(1);
  }
  generateText(res.data);  
}


if (sourceType === 'url') {
  webCat(path);
} 
if (sourceType === 'file') {
  cat(path);
}

