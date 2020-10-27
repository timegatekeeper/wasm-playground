# Assembly Script examples

Simple examples to demonstrate how to compile to WebAssembly from Assembly Script code.

## Setup

You will need:

* Node.js 
* NPM (reccomended using node version manager + installing 12.0)

To install the assembly script compiler `asc`, call the `setup.sh` script that we've provided for you.

This should:
* download the npm modules required
* put `asc` into your path (only for your current terminal session).

## Build

To build, we use the assembly script compiler `asc`: 

```bash
$ asc add.ts -b add.wasm -O3z --runtime=none  --noExportMemory
```

We've provided a `build.sh` helper script if you don't want to type out the whole command each time.
