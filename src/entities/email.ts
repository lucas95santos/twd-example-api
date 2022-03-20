export class Email {
  static validate(email: string): boolean {
    // check if email is empty
    if (!email) return false;

    // check if email contain @ char
    if (!email.includes('@')) return false;

    const [localPart] = email.split('@');

    // check if email local part is smaller than 64 chars
    if (localPart.length > 64) return false;

    return true;
  }
}
