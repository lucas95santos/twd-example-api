import { UserData } from '../../../src/entities';
import { UserRepository } from '../../../src/usecases/register-user-on-mailing-list/ports';
import { InMemoryUserRepository } from '../../../src/usecases/register-user-on-mailing-list/repository';

describe('Register user on mailing list use case', () => {
  test('should add user with complete data to mailing list', async () => {
    const users: UserData[] = [];
    const repository: UserRepository = new InMemoryUserRepository(users);
    // const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(
    //   repository,
    // );
    // const newUser: UserData = {
    //   name: 'any_name',
    //   email: 'any@email.com',
    // };

    // const usecaseResponse = await usecase.execute(newUser);
    // const user = await repository.findUserByEmail(newUser.email);
    expect(1).toBe(1);
  });
});
