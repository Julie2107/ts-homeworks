"use strict";
const makeOrdinal = require('./makeOrdinal');
const isFiniteCustom = require('./isFinite');
const isSafeNumber = require('./isSafeNumber');
const LESS_THAN_TWENTY = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen',
];
const TENTHS_LESS_THAN_HUNDRED = [
    'zero',
    'ten',
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety',
];
function toWords(number, asOrdinal) {
    var words;
    var num = parseInt(String(number), 10);
    if (!isFiniteCustom(num)) {
        throw new TypeError('Not a finite number: ' + number + ' (' + typeof number + ')');
    }
    if (!isSafeNumber(num)) {
        throw new RangeError('Input is not a safe number, it’s either too large or too small.');
    }
    words = generateWords(num);
    return asOrdinal ? makeOrdinal(words) : words;
}
function generateWords(number, words = []) {
    if (number === 0) {
        return !words ? 'zero' : words.join(' ').replace(/,$/, '');
    }
    // If negative, prepend “minus”
    if (number < 0) {
        return generateWords(Math.abs(number), [...words, 'minus']);
    }
    let remainder;
    let word = '';
    if (number < 20) {
        return generateWords(Math.abs(number), [...words, LESS_THAN_TWENTY[number]]);
    }
    else if (number < 100 /* TDigits.ONE_HUNDRED */) {
        remainder = number % 10 /* TDigits.TEN */;
        word = TENTHS_LESS_THAN_HUNDRED[Math.floor(number / 10 /* TDigits.TEN */)];
        // In case of remainder, we need to handle it here to be able to add the “-”
        if (remainder) {
            word += '-' + LESS_THAN_TWENTY[remainder];
            remainder = 0;
        }
        return generateWords(remainder, [...words, word]);
    }
    else if (number < 1000 /* TDigits.ONE_THOUSAND */) {
        remainder = number % 100 /* TDigits.ONE_HUNDRED */;
        word = generateWords(Math.floor(number / 100 /* TDigits.ONE_HUNDRED */)) + ' hundred';
    }
    else if (number < 1000000 /* TDigits.ONE_MILLION */) {
        remainder = number % 1000 /* TDigits.ONE_THOUSAND */;
        word = generateWords(Math.floor(number / 1000 /* TDigits.ONE_THOUSAND */)) + ' thousand,';
    }
    else if (number < 1000000000 /* TDigits.ONE_BILLION */) {
        remainder = number % 1000000 /* TDigits.ONE_MILLION */;
        word = generateWords(Math.floor(number / 1000000 /* TDigits.ONE_MILLION */)) + ' million,';
    }
    else if (number < 1000000000000 /* TDigits.ONE_TRILLION */) {
        remainder = number % 1000000000 /* TDigits.ONE_BILLION */;
        word = generateWords(Math.floor(number / 1000000000 /* TDigits.ONE_BILLION */)) + ' billion,';
    }
    else if (number < 1000000000000000 /* TDigits.ONE_QUADRILLION */) {
        remainder = number % 1000000000000 /* TDigits.ONE_TRILLION */;
        word = generateWords(Math.floor(number / 1000000000000 /* TDigits.ONE_TRILLION */)) + ' trillion,';
    }
    else if (number <= 9007199254740992 /* TDigits.MAX */) {
        remainder = number % 1000000000000000 /* TDigits.ONE_QUADRILLION */;
        word = generateWords(Math.floor(number / 1000000000000000 /* TDigits.ONE_QUADRILLION */)) + ' quadrillion,';
    }
    remainder = remainder || 0;
    return generateWords(remainder, [...words, word]);
}
module.exports = toWords;
