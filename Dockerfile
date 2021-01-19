FROM node:lts-alpine

# RUN apk add --update npm

# WORKDIR /tmp/builder

# COPY . .

# RUN npm install

# RUN npm run build

# RUN mv ./dist/* /usr/share/nginx/html/dist

# RUN mv ./server.js /usr/share/nginx/html/server.js

# RUN mv ./uploads /usr/share/nginx/html/uploads

# RUN rm -rf /tmp/builder

# RUN apk del npm

WORKDIR /usr/share/nginx/html

COPY . .

CMD [ "node", "server.js" ]

EXPOSE 3000
