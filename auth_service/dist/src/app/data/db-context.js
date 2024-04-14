"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbContext = void 0;
const client_1 = require("@prisma/client");
const logger_plugin_1 = require("../plugins/logger.plugin");
class DbContext {
    static instance;
    connection;
    logger;
    constructor() {
        this.connection = new client_1.PrismaClient();
        this.logger = new logger_plugin_1.Logger({ context: 'db-context' });
    }
    static getInstance() {
        if (!DbContext.instance) {
            DbContext.instance = new DbContext();
        }
        return DbContext.instance;
    }
    static getConnection() {
        return DbContext.getInstance().connection;
    }
    static async checkConnection() {
        try {
            DbContext.getInstance().logger.info('Initializing database connection...');
            await DbContext.getConnection().$connect();
            DbContext.getInstance().logger.info('Database connection established');
        }
        catch (error) {
            DbContext.getInstance().logger.error('Database connection failed', error);
            process.exit(1);
        }
    }
}
exports.DbContext = DbContext;
