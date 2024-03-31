interface AppEnv {
  NODE_ENV: 'development' | 'production';
  HOST?: string;
  PORT?: string;
  NAME?: string;
  DATABASE_URL: string;
  MAIL_HOST: string;
  MAIL_PORT: string;
  MAIL_USER: string;
  MAIL_PASSWORD: string;
  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  ISGD_API_URL?: string;
  REDIRECT_RECOVER_PASSWORD: string;
  REDIRECT_VERIFY_EMAIL: string;
}

declare namespace NodeJS {
  interface ProcessEnv extends AppEnv {}
}
