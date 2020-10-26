rustc --target wasm32-unknown-unknown -O --crate-type=cdylib add.rs -o add.wasm
rustc --target wasm32-unknown-unknown -O --crate-type=cdylib factorial.rs -o factorial.wasm