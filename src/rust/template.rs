
/*
    Template Bot for Rust Paint Bot

    Wasm exports required are:
        * init
        * update
        * getHeading
        * getColour
        * isPenDown
        * getLineWidth
        * isBotMoving
*/

pub struct Bot {
    heading : i32,
    pen_down : bool,
    colour : i32,
    line_width : i32,
    bot_moving : bool
}

impl Bot {

    pub fn do_something(&mut self) {
        // eg: self.heading = 90;
    }
}

// This is usually very bad practice in Rust. But in this context (compiling to WebAssembly, and single threaded)
// a global variable is an acceptable way to store the state of a struct for the duration of the programme.
static mut TEMPLATE_BOT : Bot = Bot {
    heading: 0, 
    pen_down: true, 
    colour : 0,
    line_width: 1, 
    bot_moving: true
};

#[no_mangle]
pub fn init(
    _spawn_x: i32,
    _spawn_y: i32,
    _canvas_width: i32,
    _canvas_height: i32) {
        // Call init on the Bot

        /*unsafe {
            TEMPLATE_BOT.heading = 90;
            TEMPLATE_BOT.line_width = 5;
            LEFT_BOT.pen_down = true;
            LEFT_BOT.bot_moving = true;
            LEFT_BOT.colour = 30556;
        }*/
}

#[no_mangle]
pub extern "C" fn update(
    _time: i32,
    _current_x: i32,
    _current_y: i32) {
    
    // Editing TEMPLATE_BOT must be put in an unsafe block or it won't compile 
    // even if in our scenario, it's not actually unsafe
    unsafe {
        TEMPLATE_BOT.do_something()
    }
}

#[no_mangle]
#[allow(non_snake_case)]
pub extern "C" fn getHeading() -> i32 {
    unsafe {
        TEMPLATE_BOT.heading
    }
}

#[no_mangle]
#[allow(non_snake_case)]
pub extern "C" fn getColour() -> i32 {
    unsafe {
        TEMPLATE_BOT.colour
    }
}

#[no_mangle]
#[allow(non_snake_case)]
pub extern "C" fn isPenDown() -> bool {
    unsafe {
        TEMPLATE_BOT.pen_down
    }
}

#[no_mangle]
#[allow(non_snake_case)]
pub extern "C" fn getLineWidth() -> i32 {
    unsafe {
        TEMPLATE_BOT.line_width
    }
}

#[no_mangle]
#[allow(non_snake_case)]
pub extern "C" fn isBotMoving() -> bool {
    unsafe {
        TEMPLATE_BOT.bot_moving
    }
}


