import { Either, right, left } from '@/shared';
import { InvalidEmailError } from '@/entities/errors';

const EMAIL_FORMAT =
  /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

export class Email {
  public readonly value: string;

  private constructor(email: string) {
    this.value = email;
  }

  public static create(email: string): Either<InvalidEmailError, Email> {
    if (Email.validate(email)) {
      return right(new Email(email));
    }

    return left(new InvalidEmailError(email));
  }

  static validate(email: string): boolean {
    // check if email is empty
    if (!email) return false;

    const [localPart, domain] = email.split('@');

    // check email local part
    if (!localPart || localPart.length > 64) return false;

    // check email domain
    if (!domain || domain.length > 255) return false;

    const domainParts = domain.split('.');
    if (domainParts.some((part) => part.length > 63)) return false;

    // check if email length is smaller or equal than 320 chars
    if (email.length > 320) return false;

    // check email valid chars
    if (!EMAIL_FORMAT.test(email)) return false;

    return true;
  }
}
