// entities
import { UserData, Email, Name } from '@/entities';
// errors
import { InvalidEmailError, InvalidNameError } from '@/entities/errors';
// shared
import { Either, left, right } from '@/shared';

export class User {
  public readonly name: Name;
  public readonly email: Email;

  private constructor(name: Name, email: Email) {
    this.name = name;
    this.email = email;
  }

  static create(
    user: UserData,
  ): Either<InvalidEmailError | InvalidNameError, User> {
    const nameOrError = Name.create(user.name);

    if (nameOrError.isLeft()) return left(nameOrError.value);

    const emailOrError = Email.create(user.email);

    if (emailOrError.isLeft()) return left(emailOrError.value);

    const name: Name = nameOrError.value as Name;
    const email: Email = emailOrError.value as Email;

    return right(new User(name, email));
  }
}
