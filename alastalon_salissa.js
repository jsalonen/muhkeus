let assert = require('assert');
let fs = require('fs');
let alastalonSalissa = fs.readFileSync('test/alastalon_salissa.txt', 'utf8');
let muhkeus = require('./index');

let words = muhkeus.uniqueWords(alastalonSalissa.toString().split(/\s+/));
let result = muhkeus.muhkeimmat(words);

console.log(result);
