all: add.wasm factorial.wasm

%.wasm: %.ts
	asc $< -b $@ -O3z --runtime=none  --noExportMemory