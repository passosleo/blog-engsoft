import { User } from '../../entities/user.entity';

/**
 * @openapi
 * components:
 *   schemas:
 *     AccountDTO:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         emailVerified:
 *           type: boolean
 *         isEnabled:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
export class AccountDTO implements Partial<User> {
  userId: string;
  name: string;
  email: string;
  emailVerified: boolean;
  isEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: AccountDTO) {
    this.userId = data.userId;
    this.name = data.name;
    this.email = data.email;
    this.emailVerified = data.emailVerified;
    this.isEnabled = data.isEnabled;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
