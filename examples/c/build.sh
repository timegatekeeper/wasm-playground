#!/bin/bash

#Examples to compile
EXAMPLES=(add factorial print_add)

for i in "${EXAMPLES[@]}"
do
   echo "Compiling $i"
   clang --target=wasm32 -nostdlib -Wl,--no-entry -Wl,--export-all -Wl,--allow-undefined -o $i.wasm $i.c
done