# Assembly Script examples

Simple examples to demonstrate how to compile to WebAssembly from Assembly Script code.

## Setup

You will need:

* Node.js 
* NPM (reccomended using node version manager + installing 12.0)

Then type:
```bash
$ npm init
$ npm install --save @assemblyscript/loader
$ npm install --save-dev assemblyscript
```
## Build

To build, we use the assembly script compiler `asc`: 

```bash
$ asc add.ts -b add.wasm -O3z --runtime=none  --noExportMemory
```

We've provided a `build.sh` helper script if you don't want to type out the whole command each time.
