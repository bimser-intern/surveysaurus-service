FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json .
COPY . .
RUN  npm install && mkdir -p /usr/src/app
COPY . /usr/src/app
EXPOSE 5500
ENV NEO4J_HOST "neo4j+s://5c24c395.databases.neo4j.io"
ENV NEO4J_USERNAME neo4j
ENV NEO4J_USER_PASS G953J2dLebdoVKJgGIFyU-Dd0UryYrWcxCx5_HDWelU
ENV AURA_INSTANCENAME "SurveySaurus"
ENV PORT 5500
ENV JWT_SECRET_KEY "52df7dcbb32a39ac56f45831e5e00d254a95d3ed2d3b4298c6be448371be3d9e"
ENV JWT_EXPIRE "1209600000"
CMD npm start


