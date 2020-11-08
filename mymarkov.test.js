const { MarkovMachine } = require("./markov");

// Tests to write:

test('makes chains correctly', function() {
  let mm = new MarkovMachine("Mary had a little lamb a little lamb had Mary");

  expect(mm.chains).toEqual(new Map([
    ["Mary", ["had", null]],
    ["had", ["a", "Mary"]],
    ["a", ["little", "little"]],
    ["little", ["lamb", "lamb"]],
    ["lamb", ["a", "had"]]
  ]));
});

// test the choices picked from an array
test('choice picks from array', function () {
  expect(MarkovMachine.choice(["text", "text", "text"])).toEqual("text");
  expect(["Mary", "had", "a", "little", "lamb"]).toContain(MarkovMachine.choice(["Mary", "had", "a", "little", "lamb"]));
});

// generated text is never more than the max number of words
test('text generation stops after max number of words', function () {
  let mm = new MarkovMachine("Mary had a little lamb a little lamb had Mary");
  let length = 2
  let output = mm.makeText(length);
  let outputSplit = output.split(/[ \r\n]+/);

  expect(outputSplit.length).toBeLessThanOrEqual(length);
})

// Given an array of text, if null is chosen, it is chosen last
test('if null is part of generated text, it is always last', function () {
  let mm = new MarkovMachine("Mary had a little lamb a little lamb had Mary");
  let length = 999;
  let output = mm.makeText(length);
  let outputSplit = output.split(/[ \r\n]+/);

  expect(outputSplit[outputSplit.length - 1]).not.toBeNull();
})



