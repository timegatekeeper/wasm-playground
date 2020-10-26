use std::env;
use anyhow::Result;
use wasmtime::*;

fn main() -> Result<()> {

    let mut args: Vec<String> = env::args().collect();
    args.remove(0);
    let wasm_file : &str;
    if args.len() > 0 {
        wasm_file = args[0].as_str();
    } else {
        wasm_file = "../../../wat/add.wasm"; // Default add wasm module to use
    }

    let store = Store::default(); // A store is a collection of Wasm instances and host-defined items
    let module = Module::from_file(store.engine(), wasm_file)?; // Compiles the module

    let imports = []; 
    let instance = Instance::new(&store, &module, &imports)?;  // Instantiate module by giving it the store and the imports.

    // Extract exported function
    let add = instance
        .get_func("add")
        .ok_or(anyhow::format_err!("failed to find `add` function export"))?
        .get2::<i32, i32, i32>()?; // get2 because 2 arguments. Then <i32, i32, i32> is type of the 2 args followed by type of the return val.

    // Call exported function
    println!("The result of 2 + 3 is {}", add(2, 3)?);

    Ok(())
}
