#include "main.h"

using namespace std;

float version = 1.0;

bool loop = true;

char* prefix = "$: ";

int main(int argc, char* argv[])
{
    if(argc > 1)
    {
        exit(0);
    }
    cout<<"pl-CLI v";
    cout<<version;
    cout<<"\n";
    while(loop)
    {
        char* line = readline(prefix);
        printf(line);
        if(!line) break;
        if(*line) add_history(line);
    }
}