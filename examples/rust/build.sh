#!/bin/bash

#Examples to compile
EXAMPLES=(add factorial)

for i in "${EXAMPLES[@]}"
do
   echo "Compiling $i"
    rustc --target wasm32-unknown-unknown -O --crate-type=cdylib $i.rs -o $i.wasm
done