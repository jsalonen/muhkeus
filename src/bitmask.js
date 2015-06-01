const CHARCODE_A = 'a'.charCodeAt(0);
const CHARCODE_Z = 'z'.charCodeAt(0);
const CHARCODE_A_UMLAUT = 'ä'.charCodeAt(0);
const CHARCODE_O_UMLAUT = 'ö'.charCodeAt(0);
const CHARCODE_A_SWEDISH = 'å'.charCodeAt(0);
const BITMASK_Z = 'z'.charCodeAt(0) - 'a'.charCodeAt('0');
const BITMASK_A_UMLAUT = BITMASK_Z + 1;
const BITMASK_O_UMLAUT = BITMASK_Z + 2; 
const BITMASK_A_SWEDISH = BITMASK_Z + 3; 

let indexOfCharCode = (charCode) => {
	if(charCode >= CHARCODE_A && charCode <= CHARCODE_Z) {
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

let fromCharCode = (charCode) => {
	if(charCode >= CHARCODE_A && charCode <= CHARCODE_Z) {
		return 1 << (charCode - CHARCODE_A);
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

let fromText = (text) => {
	let bitmask = 0;

	for(let i = 0; i < text.length; i++) {
		bitmask |= fromCharCode(text.charCodeAt(i));
	}

	return bitmask;
};

let valueOf = (bitmask) => {
	// Count number of bits set ("Hamming Weight")
	bitmask = bitmask - ((bitmask >> 1) & 0x55555555);
	bitmask = (bitmask & 0x33333333) + ((bitmask >> 2) & 0x33333333);
	return (((bitmask + (bitmask >> 4)) & 0x0F0F0F0F) * 0x01010101) >> 24;
};

module.exports = {
	indexOfCharCode: indexOfCharCode,
	fromCharCode: fromCharCode,
	fromText: fromText,
	valueOf: valueOf
};
