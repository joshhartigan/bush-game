#ifndef SADDLE_H
#define SADDLE_H

#include <SDL2/SDL.h>
#include <stdbool.h>

bool game_running;

int WINDOW_WIDTH;
int WINDOW_HEIGHT;

SDL_Window *win;
SDL_Renderer *renderer;

void game_loop();

void blank_screen();

#endif
