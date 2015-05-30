let _ = require('lodash');
let assert = require('assert');
let fs = require('fs');
let alastalonSalissa = fs.readFileSync('test/alastalon_salissa.txt', 'utf8');
let muhkeus = require('./index');

let words = alastalonSalissa.toString().split(/\s+/);

console.log('Total word count:', words.length);

let result = muhkeus.muhkeimmat(words);
console.log('Best score: ', result.muhkeus);
let pairs = [];

console.log('Word pairs:');
result.pairs.forEach((pair) => {
	console.dir(pair);
});
