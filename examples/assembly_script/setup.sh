#!/bin/bash

# SCRIPT_DIR is where this script is located from
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" > /dev/null && pwd )"
cd $SCRIPT_DIR

npm install

# Add directory where `asc` is installed to path - temporarily.
PATH=$SCRIPT_DIR/node_modules/.bin:$PATH