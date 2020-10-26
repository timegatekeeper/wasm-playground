all: wallfollower.wasm spiral.wasm house.wasm

%.wasm: %.c
	clang --target=wasm32 -nostdlib -Wl,--no-entry -Wl,--export-all -Wl,--allow-undefined -o $@ $<