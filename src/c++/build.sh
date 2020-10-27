#!/bin/bash

# Bots to compile
BOTS=(template spiral)

for i in "${BOTS[@]}"
do
   echo "Compiling $i"
   clang++ --target=wasm32 -nostdlib -Wl,--no-entry -Wl,--export-all -Wl,--allow-undefined -o output/$i.wasm $i.cpp
done