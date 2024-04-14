import { User } from '../../entities/user.entity';

/**
 * @openapi
 * components:
 *   schemas:
 *    UpdateAccountDTO:
 *      type: object
 *      properties:
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
  name: string;
  email: string;

  constructor(data: UpdateAccountDTO) {
    this.name = data.name;
    this.email = data.email;
  }
}
