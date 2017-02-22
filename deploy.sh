#!/bin/bash

# Can only deploy if repository is in a clean state.
if [[ -n $(git status --porcelain) ]]; then
  echo "You have uncommited changes. Please fix before deploying."
  exit 1
fi

# Run the build.
npm run build-prod

# Check that the build was successful.
if [ $? -ne 0 ]; then
  echo "There was an error running the build."
  exit 1
fi

# Make the package.
deploy_version="$(git rev-parse HEAD)"
zip -r .artifact.zip . -i app.js -i package.json -i src/\* -i public/\* build/\*

# Check making the package was successful.
if [ $? -ne 0 ]; then
  echo "There was an error making the package."
  exit 1
fi

# Deploy.
# TODO: Check that it is deploying the zipped artifact and not just everything.
eb deploy -l ${deploy_version}

# Check making the deploy was successful.
if [ $? -ne 0 ]; then
  echo "There was an error during the deploy."
  exit 1
fi

rm .artifact.zip
