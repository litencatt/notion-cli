FROM node:20-bullseye as desp-stage

WORKDIR /app

COPY ./package.json ./yarn.lock ./
RUN yarn install --production --no-progress

FROM node:20-bullseye as build-stage

WORKDIR /work
COPY . /work/

RUN yarn install --no-progress
RUN yarn build

FROM node:20-bullseye-slim as runtime-stage

ENV LANG C.UTF-8
ENV TZ Asia/Tokyo

WORKDIR /app

COPY ./package.json ./yarn.lock ./
COPY --from=desp-stage /app/node_modules ./node_modules
COPY --from=build-stage /work/dist ./dist
COPY --from=build-stage /work/bin ./bin

ENTRYPOINT [ "/entrypoint.sh" ]

COPY scripts/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
