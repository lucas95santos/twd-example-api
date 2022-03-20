import { UserData, InvalidEmailError, Email } from './';
import { Either, left, right } from '../shared';

export class User {
  static create(user: UserData): Either<InvalidEmailError, UserData> {
    const emailOrError = Email.create(user.email);

    if (emailOrError.isLeft()) return left(new InvalidEmailError());

    return right(user);
  }
}
