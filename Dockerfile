FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN apt-get update && apt-get -y dist-upgrade
RUN apt-get install -y mysql-server
ARG CACHEBUST=1
RUN /etc/init.d/mysql start && mysql -uroot mysql -e "UPDATE user SET Password=PASSWORD('root') where USER='root'; update user set authentication_string=password('root') where user='root'; update user set plugin='' where User='root';"

RUN npm install

COPY . .

ENV WP_ENVIRONMENT='development'
ENV WP_PORT=3000
ENV WP_COOKIE_DOMAIN='localhost'
ENV WP_APP_NAME='whitepanda'
ENV WP_COOKIE_SECRET='aa5298d3a3fe181a3a52d085ee1525df5asa498337f8f3b76ca7df0a5de3211b'
ENV MSG91_AUTH_KEY='303883A8nRvJvPg5dcd9833'
ENV MSG91_OTP_TEMPLATE='5dce45aed6fc054f945b773a'

EXPOSE 3000
EXPOSE 3306

RUN /etc/init.d/mysql start && node executables/createWhitepandaDatabase.js && node_modules/.bin/sequelize db:migrate

CMD ["/etc/init.d/mysql", "start"]
CMD [ "node", "./bin/www" ]