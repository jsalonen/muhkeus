'use strict';

let _ = require('lodash');
let bitmask = require('./bitmask');
let validLetters = "abcdefghijklmnopqrstuvwxyzåäö";

let defaultSanitizer = (word) => {

	return _.filter(
		word.toLowerCase(),
		(letter) => {
			return _.contains(validLetters, letter);
		}
	).join('');
};

let makeWordIndex = (words, sanitizer = defaultSanitizer) => {
	let index = {};

	index = 
		_(words)
		.map((word) => {
			let cleanedWord = sanitizer(word);
			let currentBitmask = bitmask.fromText(cleanedWord);
			let currentMuhkeus = bitmask.valueOf(currentBitmask);
			return {
				word: cleanedWord,
				bitmask: currentBitmask,
				muhkeus: currentMuhkeus
			};
		})
		.filter((entry) => {
			return (entry.bitmask > 0);
		})
		.uniq((i) => {
			return i.word;
		})
		.sortBy((i) => {
			return -i.muhkeus;
		})
		.value();

	return index;
};

let makeFrequencyIndex = (wordIndex) => {
	let initialFrequencyIndex = _.map(validLetters, (x) => (0));
	let count = 0;

	let frequencyIndex =
		_(wordIndex)
		.reduce((freqs, entry) => {
			let word = entry.word;
			for(let i = 0; i < word.length; i++) {
				let j = bitmask.indexOfCharCode(word.charCodeAt(i));
				if(j>=0) {
					freqs[j]++;
				}		
			}
			count += word.length;
			return freqs;	
		}, initialFrequencyIndex)
		.map((x) => {
			return x * 1.0 / count;
		});

	return frequencyIndex;
};

let makeRarityIndex = (wordIndex, frequencyIndex) => {
	return _(wordIndex)
		.map((word) => {
			let mask = word.bitmask,
			    i = 0,
			    rarity = 0;
			while(mask) {
				if(mask && 1) {
					rarity += (1 - frequencyIndex[i]);
				}
				i++;
				mask >>= 1;
			}

			word.rarity = Math.floor(rarity * 10 / validLetters.length);
			return word;
		})		
		.sortBy((i) => {
			return -i.muhkeus * 10 - i.rarity;
		})
		.value();	  	  
};

let bruteForce = (index) => {
	let maxSingleWordMuhkeus = index[0].muhkeus;
	let bestMuhkeus = bitmask.valueOf(index[0].bitmask | index[1].bitmask);
	let muhkeimmat = new Array();
//	let iterations = 0, maxIterations = index.length * index.length;

	for(let i = 0; i < index.length; i++) {
		if(index[i].muhkeus * 2 < maxSingleWordMuhkeus) { // not sure why
			break;
		}

		for(let j = 0; j < i; j++) {
//			iterations++;
			let currentMuhkeus = bitmask.valueOf(index[i].bitmask | index[j].bitmask);

			if(currentMuhkeus < bestMuhkeus) {
				continue;
			}

			if(currentMuhkeus > bestMuhkeus) {
				muhkeimmat = [];
			}
			bestMuhkeus = currentMuhkeus;
			muhkeimmat.push([index[i], index[j]]);
 		}
	}

//	console.log(`Iterations: ${iterations} / ${maxIterations} (${(iterations / maxIterations * 100)} %)`);

	return muhkeimmat;
};

let	muhkeimmat = (index, algorithm = bruteForce) => {
	return algorithm(index);
};

module.exports = {
	defaultSanitizer: defaultSanitizer,
	makeWordIndex: makeWordIndex,
	makeFrequencyIndex: makeFrequencyIndex,
	makeRarityIndex: makeRarityIndex,
	muhkeimmat: muhkeimmat
};
