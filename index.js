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
		word,
		(letter) => {
			return _.contains(validLetters, letter);
		}
	).join('');
};

let uniqueWords = (words) => {
	return _.uniq(
		_.map(words, (word) => {
			return cleanWord(word);
		})
	);
};

let muhkeus = (word1, word2) => {
	return uniqueLetters(word1 + word2).length;
};

let	muhkeimmat = (wordlist) => {
	let bestPairs = [];
	let bestMuhkeus = 0;

	for(let i = 0; i < wordlist.length; i++) {
		for(let j = i + 1; j < wordlist.length; j++) {	
			let currentPair = [wordlist[i], wordlist[j]];
			let currentMuhkeus = muhkeus(currentPair[0], currentPair[1]);

			if(currentMuhkeus < bestMuhkeus) {
				continue;
			} else if(currentMuhkeus === bestMuhkeus) {
				bestPairs.push(currentPair);
			} else {
				bestPairs = [currentPair];
				bestMuhkeus = currentMuhkeus;
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
	uniqueWords: uniqueWords,
	muhkeus: muhkeus,
	muhkeimmat: muhkeimmat
};
