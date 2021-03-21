import { BadRequestException } from '@nestjs/common';
import { MyValidationPipe } from '../src/pipes/MyValidator';

describe('MyValidationPipe test', () => {
  it('MyValidationPipe test', async () => {
    const myValidationPipe = new MyValidationPipe();
    expect(async () => {
      await myValidationPipe.transform('', {
        type: 'custom',
        metatype: undefined,
        data: undefined,
      });
    }).rejects.toThrow(BadRequestException);
    expect(async () => {
      await myValidationPipe.transform(null, {
        type: 'custom',
        metatype: undefined,
        data: undefined,
      });
    }).rejects.toThrow(BadRequestException);
    expect(async () => {
      await myValidationPipe.transform(undefined, {
        type: 'custom',
        metatype: undefined,
        data: undefined,
      });
    }).rejects.toThrow(BadRequestException);

    expect(
      await myValidationPipe.transform('value', {
        type: 'custom',
        metatype: undefined,
        data: undefined,
      }),
    ).toBe('value');
  });
});
