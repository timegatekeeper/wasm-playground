#include "bot.h"

int counter = 0;
int stepsToTurn = 1;
int update(time) {
    int next = ((counter / stepsToTurn) % 8)+1;
    if(counter == stepsToTurn) {
        counter = 0;
        stepsToTurn++;
        heading = (heading + 90) % 360;
    } else {
        counter++;
    }
    return heading;
}