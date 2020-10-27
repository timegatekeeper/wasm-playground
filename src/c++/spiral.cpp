/* Define our wasm export as C functions*/
extern "C" {

    void init(int spawnX, int spawnY, int spawnColour, int canvasWidth, int canvasHeight);
    void update(int time, int currentX, int currentY);
    int getHeading();
    int getColour();
    bool isPenDown();
    int getLineWidth();
    bool isBotMoving();
}

class Bot {
public:
    void Init(/* Pass relevant args to your bot here*/)
    {
        m_heading = 0;
        m_colour = 0x000000;
        m_penDown = true;
        m_moving = true;
        m_lineWidth = 1;

        m_stepsToTurn = 1;
    }

    void Update(/* Pass relevant args to your bot here*/)
    {
        int next = ((m_counter / m_stepsToTurn) % 8)+1;
        if(m_counter == m_stepsToTurn) {
            m_counter = 0;
            m_stepsToTurn++;
            m_heading = (m_heading + 90) % 360;
        } else {
            m_counter++;
        }
    }

    // Public getters to return the value of member variables outside the class
    int GetHeading() {return m_heading;}
    int GetColour() {return m_colour;}
    bool IsPenDown() {return m_penDown;}
    int GetLineWidth() {return m_lineWidth;}
    bool IsBotMoving() {return m_moving;}


private:
    // Member variables
    int m_heading;
    int m_colour;
    bool m_penDown;
    int m_lineWidth;
    bool m_moving;

    // Spiral Bot specific values
    int m_counter;
    int m_stepsToTurn;
};


/*
    Implement the C exports here. 
    You shouldn't have to edit these (only if you want to change the function signature for the Bot's Init and Update functions).
    You just mainly only edit the Bot class!

*/

static Bot s_spiralBoth;

void init(int spawnX, int spawnY, int spawnColour, int canvasWidth, int canvasHeight)
{   
    s_spiralBoth.Init();
}

void update(int time, int currentX, int currentY)
{
    s_spiralBoth.Update();
}

int getHeading()
{
    return s_spiralBoth.GetHeading();
}

int getColour()
{
    return s_spiralBoth.GetColour();
}

bool isPenDown()
{
    return s_spiralBoth.IsPenDown();
}

int getLineWidth()
{
    return s_spiralBoth.GetLineWidth();
}

bool isBotMoving()
{
    return s_spiralBoth.IsBotMoving();
}