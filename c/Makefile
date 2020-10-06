all: add.wasm factorial.wasm

%.wasm: %.c
	clang --target=wasm32 -nostdlib -Wl,--no-entry -Wl,--export-all -o $@ $<