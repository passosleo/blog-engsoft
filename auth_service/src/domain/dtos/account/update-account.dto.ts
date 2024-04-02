import { User } from '../../entities/user.entity';

/**
 * @openapi
 * components:
 *   schemas:
 *    UpdateAccountDTO:
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *          minLength: 3
 *          maxLength: 50
 *          required: false
 *        name:
 *          type: string
 *          minLength: 3
 *          maxLength: 50
 *          required: false
 *        email:
 *          type: string
 *          format: email
 *          maxLength: 255
 *          required: false
 */
export class UpdateAccountDTO implements Partial<User> {
  username: string;
  name: string;
  email: string;

  constructor(data: UpdateAccountDTO) {
    this.username = data.username;
    this.name = data.name;
    this.email = data.email;
  }
}
