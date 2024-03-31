import fs from 'fs-extra';
import packageJson from './package.json';

fs.copySync('src/app/views', 'dist/src/app/views');
fs.copySync('public', 'dist/public');
fs.mkdirpSync('dist/uploads/avatars');
fs.mkdirpSync('dist/prisma');
fs.copySync('prisma/schema.prisma', 'dist/prisma/schema.prisma');
fs.copySync('Dockerfile', 'dist/Dockerfile');

packageJson.scripts.start = 'node src/app/server.js';

fs.writeFileSync('dist/package.json', JSON.stringify(packageJson));
