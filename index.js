let _ = require('lodash');
let validLetters = "abcdefghijklmnopqrstuvwxyzåäö";

let uniqueLetters = (word) => {
	return _.filter(
		_.uniq( word.toLowerCase() ),
		(letter) => {
			return _.contains(validLetters, letter);
		}
	);
};

let cleanWord = (word) => {
	return _.filter(
		word.toLowerCase(),
		(letter) => {
			return _.contains(validLetters, letter);
		}
	).join('');
};

let characterize = (word) => {
	let characteristic = 0;

	let charCodeToBitmask = (charCode) => {
		const CHARCODE_A = 'a'.charCodeAt(0);
		const CHARCODE_Z = 'z'.charCodeAt(0);
		const CHARCODE_A_UMLAUT = 'ä'.charCodeAt(0);
		const CHARCODE_O_UMLAUT = 'ö'.charCodeAt(0);
		const CHARCODE_A_SWEDISH = 'å'.charCodeAt(0);
		const BITMASK_Z = 'z'.charCodeAt(0) - 'a'.charCodeAt('0');
		const BITMASK_A_UMLAUT = BITMASK_Z + 1;
		const BITMASK_O_UMLAUT = BITMASK_Z + 2; 
		const BITMASK_A_SWEDISH = BITMASK_Z + 3; 

		if(charCode >= CHARCODE_A && charCode <= CHARCODE_Z) {
			return 1 << (charCode - CHARCODE_A);
		} else if (charCode === CHARCODE_A_UMLAUT) {
			return 1 << BITMASK_A_UMLAUT;
		} else if (charCode === CHARCODE_O_UMLAUT) {
			return 1 << BITMASK_O_UMLAUT;
		} else if (charCode === CHARCODE_A_SWEDISH) {
			return 1 << BITMASK_A_SWEDISH;
		}
	};

	for(let i = 0; i < word.length; i++) {
		let bitmask = charCodeToBitmask(word.charCodeAt(i));
		characteristic |= bitmask;
	}

	return characteristic;
};

let muhkeusByCharacteristic = (letterCharacteristic) => {
	// "Hamming Weight"
	let numberOfSetBits = (i) => {
		i = i - ((i >> 1) & 0x55555555);
		i = (i & 0x33333333) + ((i >> 2) & 0x33333333);
		return (((i + (i >> 4)) & 0x0F0F0F0F) * 0x01010101) >> 24;
	};

	return numberOfSetBits(letterCharacteristic);
};

let muhkeus = (word1, word2) => {
	return muhkeusByCharacteristic(
		characterize(word1) | characterize(word2)
	)
};

let indexWords = (words) => {
	let indexArray;
	let index = {};
	let highestMuhkeus = 0;

	words.forEach((word) => {
		let characteristic = characterize(cleanWord(word));
		let muhkeus = muhkeusByCharacteristic(characteristic);

		if(index[muhkeus] === undefined) {
			index[muhkeus] = {};
		}

		if(index[muhkeus][characteristic] === undefined) {
			index[muhkeus][characteristic] = [];
		}

		if(index[muhkeus][characteristic].indexOf(word) === -1) {
			index[muhkeus][characteristic].push(word);
		}

		if(muhkeus > highestMuhkeus) {
			highestMuhkeus = muhkeus;
		}
	});

	return _.map(new Array(highestMuhkeus + 1), (val, muhkeus) => {
		return index[muhkeus] || {};
	});
};

let	muhkeimmat = (wordlist) => {
	let bestPairs = [];
	let bestMuhkeus = 0;
	let index = indexWords(wordlist);
	let highestMuhkeusByWord = index.length - 1;

	for(let i = index.length - 1; i >= 0; i--) {
		for(let mask1 in index[i]) {
			for(let j = index.length - 1; j >= bestMuhkeus - i; j--) {
				if(j < i) {
					for(let mask2 in index[j]) {
						let currentMuhkeus = muhkeusByCharacteristic(mask1 | mask2);
						let currentPairs = [index[i][mask1], index[j][mask2]];

						if(currentMuhkeus < bestMuhkeus) {
							continue;
						} else if(currentMuhkeus === bestMuhkeus) {
							bestPairs.push(currentPairs);
						} else {
							bestPairs = [currentPairs];
							bestMuhkeus = currentMuhkeus;
						}
					}
				}
			}			
		}
	}

	return {
		pairs: bestPairs,
		muhkeus: bestMuhkeus
	};
};

module.exports = {
	uniqueLetters: uniqueLetters,
	indexWords: indexWords,
	muhkeus: muhkeus,
	muhkeimmat: muhkeimmat,
	characterize: characterize,
	cleanWord: cleanWord
};
