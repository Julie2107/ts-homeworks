const makeOrdinal: (words: string) => string = require('./makeOrdinal');
const isFiniteCustom: (value: number) => boolean = require('./isFinite');
const isSafeNumber: (value: number) => boolean = require('./isSafeNumber');

const enum TDigits {
  TEN = 10,
  ONE_HUNDRED = 100,
  ONE_THOUSAND = 1000,
  ONE_MILLION = 1000000,
  ONE_BILLION = 1000000000, //         1.000.000.000 (9)
  ONE_TRILLION = 1000000000000, //     1.000.000.000.000 (12)
  ONE_QUADRILLION = 1000000000000000,
  MAX = 9007199254740992,
}

const LESS_THAN_TWENTY: readonly string[] = [
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

const TENTHS_LESS_THAN_HUNDRED: readonly string[] = [
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

function toWords(number: string, asOrdinal?: boolean): string {
  var words;
  var num = parseInt(number, 10);

  if (!isFinite(num)) {
    throw new TypeError('Not a finite number: ' + number + ' (' + typeof number + ')');
  }
  if (!isSafeNumber(num)) {
    throw new RangeError('Input is not a safe number, it’s either too large or too small.');
  }
  words = generateWords(num);
  return asOrdinal ? makeOrdinal(words) : words;
}

function generateWords(number: number, words: ReadonlyArray<string> = []): string {
  if (number === 0) {
    return !words ? 'zero' : words.join(' ').replace(/,$/, '');
  }
  // First run
  if (!words) {
    words = [];
  }
  // If negative, prepend “minus”
  if (number < 0) {
    return generateWords(Math.abs(number), [...words, 'minus']);
  }

  let remainder: number | undefined;
  let word: string = '';

  if (number < 20) {
    return generateWords(Math.abs(number), [...words, LESS_THAN_TWENTY[number]]);
  } else if (number < TDigits.ONE_HUNDRED) {
    remainder = number % TDigits.TEN;
    word = TENTHS_LESS_THAN_HUNDRED[Math.floor(number / TDigits.TEN)];
    // In case of remainder, we need to handle it here to be able to add the “-”
    if (remainder) {
      word += '-' + LESS_THAN_TWENTY[remainder];
      remainder = 0;
    }
    return generateWords(remainder, [...words, word]);
  } else if (number < TDigits.ONE_THOUSAND) {
    remainder = number % TDigits.ONE_HUNDRED;
    word = generateWords(Math.floor(number / TDigits.ONE_HUNDRED)) + ' hundred';
  } else if (number < TDigits.ONE_MILLION) {
    remainder = number % TDigits.ONE_THOUSAND;
    word = generateWords(Math.floor(number / TDigits.ONE_THOUSAND)) + ' thousand,';
  } else if (number < TDigits.ONE_BILLION) {
    remainder = number % TDigits.ONE_MILLION;
    word = generateWords(Math.floor(number / TDigits.ONE_MILLION)) + ' million,';
  } else if (number < TDigits.ONE_TRILLION) {
    remainder = number % TDigits.ONE_BILLION;
    word = generateWords(Math.floor(number / TDigits.ONE_BILLION)) + ' billion,';
  } else if (number < TDigits.ONE_QUADRILLION) {
    remainder = number % TDigits.ONE_TRILLION;
    word = generateWords(Math.floor(number / TDigits.ONE_TRILLION)) + ' trillion,';
  } else if (number <= TDigits.MAX) {
    remainder = number % TDigits.ONE_QUADRILLION;
    word = generateWords(Math.floor(number / TDigits.ONE_QUADRILLION)) + ' quadrillion,';
  }

  remainder = remainder || 0;

  return generateWords(remainder, [...words, word]);
}

module.exports = toWords;
