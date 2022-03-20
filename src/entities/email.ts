export class Email {
  static validate(email: string): boolean {
    // check if email is empty
    if (!email) return false;

    // check if email contain @ char
    if (!email.includes('@')) return false;

    const [localPart, domain] = email.split('@');

    // check if email local part is smaller or equal than 64 chars
    if (localPart.length > 64) return false;

    // check if email domain is smaller or equal than 255 chars
    if (domain.length > 255) return false;

    // check if email length is smaller or equal than 320 chars
    if (email.length > 320) return false;

    return true;
  }
}
