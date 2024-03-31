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
  [HttpStatusCode.OK]: 'OK',
  [HttpStatusCode.CREATED]: 'Created',
  [HttpStatusCode.NO_CONTENT]: 'No Content',
  [HttpStatusCode.BAD_REQUEST]: 'Bad Request',
  [HttpStatusCode.UNAUTHORIZED]: 'Unauthorized',
  [HttpStatusCode.FORBIDDEN]: 'Forbidden',
  [HttpStatusCode.NOT_FOUND]: 'Not Found',
  [HttpStatusCode.CONFLICT]: 'Conflict',
  [HttpStatusCode.INTERNAL_SERVER_ERROR]: 'Internal Server Error',
};

export class Exception extends Error {
  public statusCode: HttpStatusCode;

  constructor(statusCode: HttpStatusCode, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}
