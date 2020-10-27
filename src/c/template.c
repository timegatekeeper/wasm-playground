/*
    Template Bot for C Paint Bot

    Wasm exports required are:
        * init
        * update
    The rest are included in bot.h - You therefore only need to implement init and update, and include bot.h
        * getHeading
        * getColour
        * isPenDown
        * getLineWidth
        * isBotMoving
*/

#include "bot.h"

/* 
    wasm export 
    This function is called once, when the Bot is spawned
*/
void init(spawnX, spawnY, spawnColour, canvasWidth, canvasHeight) {
    // Init code here. E.g:
    // heading = 90;
    // colour = 0xa1eb34;
}   

/* 
    wasm export 
    This function is called on every frame
*/
void update(int time, int currentX, int currentY)
{
    // Update logic goes here
}
