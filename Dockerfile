FROM node:16-alpine
WORKDIR /srv/app
COPY . .
RUN npm install
EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "index.js"]