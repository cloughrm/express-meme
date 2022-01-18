FROM ubuntu:20.04

RUN apt-get update
RUN DEBIAN_FRONTEND=noninteractive TZ=Etc/UTC apt-get -y install tzdata

RUN apt-get install -y curl

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -

RUN apt-get install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev nodejs git

WORKDIR "/opt/"

RUN git clone https://github.com/cloughrm/express-meme.git

WORKDIR "/opt/express-meme/"

RUN npm i

ENTRYPOINT node app.js
