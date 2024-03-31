import 'dotenv/config';
import { name } from '../../package.json';

// @ts-ignore
function requiredEnv(env: keyof AppEnv) {
  const value = process.env[String(env)];
  if (!value) {
    console.error(`Required environment variable "${String(env)}" is missing.`);
    process.exit(1);
  }
  return value;
}

function getBaseUrl() {
  if (appConfig.host.startsWith('http://localhost')) {
    return `${appConfig.host}:${appConfig.port}`;
  } else {
    return appConfig.host;
  }
}

const appConfig = {
  name: process.env.NAME || name,
  host:
    process.env.NODE_ENV === 'production'
      ? requiredEnv('HOST')
      : process.env.HOST || 'http://localhost',
  port: process.env.PORT || 3000,
  environment: process.env.NODE_ENV || 'development',
};

export const config = {
  app: {
    ...appConfig,
    baseUrl: getBaseUrl(),
  },
  db: {
    url: requiredEnv('DATABASE_URL'),
  },
  mail: {
    host: requiredEnv('MAIL_HOST'),
    port: requiredEnv('MAIL_PORT'),
    user: requiredEnv('MAIL_USER'),
    password: requiredEnv('MAIL_PASSWORD'),
  },
  cloudinary: {
    cloudName: requiredEnv('CLOUDINARY_CLOUD_NAME'),
    apiKey: requiredEnv('CLOUDINARY_API_KEY'),
    apiSecret: requiredEnv('CLOUDINARY_API_SECRET'),
  },
  jwt: {
    secret: requiredEnv('JWT_SECRET'),
    expiresIn: requiredEnv('JWT_EXPIRES_IN'),
  },
  redirects: {
    recoverPassword: requiredEnv('REDIRECT_RECOVER_PASSWORD'),
    verifyEmail: requiredEnv('REDIRECT_VERIFY_EMAIL'),
  },
};
