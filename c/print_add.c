
/*
    Compile with:
    clang --target=wasm32 -nostdlib -Wl,--no-entry -Wl,--export-all -Wl,--allow-undefined -o print_add.wasm print_add.c

    --target=wasm32 is the target platform
    -nostdlib: do not link against a standard library
    -Wl : flags passed to the wasm linker
        --no-entry: there is no main function
        --export-all: all functions should be present in the exports of the wasm module
        --allow-undefined: do not dead-strip un-implemented code (needed for the imports)
*/


extern void print_result(int result); // Needs to be imported by wasm module

// The `add_and_print` function will be exported by the wasm module
void add_and_print(int x, int y)
{
    int result = x + y;
    print_result(result);
}