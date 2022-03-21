import {
  InvalidEmailError,
  InvalidNameError,
  User,
  UserData,
} from '../../entities';
import { Either, left, right } from '../../shared';
import { UserRepository } from './ports';

export class RegisterUserOnMailingList {
  private readonly userRepository: UserRepository;

  constructor(repository: UserRepository) {
    this.userRepository = repository;
  }

  async execute(
    user: UserData,
  ): Promise<Either<InvalidEmailError | InvalidNameError, UserData>> {
    const userOrError: Either<InvalidEmailError | InvalidNameError, User> =
      User.create(user);

    if (userOrError.isLeft()) return left(userOrError.value);

    if (!(await this.userRepository.exists(user))) {
      await this.userRepository.add(user);
    }

    return right(user);
  }
}
