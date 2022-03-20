import { UserData, User } from '../../src/entities';

describe('User domain entity', () => {
  test('should not create user with invalid e-mail address', () => {
    const newUser: UserData = {
      email: 'indalid@mail.com',
      name: 'any_name',
    };

    const error = User.create(newUser);
  });
});
