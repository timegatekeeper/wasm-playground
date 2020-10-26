# C examples

Simple examples to demonstrate how to compile to WebAssembly from C code.

## Setup

You must have llvm and clang installed: this compiler supports wasm32 as a target.

If you are on a mac, you can get the latest version of LLVM (and clang) by typing: 
```bash
$ brew install llvm
```

If you are on linux, you *should* have these tools already installed.


## Build

To build, we invoke clang, with wasm as a target:

```bash
$ 	clang --target=wasm32 -nostdlib \
            -Wl,--no-entry \
            -Wl,--export-all \
            -Wl,--allow-undefined \
        -o add.wasm add.c
```

Here, `--target=wasm32` says that our target is a wasm module, and `-nostdlib` means that we are not linking against a standard library.
`-Wl` are the flags passed to the wasm linker: 
* `--no-entry`: there is no main function
* `--export-all`: all functions should be present in the exports of the wasm module.
* `--allow-undefined`: do not dead-strip un-implemented code (needed for the imports)

We've provided a `build.sh` helper script if you don't want to type out the whole command each time.