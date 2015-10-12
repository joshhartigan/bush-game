#include "apple.h"

#include "saddle.h"

#include <SDL2/SDL.h>
#include <stdlib.h>
#include <time.h>

Apple apples[MAX_APPLES];

Apple default_apple = {
  .x = 0,
  .y = 0,
  .width = 10,
  .height = 10,
  .red = 0,
  .green = 255,
  .blue = 0
};

void init_apples() {
  srand(time(NULL));

  for (int i = 0; i < MAX_APPLES; i++) {
    apples[i] = default_apple;
    apples[i].x = (rand() % (WINDOW_WIDTH / apples[i].width)) * apples[i].width;
    apples[i].y = (rand() % (WINDOW_HEIGHT / apples[i].height)) * apples[i].height;
  }
}

void draw_apples() {
  SDL_Rect a_rect;

  for (int i = 0; i < MAX_APPLES; i++) {
    a_rect.x = apples[i].x;
    a_rect.y = apples[i].y;
    a_rect.w = apples[i].width;
    a_rect.h = apples[i].height;

    SDL_SetRenderDrawColor(
      renderer,
      apples[i].red,
      apples[i].green,
      apples[i].blue,
      255);

    SDL_RenderFillRect(renderer, &a_rect);
  }
}
