use anyhow::Result;
use wasmtime::*;

fn main() -> Result<()> {

    let store = Store::default(); // A store is a collection of Wasm instances and host-defined items
    let module = Module::from_file(store.engine(), "../../../c/print_add.wasm")?; // Compiles the module

    // Create a function type for wasm module.
    // This maps onto our print function: Take one arg, and returns nothing
    let callback_print_type = FuncType::new(
        Box::new([ValType::I32]), // Takes in one argument
        Box::new([]) // Returns nothing
    );

    // Create the import function to pass to wasm module
    let callback_print_func = Func::new(&store, callback_print_type, |_, params, _results| {
        let addition = params[0].unwrap_i32();
        println!("> Result of the addition: {}", addition);
        Ok(())
    });

    // Prepare the imports object
    let imports = [callback_print_func.into()];

    // Instantiate module by giving it the store and the imports.
    let instance = Instance::new(&store, &module, &imports)?;

    // Extract the add and print function
    let add_and_print = instance
        .get_func("add_and_print")
        .ok_or(anyhow::format_err!("failed to find `add_and_print` function export"))?
        .get2::<i32, i32, ()>()?; // 2 params, no return value

    // Call exported function
    add_and_print(8,4)?;

    Ok(())
}