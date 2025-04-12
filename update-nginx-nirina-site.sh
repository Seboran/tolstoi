#!/bin/bash

if [ -z "$1" ]; then
  echo "Error: Remote server address required as first argument"
  echo "Usage: $0 <user@server>"
  exit 1
fi

echo "Copying nginx config to remote server"
rsync -z apps/nirina-site/nginx/nginx.conf $1:/etc/nginx/sites-available/nirina-site.conf
