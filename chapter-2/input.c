#include "input.h"

#include "saddle.h"
#include "player.h"

#include <SDL2/SDL.h>
#include <stdbool.h>

bool keys[322];

void init_input() {
  for (int i = 0 ; i < 322; i++) {
    keys[i] = false;
  }
}

void update_keys() {
  SDL_Event event;

  while (SDL_PollEvent(&event)) {
    switch (event.type) {
      case SDL_QUIT:
        game_running = false;
        break;
      case SDL_KEYDOWN:
        keys[event.key.keysym.sym] = true;
        break;
      case SDL_KEYUP:
        keys[event.key.keysym.sym] = false;
        break;
      default:
        break;
    }
  }
}

void handle_input() {
  if (keys[SDLK_q]) {
    game_running = false;
  }

  if (keys[SDLK_w]) move_player('w');
  if (keys[SDLK_a]) move_player('a');
  if (keys[SDLK_s]) move_player('s');
  if (keys[SDLK_d]) move_player('d');
}
