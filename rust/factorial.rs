#[no_mangle]
pub extern "C" fn factorial(x: i32) -> i32 {
    if x == 0 {
        return 1;
    } else {
        return x*factorial(x-1);
    }
}