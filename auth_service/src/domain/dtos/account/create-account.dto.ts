import { User } from '../../entities/user.entity';

/**
 * @openapi
 * components:
 *   schemas:
 *    CreateAccountDTO:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          minLength: 3
 *          maxLength: 50
 *          required: true
 *        email:
 *          type: string
 *          format: email
 *          maxLength: 255
 *          required: true
 *        password:
 *          type: string
 *          minLength: 8
 *          maxLength: 255
 *          required: true
 */
export class CreateAccountDTO implements Partial<User> {
  name: string;
  email: string;
  password: string;

  constructor(data: CreateAccountDTO) {
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
  }
}
