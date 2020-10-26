const fs = require('fs');

/*
    Node scsript to run the add.wasm module.
    Gives an example of how to load a wasm module into js.

    Usage: node simple_add.js <add.wasm file to run>
    By default it will pick "../../wat/add.wasm".
*/

var args = process.argv.slice(2);
let wasm_file;
if (args.length) {
    wasm_file = args[0]; // use file given on command line
} else {
    wasm_file = "../../wat/add.wasm"; // default add file to read
}

const bytes = fs.readFileSync(wasm_file);

(async () => { 
    let res = await WebAssembly.instantiate(bytes); // Instantiate the wasm module
    res = res.instance.exports; // Get its exports

    // Call the exported add function and return the result
    console.log("Adding 3 and 4 gives %i",  res.add(3, 4));
})(); 
