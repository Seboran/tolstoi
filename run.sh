#!/bin/bash

# Run Python application in the background
export FLASK_APP=app.py
python packages/backend/app.py &

# Run JavaScript application in the background
cd packages/frontend
bun dev &
cd -

# Wait for both applications to finish
wait