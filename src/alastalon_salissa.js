let _ = require('lodash');
let assert = require('assert');
let fs = require('fs');
let alastalonSalissa = fs.readFileSync('../test/alastalon_salissa.txt', 'utf8');
let muhkeus = require('./muhkeus');

let words = alastalonSalissa.toString().split(/\s+/);
console.log('Total word count:', words.length);

let wordIndex = muhkeus.makeWordIndex(words);
console.log('Total words in index:', wordIndex.length);

let frequencyIndex = muhkeus.makeFrequencyIndex(wordIndex);

let rarityIndex = muhkeus.makeRarityIndex(wordIndex, frequencyIndex);
console.log('Total words in rarity index: ', rarityIndex.length);

let result = muhkeus.muhkeimmat(rarityIndex);

let pairs =
	_(result)
	.map((x) => {
		return x[0].word + '-' + x[1].word
	})
	.value();

console.log('Result:');
console.dir(pairs);
