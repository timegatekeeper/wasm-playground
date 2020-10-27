#!/bin/bash

#Examples to compile
EXAMPLES=(add factorial)

for i in "${EXAMPLES[@]}"
do
   echo "Compiling $i"
   asc $i.ts -b $i.wasm -O3z --runtime=none  --noExportMemory
done