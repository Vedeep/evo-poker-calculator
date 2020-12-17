#!/bin/bash

# install nodejs
apt-get update
apt-get -q -y install curl zip unzip git
curl -s https://deb.nodesource.com/setup_14.x | bash
apt-get -q -y install nodejs

# build app
npm install --production=false
npm run build
