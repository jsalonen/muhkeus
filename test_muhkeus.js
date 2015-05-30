let assert = require('assert');
let _ = require('lodash');
let muhkeus = require('./index');

describe('uniqueLetters', () => {
	it('should count unique letters', () => {
		assert.equal(muhkeus.uniqueLetters('abc').length, 3);
	});

	it('should ignore case', () => {
		assert.equal(muhkeus.uniqueLetters('aA').length, 1);
	});

	it('discards invalid letters', () => {
		assert.equal(muhkeus.uniqueLetters('~?/$#"½§'), 0);
	});
});

describe('muhkeus', () => {
	it('should count muhkeus', () => {
		assert.equal(muhkeus.muhkeus('abc', 'bcd'), 4);
	});
});

describe('uniqueWords', () => {
	it('removes duplicate words', () => {
		let uniqueWords = muhkeus.uniqueWords(['kissa', 'koira', 'koira', 'kissa']);

		assert.equal(uniqueWords.length, 2);
	});

	it('removes invalid letters', () => {
		let uniqueWords = muhkeus.uniqueWords(['kissa\n', 'kissa,', 'kissa.', 'kis-sa', 'kis_sa']);

		assert.equal(uniqueWords.length, 1);
	});
});

describe('muhkeimmat', () => {
	it('returns muhkeimmat word pairs', () => {
		let muhkeimmat = muhkeus.muhkeimmat(['upea', 'kapteeni', 'ruori', 'perä']);
		assert.equal(muhkeimmat.pairs.length, 1);
		assert.equal(_(muhkeimmat.pairs[0]).contains('ruori'), true);
		assert.equal(_(muhkeimmat.pairs[0]).contains('kapteeni'), true);
	});	
});
