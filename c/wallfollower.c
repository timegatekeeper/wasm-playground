typedef enum Direction {HALT, NORTH, NORTHEAST, EAST, SOUTHEAST, SOUTH, SOUTHWEST, WEST, NORTHWEST} Direction;
typedef enum { false, true } bool;

int x = 0;
int y = 0;
unsigned int colour = 0;
int height;
int width;

bool penDown = true;

int counter = 0;
int stepsToTurn = 1;

Direction heading = NORTH;

void init(spawnX, spawnY, spawnColour, canvasWidth, canvasHeight) {
    x = spawnX;
    y = spawnY;
    colour = spawnColour;
    width = canvasWidth;
    height = canvasHeight;
}

Direction update(time, currentX, currentY) {
    switch(heading)
    {
        case NORTH:
            //colour = 0xff6347;
            if((currentY-20) <= 0) {
                heading = EAST;
            }
            break;

        case EAST:
            //colour = 0x0000FF;
            if((currentX+20) >= width) {
                heading = SOUTH;
            }
            break;

        case SOUTH:
            //colour = 0x8A2BE2;
            penDown = false;
            if((currentY+20) >= height) {
                heading = WEST;
            }
            break;

        case WEST:
            //colour = 0xB8860B;
            penDown = true;
            if((currentX-20) <= 0) {
                heading = NORTH;
            }
            break;
    }
    return heading;
}

int getColour() {
    return colour;
}

bool isPenDown() {
    return penDown;
}