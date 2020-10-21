/*
    Node scsript to run the print_add.wasm module.
    Gives an example of how to: 
        - Create a wasm module and initialise its memory
        - Pass imports to wasm module
        - Call export on wasm module

    Usage: node print_add.js
*/

const fs = require('fs');
const bytes = fs.readFileSync('../../c/print_add.wasm');


(async () => { 

    // Create a memory object for the wasm module
    module_memory = new WebAssembly.Memory({initial: 256});

    // Create the import object. It needs:
    //  - the memory
    //  - Functions to import
    const importObject = {
        env: {
            __memory_base : 0,
            memory: module_memory,
            print_result: function(result) {
                console.log("Result of the addition: ", result);
            },
        }
    };

    let res = await WebAssembly.instantiate(bytes, importObject); // Instantiate the wasm module with the import Object
    res = res.instance.exports; // Get its exports

    res.add_and_print(3, 5);
})(); 
