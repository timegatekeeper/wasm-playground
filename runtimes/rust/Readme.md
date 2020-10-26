# Load wasm modules in a rust runtime


There are a number of rust based wasm runtimes which can be embedded in a rust projects. Such as:
* [wasmtime](https://github.com/bytecodealliance/wasmtime)
* [wasmer](https://github.com/wasmerio/wasmer)

This example uses `wasmtime`. It is pulled in as a dependency in `cargo.toml` and imported into `src/main.rs`.

To run:
1. Ensure you have the `cargo` and the rust toolchain installed. See the [installation guide](https://www.rust-lang.org/tools/install)
2. Type:

```bash
$ cargo run
```