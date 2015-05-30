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

describe('cleanWord', () => {
	it('removes nonvalid letters', () => {
		let cleanWord = muhkeus.cleanWord('a~b$c%');

		assert.equal(cleanWord, 'abc');
	});
});
describe('indexWords', () => {
	it('indexes words by muhkeus', () => {
		let index = muhkeus.indexWords(['kissa', 'ovi', 'ja', 'tai', 'ja', 'kåäö']);

		assert.equal(index[4]['469763072'][0], 'kåäö');
	});
});

describe('muhkeimmat', () => {
	it('returns muhkeimmat word pairs', () => {
		let muhkeimmat = muhkeus.muhkeimmat(['upea', 'kapteeni', 'ruori', 'perä']);
		let pair = [muhkeimmat.pairs[0][0][0], muhkeimmat.pairs[0][1][0]];

		assert.equal(_(pair).contains('ruori'), true);
		assert.equal(_(pair).contains('kapteeni'), true);
	});	
});
