import { left } from '../../src/shared';
import {
  UserData,
  User,
  InvalidEmailError,
  InvalidNameError,
} from '../../src/entities';

describe('User domain entity', () => {
  test('should not create user with invalid e-mail address', () => {
    const newUser: UserData = {
      email: 'invalid_mail',
      name: 'any_name',
    };

    const error = User.create(newUser);
    expect(error).toEqual(left(new InvalidEmailError(newUser.email)));
  });

  test('should not create user with invalid name (too few characters)', () => {
    const newUser: UserData = {
      email: 'invalid_mail',
      name: 'O      ',
    };

    const error = User.create(newUser);
    expect(error).toEqual(left(new InvalidNameError(newUser.name)));
  });
});
