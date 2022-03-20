import { UserData, InvalidEmailError, InvalidNameError, Email, Name } from './';
import { Either, left, right } from '../shared';

export class User {
  static create(
    user: UserData,
  ): Either<InvalidEmailError | InvalidNameError, UserData> {
    const nameOrError = Name.create(user.name);

    if (nameOrError.isLeft()) return left(nameOrError.value);

    const emailOrError = Email.create(user.email);

    if (emailOrError.isLeft()) return left(emailOrError.value);

    return right(user);
  }
}
