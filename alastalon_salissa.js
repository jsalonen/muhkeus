let assert = require('assert');
let fs = require('fs');
let alastalonSalissa = fs.readFileSync('test/alastalon_salissa.txt', 'utf8');
let muhkeus = require('./index');

let words = muhkeus.uniqueWords(alastalonSalissa.toString().split(/\s+/));

console.log('unique words: ', words.length);

let result = muhkeus.muhkeimmat(alastalonSalissa.toString().split(/\s+/));

console.log(result);
