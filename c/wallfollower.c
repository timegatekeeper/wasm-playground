typedef enum Direction {HALT, NORTH, NORTHEAST, EAST, SOUTHEAST, SOUTH, SOUTHWEST, WEST, NORTHWEST} Direction;

int x = 0;
int y = 0;
int colour = 0;
int height = 0;
int width = 0;

int counter = 0;
int stepsToTurn = 1;

Direction heading = NORTH;


void create(spawnX, spawnY, spawnColour, canvasWidth, canvasHeight) {
    x = spawnX;
    y = spawnY;
    colour = spawnColour;
    width = canvasWidth;
    height = canvasHeight;
}


Direction update(time, currentX, currentY) {
    if(heading == NORTH) {
        if((currentY-1) <= 0) {
            return EAST;
        }
    }
    if(heading == EAST) {
        if((currentX+1) > width) {
            return SOUTH;
        }
    }
    if(heading == SOUTH) {
        if((currentY+1) > height) {
            return WEST;
        }
    }
    if(heading == WEST) {
        if((currentX-1) <= 0) {
            return NORTH;
        }
    }
    return heading;
}