export class Email {
  static validate(email: string): boolean {
    // check if email is empty
    if (!email) return false;

    // check if email contain @ char
    if (!email.includes('@')) return false;

    return true;
  }
}
