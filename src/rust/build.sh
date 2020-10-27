#!/bin/bash

#Examples to compile
EXAMPLES=(template)

for i in "${EXAMPLES[@]}"
do
   echo "Compiling $i"
    rustc --target wasm32-unknown-unknown -O --crate-type=cdylib $i.rs -o output/$i.wasm
done