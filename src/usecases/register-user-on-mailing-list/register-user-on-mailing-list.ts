// entities
import { User, UserData } from '@/entities';
// errors
import { InvalidEmailError, InvalidNameError } from '@/entities/errors';
import { Either, left, right } from '@/shared';
import { UserRepository } from '@/usecases/register-user-on-mailing-list/ports';

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
