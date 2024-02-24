import { format2 } from './utils';

describe('utils', () => {
  describe('format2', () => {
    test.each([
      { input: 0, output: '0' },
      { input: 3, output: '3' },
      { input: 10, output: '10' },
      { input: 21, output: '21' },
      { input: 99, output: '99' },
    ])('should return without lead zero: from $input to $output', ({ input, output }) => {
      expect(format2(input)).toBe(output);
    });

    test.each([
      { input: 0, output: '00' },
      { input: 3, output: '03' },
      { input: 10, output: '10' },
      { input: 21, output: '21' },
      { input: 99, output: '99' },
    ])('should return with lead zero: from $input to $output', ({ input, output }) => {
      expect(format2(input, true)).toBe(output);
    });
  });
});
