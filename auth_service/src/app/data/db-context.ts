import { PrismaClient } from '@prisma/client';
import { ILogger, Logger } from '../plugins/logger.plugin';

export class DbContext {
  private static instance: DbContext;
  private readonly connection: PrismaClient;
  private readonly logger: ILogger;

  private constructor() {
    this.connection = new PrismaClient();
    this.logger = new Logger({ context: 'db-context' });
  }

  public static getInstance(): DbContext {
    if (!DbContext.instance) {
      DbContext.instance = new DbContext();
    }
    return DbContext.instance;
  }

  public static getConnection(): PrismaClient {
    return DbContext.getInstance().connection;
  }

  public static async checkConnection(): Promise<void> {
    try {
      DbContext.getInstance().logger.info(
        'Initializing database connection...',
      );
      await DbContext.getConnection().$connect();
      DbContext.getInstance().logger.info('Database connection established');
    } catch (error: any) {
      DbContext.getInstance().logger.error('Database connection failed', error);
      process.exit(1);
    }
  }
}
