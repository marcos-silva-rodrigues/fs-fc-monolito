FROM node:22-alpine

WORKDIR /home/app

# COPY package*.json .

# RUN npm install

CMD [ "tail", "-f", "/dev/null" ]
