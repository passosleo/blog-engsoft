/**
 * @openapi
 * components:
 *   schemas:
 *     AuthenticationDTO:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           example: Bearer
 *         token:
 *           type: string
 */
export class AuthenticationDTO {
  type: 'Bearer';
  token: string;

  constructor(data: AuthenticationDTO) {
    this.type = data.type;
    this.token = data.token;
  }
}
