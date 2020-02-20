#!/usr/bin/env sh

echo "Linting projects..."
# Add projects to lint here
./node_modules/.bin/ng lint template-manager

echo "Building projects..."
# Add projects to build here
./node_modules/.bin/ng build template-manager
