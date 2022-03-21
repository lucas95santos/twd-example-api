import { UserData, User } from '@/entities';

describe('User domain entity', () => {
  test('should not create user with invalid e-mail address', () => {
    const newUser: UserData = {
      email: 'invalid_mail',
      name: 'any_name',
    };

    const error = User.create(newUser).value as Error;
    expect(error.name).toBe('InvalidEmailError');
    expect(error.message).toEqual('Invalid email: ' + newUser.email + '.');
  });

  test('should not create user with invalid name (too few characters)', () => {
    const newUser: UserData = {
      email: 'invalid_mail',
      name: 'O      ',
    };

    const error = User.create(newUser).value as Error;
    expect(error.name).toBe('InvalidNameError');
    expect(error.message).toEqual('Invalid name: ' + newUser.name + '.');
  });

  test('should not create user with invalid name (too many characters)', () => {
    const newUser: UserData = {
      email: 'invalid_mail',
      name: 'O'.repeat(257),
    };

    const error = User.create(newUser).value as Error;
    expect(error.name).toBe('InvalidNameError');
    expect(error.message).toEqual('Invalid name: ' + newUser.name + '.');
  });

  test('should create user with valid data', () => {
    const newUser: UserData = {
      email: 'any@mail.com',
      name: 'any_name',
    };

    const user: User = User.create(newUser).value as User;

    expect(user.name.value).toEqual(newUser.name);
    expect(user.email.value).toEqual(newUser.email);
  });
});
