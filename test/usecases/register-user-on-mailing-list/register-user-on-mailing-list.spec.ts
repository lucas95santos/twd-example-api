import { RegisterUserOnMailingList } from '../../../src/usecases/register-user-on-mailing-list/register-user-on-mailing-list';
import {
  InvalidEmailError,
  InvalidNameError,
  UserData,
} from '../../../src/entities';
import { UserRepository } from '../../../src/usecases/register-user-on-mailing-list/ports';
import { InMemoryUserRepository } from '../../../src/usecases/register-user-on-mailing-list/repository';
import { left } from '../../../src/shared';

describe('Register user on mailing list use case', () => {
  test('should add user with complete data to mailing list', async () => {
    const users: UserData[] = [];
    const repository: UserRepository = new InMemoryUserRepository(users);
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(
      repository,
    );
    const newUser: UserData = {
      name: 'any_name',
      email: 'any@email.com',
    };

    const usecaseResponse = await usecase.execute(newUser);
    const user = await repository.findUserByEmail(newUser.email);

    expect(user?.name).toBe(newUser.name);
    expect(usecaseResponse.value.name).toBe(newUser.name);
  });

  test('should not add user with invalid email to mailing list', async () => {
    const users: UserData[] = [];
    const repository: UserRepository = new InMemoryUserRepository(users);
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(
      repository,
    );
    const newUser: UserData = {
      name: 'any_name',
      email: 'invalid_mail',
    };

    const usecaseResponse = await usecase.execute(newUser);
    const user = await repository.findUserByEmail(newUser.email);

    expect(user).toBeNull();
    expect(usecaseResponse).toEqual(left(new InvalidEmailError(newUser.email)));
  });

  test('should not add user with invalid name to mailing list', async () => {
    const users: UserData[] = [];
    const repository: UserRepository = new InMemoryUserRepository(users);
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(
      repository,
    );
    const newUser: UserData = {
      name: '',
      email: 'any@mail.com',
    };

    const usecaseResponse = await usecase.execute(newUser);
    const user = await repository.findUserByEmail(newUser.email);

    expect(user).toBeNull();
    expect(usecaseResponse).toEqual(left(new InvalidNameError(newUser.name)));
  });
});
