FROM node:12.13.1 as build-env
WORKDIR /src

ENV PATH /src/node_modules/.bin:$PATH
COPY ./package.json ./package.json
RUN npm install

COPY . .

EXPOSE 4200

CMD $(npm bin)/ng serve --configuration=production --host 0.0.0.0

# docker build -t upg-dashboard-website .
# docker run -d -p 4200:4200 --rm --name upg-dashboard-website upg-dashboard-website:latest
