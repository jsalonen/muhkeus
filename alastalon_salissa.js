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
result.pairs.forEach((pair) => {
	pairs.push(pair[0]+'-'+pair[1]);
});
console.log('Word pairs: ', pairs.join(' '));
