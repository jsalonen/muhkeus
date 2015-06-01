let assert = require('assert');
let bitmask = require('../src/bitmask');

describe('bitmask', () => {
	describe('fromCharCode', () => {
		let codeOf = (c) => {
			return c.charCodeAt(0);
		};

		it('converts valid charCodes (a-z, å, ä, ö) to bitmask', () => {
			assert.equal(bitmask.fromCharCode(codeOf('a')), 1);
			assert.equal(bitmask.fromCharCode(codeOf('z')), 33554432);
			assert.equal(bitmask.fromCharCode(codeOf('å')), 268435456);
			assert.equal(bitmask.fromCharCode(codeOf('ä')), 67108864);
			assert.equal(bitmask.fromCharCode(codeOf('ö')), 134217728);
		});

		it('does not support uppercase', () => {
			assert.equal(bitmask.fromCharCode(codeOf('A')), 0);
			assert.equal(bitmask.fromCharCode(codeOf('Z')), 0);
		})

		it('returns 0 for unsupported codes', () => {
			assert.equal(bitmask.fromCharCode(codeOf(' ')), 0);
			assert.equal(bitmask.fromCharCode(codeOf('~')), 0);
			assert.equal(bitmask.fromCharCode(codeOf('}')), 0);
		});
	});

	describe('fromText', () => {
		it('converts strings into letter bitmasks', () => {
			assert.equal(bitmask.fromText('a'), 1);
			assert.equal(bitmask.fromText('b'), 2);
			assert.equal(bitmask.fromText('ab'), 3);
			assert.equal(bitmask.fromText('auto'), 1589249);
		});
	});

	describe('valueOf', () => {
		it('returns number of bits set in a mask', () => {
			assert.equal(bitmask.valueOf(1), 1);
			assert.equal(bitmask.valueOf(1 + 2 + 4), 3);
			assert.equal(bitmask.valueOf((1 << 30) + (1 << 31)), 2);
		});
	});
});
