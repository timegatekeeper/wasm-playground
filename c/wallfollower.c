typedef enum { false, true } bool;

int x = 0;
int y = 0;
unsigned int colour = 0;
int height;
int width;

bool penDown = true;

int counter = 0;
int stepsToTurn = 1;

int heading = 0;

void init(spawnX, spawnY, spawnColour, canvasWidth, canvasHeight) {
    x = spawnX;
    y = spawnY;
    colour = spawnColour;
    width = canvasWidth;
    height = canvasHeight;
}

int update(time, currentX, currentY) {
    switch(heading)
    {
        case 0:
            colour = 0xff6347;
            if((currentY-20) <= 0) {
                heading = 90;
            }
            break;

        case 90:
            colour = 0x0000FF;
            if((currentX+20) >= width) {
                heading = 180;
            }
            break;

        case 180:
            colour = 0x8A2BE2;
            penDown = false;
            if((currentY+20) >= height) {
                heading = 270;
            }
            break;

        case 270:
            colour = 0xB8860B;
            penDown = true;
            if((currentX-20) <= 0) {
                heading = 0;
            }
            break;
    }
    return heading;
}

//to do: maybe add a get heading?

int getColour() {
    return colour;
}

bool isPenDown() {
    return penDown;
}