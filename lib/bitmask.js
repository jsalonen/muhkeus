'use strict';

var CHARCODE_A = 'a'.charCodeAt(0);
var CHARCODE_Z = 'z'.charCodeAt(0);
var CHARCODE_A_UMLAUT = 'ä'.charCodeAt(0);
var CHARCODE_O_UMLAUT = 'ö'.charCodeAt(0);
var CHARCODE_A_SWEDISH = 'å'.charCodeAt(0);
var BITMASK_Z = 'z'.charCodeAt(0) - 'a'.charCodeAt('0');
var BITMASK_A_UMLAUT = BITMASK_Z + 1;
var BITMASK_O_UMLAUT = BITMASK_Z + 2;
var BITMASK_A_SWEDISH = BITMASK_Z + 3;

var indexOfCharCode = function indexOfCharCode(charCode) {
	if (charCode >= CHARCODE_A && charCode <= CHARCODE_Z) {
		return charCode - CHARCODE_A;
	} else if (charCode === CHARCODE_A_UMLAUT) {
		return BITMASK_A_UMLAUT;
	} else if (charCode === CHARCODE_O_UMLAUT) {
		return BITMASK_O_UMLAUT;
	} else if (charCode === CHARCODE_A_SWEDISH) {
		return BITMASK_A_SWEDISH;
	} else {
		return -1;
	}
};

var fromCharCode = function fromCharCode(charCode) {
	if (charCode >= CHARCODE_A && charCode <= CHARCODE_Z) {
		return 1 << charCode - CHARCODE_A;
	} else if (charCode === CHARCODE_A_UMLAUT) {
		return 1 << BITMASK_A_UMLAUT;
	} else if (charCode === CHARCODE_O_UMLAUT) {
		return 1 << BITMASK_O_UMLAUT;
	} else if (charCode === CHARCODE_A_SWEDISH) {
		return 1 << BITMASK_A_SWEDISH;
	} else {
		return 0;
	}
};

var fromText = function fromText(text) {
	var bitmask = 0;

	for (var i = 0; i < text.length; i++) {
		bitmask |= fromCharCode(text.charCodeAt(i));
	}

	return bitmask;
};

var valueOf = function valueOf(bitmask) {
	// Count number of bits set ("Hamming Weight")
	bitmask = bitmask - (bitmask >> 1 & 1431655765);
	bitmask = (bitmask & 858993459) + (bitmask >> 2 & 858993459);
	return (bitmask + (bitmask >> 4) & 252645135) * 16843009 >> 24;
};

module.exports = {
	indexOfCharCode: indexOfCharCode,
	fromCharCode: fromCharCode,
	fromText: fromText,
	valueOf: valueOf
};