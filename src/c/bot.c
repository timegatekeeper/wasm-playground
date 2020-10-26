#include "wasm.h"
typedef signed int i32;
WASM_IMPORT consoleLog(int message);

int counter;
WASM_EXPORT int main(int argc, char *argv[])
{
    counter = 0;
}
WASM_EXPORT int update(int time)
{
	counter++;
    consoleLog(counter);
    return counter;
}