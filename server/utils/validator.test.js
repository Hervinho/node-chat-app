const expect = require('expect');
const {isRealString} = require('./validator');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    var value = 0;
    expect(isRealString(value)).toBe(false);
  });

  it('should reject strings with spaces only', () => {
    var value = '    ';
    expect(isRealString(value)).toBe(false);
  });

  it('should allow string with non-spaces characters', () => {
    var value = 'Hello';
    expect(isRealString(value)).toBe(true);
  });
});
