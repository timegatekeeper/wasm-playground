typedef enum Direction {HALT, NORTH, NORTHEAST, EAST, SOUTHEAST, SOUTH, SOUTHWEST, WEST, NORTHWEST} Direction;

Direction update(int time) {
    return (time % 8) + 1;
}