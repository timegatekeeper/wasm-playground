#include "bot.h"

int counter = 0;
int stepsToTurn = 1;
//int update(time) {
void update(int time, int currentX, int currentY)
{
    int next = ((counter / stepsToTurn) % 8)+1;
    if(counter == stepsToTurn) {
        counter = 0;
        stepsToTurn++;
        heading = (heading + 90) % 360;
    } else {
        counter++;
    }
    //return heading;
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