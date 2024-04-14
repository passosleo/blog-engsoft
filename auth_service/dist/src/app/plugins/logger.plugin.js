"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const log4js = __importStar(require("log4js"));
log4js.configure({
    appenders: {
        console: {
            type: 'console',
            layout: {
                type: 'pattern',
                pattern: '[%d{dd-MM-yyyy - hh:mm:ss.SSS}] [%p] %c - %m',
            },
        },
        file: {
            type: 'fileSync',
            filename: './logs/app.log',
            layout: {
                type: 'pattern',
                pattern: '[%d{dd-MM-yyyy - hh:mm:ss.SSS}] [%p] %c - %m',
            },
            maxLogSize: 10485760, // 10MB
            backups: 3,
        },
    },
    categories: {
        default: { appenders: ['console', 'file'], level: 'debug' },
    },
});
class Logger {
    logger;
    constructor({ context = 'default', level = 'debug' }) {
        this.logger = log4js.getLogger(context);
        this.logger.level = level;
    }
    debug(message, ...args) {
        this.logger.debug(message, ...args);
    }
    info(message, ...args) {
        this.logger.info(message, ...args);
    }
    warn(message, ...args) {
        this.logger.warn(message, ...args);
    }
    error(message, ...args) {
        this.logger.error(message, ...args);
    }
    trace(message, ...args) {
        this.logger.trace(message, ...args);
    }
}
exports.Logger = Logger;
