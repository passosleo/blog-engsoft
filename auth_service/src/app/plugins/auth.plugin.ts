import jwt from 'jsonwebtoken';
import { config } from '../../config/app.config';

export interface GenerateTokenOptions<T extends string | object | Buffer> {
  payload: T;
}

export interface IAuthPlugin {
  generateToken<T extends string | object | Buffer>(
    options: GenerateTokenOptions<T>,
  ): Promise<string>;
  verifyToken<T>(token: string): Promise<T>;
}

export class AuthPlugin implements IAuthPlugin {
  async generateToken<T extends string | object | Buffer>({
    payload,
  }: GenerateTokenOptions<T>) {
    return jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    });
  }

  async verifyToken<T>(token: string): Promise<T> {
    return jwt.verify(token, config.jwt.secret) as T;
  }
}
