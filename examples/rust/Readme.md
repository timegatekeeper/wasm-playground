# Rust examples

Simple examples to demonstrate how to compile to WebAssembly from Rust code.

## Setup

You must first ensure that you have the rust toolchain installed. Either run `./setup.sh` or go through all the steps yourself:

Install the `rustup` toolchain:
```bash
$ curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

See [here](https://www.rust-lang.org/learn/get-started) for more details.

Ensure the tooling is up to date:
```bash
$ rustup update
```

And add WebAssembly as a target:
``` bash 
$ rustup target add wasm32-unknown-unknown
```

## Build

To build, we use the rust compiler `rustc`, with wasm as a target:

```bash
$ rustc --target wasm32-unknown-unknown -O --crate-type=cdylib add.rs -o add.wasm
```

We've provided a `build.sh` helper script if you don't want to type out the whole command each time.
