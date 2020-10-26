#include "bot.h"

typedef enum 
{
    kGoUp,
    kGoLeft,
    kGoDown,
    kGoRight
} State;

State botState = kGoUp;

void init(spawnX, spawnY, spawnColour, canvasWidth, canvasHeight) {
    colour = spawnColour;
    width = canvasWidth;
    height = canvasHeight;
}

void setState(State newBotState)
{
    botState = newBotState;
}

//int update(int time, int currentX, int currentY) 
void update(int time, int currentX, int currentY)
{
    switch (botState)
    {
    case kGoUp: 
    {
        heading = 0;
        colour = 0xff6347;
        lineWidth = 1;
        penDown = true;
        if((currentY-20) <= 0) 
        {
            setState(kGoRight);
        }
        break;
    }
    case kGoRight: 
    {
        heading = 90;
        colour = 0x0000FF;
        lineWidth = 5;
        if((currentX+20) >= width) 
        {
            setState(kGoDown);
        }
        break;
    }
    case kGoDown: 
    {
        heading = 180;
        colour = 0x8A2BE2;
        lineWidth = 10;
        if((currentY+20) >= height) {
            setState(kGoLeft);
        }
        break;
    }
    case kGoLeft: 
    {
        heading = 270;
        colour = 0xB8860B;
        lineWidth = 5;
        penDown = false;
        if((currentX-20) <= 0) {
            setState(kGoUp);
        }
        break;
    }
    default:
        break;
    }
    //return heading;
}

// Getters and setters 
int getHeading()
{
    return heading;
}

int getColour() {
    return colour;
}

bool isPenDown() {
    return penDown;
}

int getLineWidth() {
    return lineWidth;
}
bool isBotMoving()
{
    return move;
}