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
});
