# WAT examples

Simple examples to demonstrate how to compile to WebAssembly from WAT, which is the WebAssembly text format.

## Build

To build from wat, you need a converter tool. We've included the `wat2wasm` executable in the tools folder. 

Simply type: 
```bash
$ wat2wasm -o add.wasm add.wat
```

We also provided the `wasm2wat` tool, which goes the other way, and is a useful tool to inspect things like the imports and exports of the wasm module.

For more information on these tools or if you wanted to compile them from source, you can go to the [Wasm Binary toolkit repo](https://github.com/WebAssembly/wabt). It contains a bunch of other clever tools for handling wasm modules.