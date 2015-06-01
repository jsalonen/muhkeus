global.chai = require('chai');
global.expect = global.chai.expect;
global.chai.should();
global.chai.use(require('chai-things'));

let _ = require('lodash');
let muhkeus = require('../src/muhkeus');

describe('defaultSanitizer', () => {
	let callWith = muhkeus.defaultSanitizer;

	it('should count unique letters', () => {
		callWith('abc').should.have.length(3);
	});

	it('converts to lowercase', () => {
		callWith('ABCÅÄÖ').should.equal('abcåäö');
	});

	it('discards invalid letters', () => {
		callWith('~?/$#"½§').should.equal('');
	});
});

describe('makeWordIndex', () => {
	it('indexes words by muhkeus', () => {
		let results = muhkeus.makeWordIndex(['kissa', 'ovi', 'a', 'tai', 'ja', 'kåä']);

		results[0].should.have.property('muhkeus', 4);
		results[0].should.have.property('word', 'kissa');

		results[2].muhkeus.should.equal(3);

		results[5].should.have.property('muhkeus', 1);
		results[5].should.have.property('word', 'a');
	});

	it('removes duplicates', () => {
		let index = muhkeus.makeWordIndex(['ja', 'tai', 'ja', 'tai']);

		index.should.have.length(2);
	});
});

describe('makeFrequencyIndex', () => {
	it('indexes letters by frequency', () => {
		let wordIndex = muhkeus.makeWordIndex(['a', 'az', 'b', 'D', 'AZD']);
		let freqs = muhkeus.makeFrequencyIndex(wordIndex);

		freqs[0].should.equal(0.375);
		freqs[1].should.equal(0.125);
		freqs[3].should.equal(0.25);
		freqs[freqs.length - 4].should.equal(0.25);
	});
});

describe('muhkeimmat', () => {
	it('returns muhkeimmat word pairs', () => {
		let index = muhkeus.makeWordIndex(['a', 'b', 'cf', 'de']);
		let muhkeimmat = muhkeus.muhkeimmat(index);

		muhkeimmat[0].should.contain.a.thing.with.property('word', 'cf');
		muhkeimmat[0].should.contain.a.thing.with.property('word', 'de');
	});	

	it('can return multiple matches', () => {
		let index = muhkeus.makeWordIndex(['a', 'B', 'CF', 'de', 'GI']);
		let muhkeimmat = muhkeus.muhkeimmat(index);
		let pairs = _.map(muhkeimmat, (x) => {
			return _(x).sortBy('word').pluck('word').value();
		});

		pairs.should.contain.something.that.deep.equals(['cf', 'de']);
		pairs.should.contain.something.that.deep.equals(['cf', 'gi']);
		pairs.should.contain.something.that.deep.equals(['de', 'gi']);
	});	

	it('works with larger wordlists', () => {
		let index = muhkeus.makeWordIndex([
			'a', 'ab', 'sal', 'foo', 'bar', 'ringdongwhazam', 'tomatoes', 'salsa',
			'z', 'e', 'cd', 'ze', 'qa'
		]);
		let muhkeimmat = muhkeus.muhkeimmat(index);
		let pairs = _.map(muhkeimmat, (x) => {
			return _(x).sortBy('word').pluck('word').value();
		});

		pairs.should.have.length(1);
		pairs.should.contain.something.that.deep.equals(['ringdongwhazam', 'tomatoes']);
	});
});
