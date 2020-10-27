#!/bin/bash

#Bots to compile
EXAMPLES=(template)

for i in "${EXAMPLES[@]}"
do
   echo "Compiling $i"
   asc $i.ts -b output/$i.wasm -O3z --runtime=none  --noExportMemory
done