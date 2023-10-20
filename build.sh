#!/bin/bash

npm run build

sed -i '//_nuxt/builds/*/d' ./dist/_routes.json