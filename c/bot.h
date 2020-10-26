typedef enum 
{
    false, 
    true 
} bool;

// the canvas size is also stored in the wasm module
int height = 0;
int width = 0;
// heading in degrees from Due North
int heading = 0;
// Colour in hexadecimal RGB (as in CSS)
int colour = 0x000000;
// If the pen is down on the page or not, so you can move without drawing
bool penDown = true;
// Width of the line to draw in pixels
int lineWidth = 1;
// Should the bot move or not?
bool move = true;


//called by the runtime after the bot is created
void init(int spawnX, int spawnY, int spawnColour, int canvasWidth, int canvasHeight);

//called by the runtime every frame
// int update(int time, int currentX, int currentY);

// Update is called every frame by the runtime. You can update your bot state here.
void update(int time, int currentX, int currentY);

int getHeading();
int getColour();
bool isPenDown();
int getLineWidth();
bool isBotMoving();