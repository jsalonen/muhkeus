'use strict';

var _ = require('lodash');
var bitmask = require('./bitmask');
var validLetters = 'abcdefghijklmnopqrstuvwxyzåäö';

var defaultSanitizer = function defaultSanitizer(word) {

	return _.filter(word.toLowerCase(), function (letter) {
		return _.contains(validLetters, letter);
	}).join('');
};

var makeWordIndex = function makeWordIndex(words) {
	var sanitizer = arguments[1] === undefined ? defaultSanitizer : arguments[1];

	var index = {};

	index = _(words).map(function (word) {
		var cleanedWord = sanitizer(word);
		var currentBitmask = bitmask.fromText(cleanedWord);
		var currentMuhkeus = bitmask.valueOf(currentBitmask);
		return {
			word: cleanedWord,
			bitmask: currentBitmask,
			muhkeus: currentMuhkeus
		};
	}).filter(function (entry) {
		return entry.bitmask > 0;
	}).uniq(function (i) {
		return i.word;
	}).sortBy(function (i) {
		return -i.muhkeus;
	}).value();

	return index;
};

var makeFrequencyIndex = function makeFrequencyIndex(wordIndex) {
	var initialFrequencyIndex = _.map(validLetters, function (x) {
		return 0;
	});
	var count = 0;

	var frequencyIndex = _(wordIndex).reduce(function (freqs, entry) {
		var word = entry.word;
		for (var i = 0; i < word.length; i++) {
			var j = bitmask.indexOfCharCode(word.charCodeAt(i));
			if (j >= 0) {
				freqs[j]++;
			}
		}
		count += word.length;
		return freqs;
	}, initialFrequencyIndex).map(function (x) {
		return x * 1 / count;
	});

	return frequencyIndex;
};

var makeRarityIndex = function makeRarityIndex(wordIndex, frequencyIndex) {
	return _(wordIndex).map(function (word) {
		var mask = word.bitmask,
		    i = 0,
		    rarity = 0;
		while (mask) {
			if (mask && 1) {
				rarity += 1 - frequencyIndex[i];
			}
			i++;
			mask >>= 1;
		}

		word.rarity = Math.floor(rarity * 10 / validLetters.length);
		return word;
	}).sortBy(function (i) {
		return -i.muhkeus * 10 - i.rarity;
	}).value();
};

var bruteForce = function bruteForce(index) {
	var maxSingleWordMuhkeus = index[0].muhkeus;
	var bestMuhkeus = bitmask.valueOf(index[0].bitmask | index[1].bitmask);
	var muhkeimmat = new Array();
	//	let iterations = 0, maxIterations = index.length * index.length;

	for (var i = 0; i < index.length; i++) {
		if (index[i].muhkeus * 2 < maxSingleWordMuhkeus) {
			// not sure why
			break;
		}

		for (var j = 0; j < i; j++) {
			//			iterations++;
			var currentMuhkeus = bitmask.valueOf(index[i].bitmask | index[j].bitmask);

			if (currentMuhkeus < bestMuhkeus) {
				continue;
			}

			if (currentMuhkeus > bestMuhkeus) {
				muhkeimmat = [];
			}
			bestMuhkeus = currentMuhkeus;
			muhkeimmat.push([index[i], index[j]]);
		}
	}

	//	console.log(`Iterations: ${iterations} / ${maxIterations} (${(iterations / maxIterations * 100)} %)`);

	return muhkeimmat;
};

var muhkeimmat = function muhkeimmat(index) {
	var algorithm = arguments[1] === undefined ? bruteForce : arguments[1];

	return algorithm(index);
};

module.exports = {
	defaultSanitizer: defaultSanitizer,
	makeWordIndex: makeWordIndex,
	makeFrequencyIndex: makeFrequencyIndex,
	makeRarityIndex: makeRarityIndex,
	muhkeimmat: muhkeimmat
};