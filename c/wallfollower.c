typedef enum 
{
    false, 
    true 
} bool;

typedef enum 
{
    kGoUp,
    kGoLeft,
    kGoDown,
    kGoRight
} State;

int x = 0;
int y = 0;
unsigned int colour = 0;
int height;
int width;
State botState = kGoUp;

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

void setState(State newBotState)
{
    botState = newBotState;
}

int update(int time, int currentX, int currentY) 
{
    switch (botState)
    {
    case kGoUp: 
    {
        heading = 0;
        colour = 0xff6347;
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
        penDown = false;
        if((currentY+20) >= height) {
            setState(kGoLeft);
        }
        break;
    }
    case kGoLeft: 
    {
        heading = 270;
        colour = 0xB8860B;
        penDown = true;
        if((currentX-20) <= 0) {
            setState(kGoUp);
        }
        break;
    }
    default:
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