all: add.wasm factorial.wasm

%.wasm: %.rs
	rustc --target wasm32-unknown-unknown -O --crate-type=cdylib $< -o $@