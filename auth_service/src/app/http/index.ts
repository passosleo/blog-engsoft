export class Exception extends Error {
  public statusCode: HttpStatusCode;

  constructor(statusCode: keyof typeof HttpStatusCode, message: string) {
    super(message);
    this.statusCode = HttpStatusCode[statusCode];
  }
}

export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}

export const ResponseMessages = {
  /**
   * @openapi
   * components:
   *   schemas:
   *     SuccessDTO:
   *       type: object
   *       properties:
   *         status:
   *           type: number
   *           default: 200
   *         message:
   *           type: string
   *           default: Ok
   */
  [HttpStatusCode.OK]: 'OK',
  /**
   * @openapi
   * components:
   *   schemas:
   *     CreatedDTO:
   *       type: object
   *       properties:
   *         status:
   *           type: number
   *           default: 201
   *         message:
   *           type: string
   *           default: Created
   */
  [HttpStatusCode.CREATED]: 'Created',
  [HttpStatusCode.NO_CONTENT]: 'No Content',
  /**
   * @openapi
   * components:
   *   schemas:
   *     BadRequestDTO:
   *       type: object
   *       properties:
   *         status:
   *           type: number
   *           default: 400
   *         message:
   *           type: string
   *           default: Bad Request
   *         errors:
   *           type: array
   *           items:
   *             type: object
   *             properties:
   *               message:
   *                 type: string
   */
  [HttpStatusCode.BAD_REQUEST]: 'Bad Request',
  /**
   * @openapi
   * components:
   *   schemas:
   *     UnauthorizedDTO:
   *       type: object
   *       properties:
   *         status:
   *           type: number
   *           default: 401
   *         message:
   *           type: string
   *           default: Unauthorized
   *         errors:
   *           type: array
   *           items:
   *             type: object
   *             properties:
   *               message:
   *                 type: string
   */
  [HttpStatusCode.UNAUTHORIZED]: 'Unauthorized',
  /**
   * @openapi
   * components:
   *   schemas:
   *     ForbiddenDTO:
   *       type: object
   *       properties:
   *         status:
   *           type: number
   *           default: 403
   *         message:
   *           type: string
   *           default: Forbidden
   *         errors:
   *           type: array
   *           items:
   *             type: object
   *             properties:
   *               message:
   *                 type: string
   */
  [HttpStatusCode.FORBIDDEN]: 'Forbidden',
  /**
   * @openapi
   * components:
   *   schemas:
   *     NotFoundDTO:
   *       type: object
   *       properties:
   *         status:
   *           type: number
   *           default: 404
   *         message:
   *           type: string
   *           default: Not Found
   *         errors:
   *           type: array
   *           items:
   *             type: object
   *             properties:
   *               message:
   *                 type: string
   */
  [HttpStatusCode.NOT_FOUND]: 'Not Found',
  /**
   * @openapi
   * components:
   *   schemas:
   *     ConflictDTO:
   *       type: object
   *       properties:
   *         status:
   *           type: number
   *           default: 409
   *         message:
   *           type: string
   *           default: Conflict
   *         errors:
   *           type: array
   *           items:
   *             type: object
   *             properties:
   *               message:
   *                 type: string
   */
  [HttpStatusCode.CONFLICT]: 'Conflict',
  /**
   * @openapi
   * components:
   *   schemas:
   *     InternalServerErrorDTO:
   *       type: object
   *       properties:
   *         status:
   *           type: number
   *           default: 500
   *         message:
   *           type: string
   *           default: Internal Server Error
   *         errors:
   *           type: array
   *           items:
   *             type: object
   *             properties:
   *               message:
   *                 type: string
   */
  [HttpStatusCode.INTERNAL_SERVER_ERROR]: 'Internal Server Error',
};
