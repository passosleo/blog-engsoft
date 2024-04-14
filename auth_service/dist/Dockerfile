FROM node:lts-alpine3.19

# Set timezone
ENV TZ="Brazil/East"

WORKDIR /app
COPY package*.json ./

RUN npm install --production

COPY ./ ./

RUN npx prisma generate

EXPOSE 3000

# Start the API
ENTRYPOINT ["npm", "start"]

