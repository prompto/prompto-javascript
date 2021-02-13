#!/bin/bash

# 'npm install webpack' will install webpack cmd in node_modules
yarn build
./copy_bundle_to_docs.sh
