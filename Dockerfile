FROM node:20-bullseye

WORKDIR /usr/app

COPY ./ ./
RUN yarn install && yarn prepack

ENTRYPOINT [ "/entrypoint.sh" ]

COPY scripts/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
