typedef enum Direction {HALT, NORTH, NORTHEAST, EAST, SOUTHEAST, SOUTH, SOUTHWEST, WEST, NORTHWEST} Direction;

int counter = 0;
int stepsToTurn = 1;
Direction heading = NORTH;
Direction update(time) {
    Direction next = ((counter / stepsToTurn) % 8)+1;
    if(counter == stepsToTurn) {
        counter = 0;
        stepsToTurn++;
        heading = (heading + 2) % 8;
    } else {
        counter++;
    }
    return heading;
}