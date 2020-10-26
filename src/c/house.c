#include "bot.h"


typedef enum {
    kPaintingSquare,
    kPaintingRoof,
    kPaintingDoor,
    kFinished
} State;


int counter = 0;
State paintingState;


void setState(State state)
{
    paintingState = state;
}

bool paintSquare()
{
    // Move forward 40 units each side of the square
    switch (counter)
    {
    case 40:
        heading = 180;
        return false;
    case 80:
        heading = 270;
        return false;
    case 120:
        heading = 0;
        return false;
    case 160:
        heading = 30; // Re-initialise heading for roof 
        setState(kPaintingRoof);
        return true;
    default:
        return false;
    }
}

bool paintRoof()
{
    if (counter == 50)
    {
        heading = 150;
    }
    if (counter == 100)
    {
        penDown = false;
        heading = 180; // Re-initialise heading for door.
        setState(kPaintingDoor);
        return true;
    }
    return false;
}

void paintDoor()
{   

    // Navigate to where to pain the door
    switch (counter)
    {
    case 40:
        heading = 270;
        break;
    case 55:
        heading = 0;
        penDown = true;
        break;
    case 70: 
        heading = 270;
        break;
    case 80: 
        heading = 180;
        break;
    case 95:
        setState(kFinished);
        break;
    default:
        break;
    }
}


void init(spawnX, spawnY, spawnColour, canvasWidth, canvasHeight) {
    width = canvasWidth;
    height = canvasHeight;
    heading = 90; // go right
    colour = 0x900C3F; 
    lineWidth = 3;

    // Start by painting the square, then paint the roof, then paint the door.
    paintingState = kPaintingSquare; 
}


void update(int time, int currentX, int currentY)
{
    bool resetCounter = false;
    switch (paintingState)
    {
    case kPaintingSquare:
        resetCounter = paintSquare();
        break;
    case kPaintingRoof:
        resetCounter = paintRoof();
        break;
    case kPaintingDoor:
        paintDoor();
        break;
    case kFinished:
        move = false;
        break;
    default:
        break;
    }

    if (resetCounter)
    {
        counter = 0;
    }
    else 
    {
        counter ++;
    }
}

// Getters
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