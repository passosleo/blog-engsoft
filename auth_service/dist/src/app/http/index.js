"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseMessages = exports.HttpStatusCode = exports.Exception = void 0;
class Exception extends Error {
    statusCode;
    constructor(statusCode, message) {
        super(message);
        this.statusCode = HttpStatusCode[statusCode];
    }
}
exports.Exception = Exception;
var HttpStatusCode;
(function (HttpStatusCode) {
    HttpStatusCode[HttpStatusCode["OK"] = 200] = "OK";
    HttpStatusCode[HttpStatusCode["CREATED"] = 201] = "CREATED";
    HttpStatusCode[HttpStatusCode["NO_CONTENT"] = 204] = "NO_CONTENT";
    HttpStatusCode[HttpStatusCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpStatusCode[HttpStatusCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HttpStatusCode[HttpStatusCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    HttpStatusCode[HttpStatusCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpStatusCode[HttpStatusCode["CONFLICT"] = 409] = "CONFLICT";
    HttpStatusCode[HttpStatusCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(HttpStatusCode || (exports.HttpStatusCode = HttpStatusCode = {}));
exports.ResponseMessages = {
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
