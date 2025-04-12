#!/bin/bash

if [ -z "$1" ]; then
  echo "Error: Remote server address required as first argument"
  echo "Usage: $0 <user@server>"
  exit 1
fi

pnpm i --ignore-scripts
pnpm -C apps/nirina-site run astro build # import environment variable for runtime server
rm -rf deploy/nirina-site
pnpm --filter=nirina-site deploy ./deploy/nirina-site
echo "Deploying to $1"
rsync -rlz --delete deploy/nirina-site/ $1:/app/nirina-site
echo "Copying .env file to remote server"
rsync -z .env.runtime $1:/app/nirina-site/.env
