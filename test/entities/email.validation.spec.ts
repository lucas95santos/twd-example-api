import { Email } from '../../src/entities';

describe('Email validation', () => {
  test('should not accept empty strings', () => {
    const email = '';
    expect(Email.validate(email)).toBeFalsy();
  });

  test('should accept valid email', () => {
    const email = 'any@mail.com';
    expect(Email.validate(email)).toBeTruthy();
  });

  test('should not accept email without @', () => {
    const email = 'anymail.com';
    expect(Email.validate(email)).toBeFalsy();
  });

  test('should not accept local part larger than 64 chars', () => {
    const email = 'l'.repeat(65) + '@mail.com';
    expect(Email.validate(email)).toBeFalsy();
  });
});