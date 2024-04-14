import { User } from '../../entities/user.entity';

/**
 * @openapi
 * components:
 *   schemas:
 *     CredentialsDTO:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           minLength: 8
 */
export class CredentialsDTO implements Partial<User> {
  email: string;
  password: string;

  constructor(data: CredentialsDTO) {
    this.email = data.email;
    this.password = data.password;
  }
}
