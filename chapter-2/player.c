#include "player.h"

#include "saddle.h"

#include <SDL2/SDL.h>
#include <stdio.h>

Player player;

void init_player() {
  player.x = WINDOW_WIDTH / 2;
  player.y = WINDOW_HEIGHT / 2;

  player.width  = 10;
  player.height = 10;

  player.red   = 255;
  player.green = 0;
  player.blue  = 0;
}

void draw_player() {
  SDL_Rect p_rect;
  p_rect.x = player.x;
  p_rect.y = player.y;
  p_rect.w = player.width;
  p_rect.h = player.height;

  SDL_SetRenderDrawColor(
    renderer,
    player.red,
    player.green,
    player.blue,
    255);

  SDL_RenderFillRect(renderer, &p_rect);
}

void move_player(char key) {
  switch (key) {
    case 'w':
      player.y--;
      break;
    case 'a':
      player.x--;
      break;
    case 's':
      player.y++;
      break;
    case 'd':
      player.x++;
      break;
    default:
      printf("Error at %d (player.c): Invalid key (char) to move_player()\n'",
          ticks);
  }
}
