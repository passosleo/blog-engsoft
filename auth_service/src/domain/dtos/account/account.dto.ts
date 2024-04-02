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
 *         username:
 *           type: string
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
  username: string;
  name: string;
  email: string;
  emailVerified: boolean;
  isEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: AccountDTO) {
    this.userId = data.userId;
    this.email = data.email;
    this.emailVerified = data.emailVerified;
    this.name = data.name;
    this.username = data.username;
    this.isEnabled = data.isEnabled;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
