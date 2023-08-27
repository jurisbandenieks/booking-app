FROM node:16-alpine
WORKDIR "/app"
COPY ./package.json ./
RUN npm install && npm run build
COPY ./dist ./dist
CMD ["npm", "run", "start"]
