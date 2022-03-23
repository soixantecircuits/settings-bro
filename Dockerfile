ARG CODE_VERSION=8.9.1-alpine
FROM node:${CODE_VERSION}
LABEL maintainer="Valeriu Stinca <ts@strat.zone>"
LABEL version="0.0.1-beta"
LABEL vendor="Strategic Zone"
LABEL release-date="2022-03-14"

WORKDIR /app
COPY ./ ./
RUN npm install
CMD [ "npm", "start" ]
# ENTRYPOINT ["echo", "your command here!"]