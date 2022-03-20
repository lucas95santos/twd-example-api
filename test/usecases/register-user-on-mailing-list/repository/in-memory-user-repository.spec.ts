import { UserData } from '../../../../src/entities';
import { InMemoryUserRepository } from '../../../../src/usecases/register-user-on-mailing-list/repository';

describe('In memory User Repository', () => {
  test('should return null if user is not found', async () => {
    const users: UserData[] = [];
    const userRepository = new InMemoryUserRepository(users);

    const user = await userRepository.findUserByEmail('any@mail.com');
    expect(user).toBeNull();
  });

  test('should return user if it is found in the repository', async () => {
    const users: UserData[] = [];
    const userRepository = new InMemoryUserRepository(users);

    const newUser: UserData = {
      name: 'any_name',
      email: 'any@mail.com',
    };

    await userRepository.add(newUser);

    const user = await userRepository.findUserByEmail('any@mail.com');
    expect(user?.name).toBe(newUser.name);
  });

  test('should return all users in the repository', async () => {
    const users: UserData[] = [
      { name: 'any_name', email: 'any@mail.com' },
      { name: 'second_name', email: 'second@mail.com' },
    ];

    const userRepository = new InMemoryUserRepository(users);
    const returnedUsers = await userRepository.findAllUsers();
    expect(returnedUsers.length).toBe(2);
  });
});
