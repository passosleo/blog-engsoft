import bc from 'bcryptjs';

export class Helpers {
  static async hashPassword(password: string) {
    const salt = await bc.genSalt(10);
    return bc.hash(password, salt);
  }

  static async validateHashedPassword(password: string, hashedPassword: string) {
    return bc.compare(password, hashedPassword);
  }
}
