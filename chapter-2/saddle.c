#include "saddle.h"

#include "player.h"
#include "input.h"
#include "apple.h"
#include "collision.h"

#include <SDL2/SDL.h>
#include <stdbool.h>

int WINDOW_WIDTH = 600;
int WINDOW_HEIGHT = 350;

bool game_running = true;
int ticks = 0;

int main() {
  win = SDL_CreateWindow(
    "saddle",
    SDL_WINDOWPOS_UNDEFINED, SDL_WINDOWPOS_UNDEFINED, // center
    WINDOW_WIDTH, WINDOW_HEIGHT,
    SDL_WINDOW_SHOWN);
  renderer = SDL_CreateRenderer(win, 0, SDL_RENDERER_ACCELERATED);

  init_input();
  init_player();
  init_apples();

  game_loop();

  SDL_DestroyWindow(win);
  SDL_Quit();
}

void game_loop() {
  while (game_running) {
    // do things
    update_keys();
    handle_input();
    handle_collisions();
    ticks++;
    // draw things
    blank_screen(&renderer);
    draw_apples();
    draw_player();
    SDL_RenderPresent(renderer);
    // keep things at a normal pace
    SDL_Delay(10);
  }
}

void blank_screen() {
  SDL_SetRenderDrawColor(renderer, 255, 255, 255, 255);
  SDL_RenderClear(renderer);
}
