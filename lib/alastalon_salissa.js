'use strict';

var _ = require('lodash');
var assert = require('assert');
var fs = require('fs');
var alastalonSalissa = fs.readFileSync('../test/alastalon_salissa.txt', 'utf8');
var muhkeus = require('./muhkeus');

var words = alastalonSalissa.toString().split(/\s+/);
console.log('Total word count:', words.length);

var wordIndex = muhkeus.makeWordIndex(words);
console.log('Total words in index:', wordIndex.length);

var frequencyIndex = muhkeus.makeFrequencyIndex(wordIndex);

var rarityIndex = muhkeus.makeRarityIndex(wordIndex, frequencyIndex);
console.log('Total words in rarity index: ', rarityIndex.length);

var result = muhkeus.muhkeimmat(rarityIndex);

var pairs = _(result).map(function (x) {
	return x[0].word + '-' + x[1].word;
}).value();

console.log('Result:');
console.dir(pairs);