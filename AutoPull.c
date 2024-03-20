#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <time.h>

int main() {
    // One Day interval
    const int interval = 24 * 60 * 60;
    
    while (1) {
        // Perform git pull
        printf("Performing git pull...\n");
        system("git pull");

        // Sleep for the specified interval
        printf("Sleeping for %d seconds...\n", interval);
        sleep(interval);
    }

    return 0;
}
