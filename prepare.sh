#!/bin/bash
apt install nodejs
apt install npm
npm install --production=false
npm run build
