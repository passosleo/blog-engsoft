interface AppEnv {
  NODE_ENV: 'development' | 'production';
  HOST?: string;
  PORT?: string;
  NAME?: string;
  DATABASE_URL: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
}

declare namespace NodeJS {
  interface ProcessEnv extends AppEnv {}
}
