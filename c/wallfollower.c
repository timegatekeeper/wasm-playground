typedef enum Direction {HALT, NORTH, NORTHEAST, EAST, SOUTHEAST, SOUTH, SOUTHWEST, WEST, NORTHWEST} Direction;

int x = 0;
int y = 0;
int colour = 0;
int height;
int width;

int counter = 0;
int stepsToTurn = 1;

Direction heading = NORTH;

void consoleLog(int value);

void init(spawnX, spawnY, canvasWidth, canvasHeight) {
    x = spawnX;
    y = spawnY;
    //colour = spawnColour;
    width = canvasWidth;
    height = canvasHeight;
    consoleLog(canvasHeight);
    consoleLog(canvasWidth);
}


Direction update(time, currentX, currentY) {
    switch(heading)
    {
        case NORTH:
            if((currentY-1) <= 0) {
                heading = EAST;
            }
            break;

        case EAST:
            consoleLog(currentX);
            if((currentX+1) >= width) {
                heading = SOUTH;
            }
            break;

        case SOUTH:
            if((currentY+1) >= height) {
                heading = WEST;
            }
            break;

        case WEST:
            if((currentX-1) <= 0) {
                heading = NORTH;
            }
            break;
    }
    return heading;
}