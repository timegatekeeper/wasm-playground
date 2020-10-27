/*
    Template Bot for Assembly Script Paint Bot

    Wasm exports required are:
        * init
        * update
        * getHeading
        * getColour
        * isPenDown
        * getLineWidth
        * isBotMoving
*/


class Bot {

heading: i32;
colour: i32;
penDown: bool;
lineWidth: i32;
moving: true;

constructor() {
    this.heading = 0;
    this.colour = 0;
    this.penDown = true;
    this.lineWidth = 1;
    this.moving = true;
}

}

let leftBot = new Bot();

/* Wasm export required */
export function init(
    spawnX: i32,
    spawnY: i32,
    spawnColour: i32,
    canvasWidth: i32,
    canvasHeight: i32 
    ): void {

    // Initialise bot state here 
   
}

/* Wasm export required */
export function update(
    time: i32,
    currentX: i32,
    currentY: i32,
    ): void {
    
    // You update logic goes here

}

/* Wasm export required */
export function getHeading(): i32{
    return leftBot.heading;
}

/* Wasm export required */
export function getColour(): i32 {
    return leftBot.colour;
}

/* Wasm export required */
export function isPenDown(): bool {
    return leftBot.penDown;
}

/* Wasm export required */
export function getLineWidth(): i32 {
    return leftBot.lineWidth;
}

/* Wasm export required */
export function isBotMoving(): bool {
    return leftBot.moving;
}