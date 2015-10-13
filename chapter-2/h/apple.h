#ifndef APPLE_H
#define APPLE_H

#include <stdbool.h>

#define MAX_APPLES 10

typedef struct {
  // Position
  int x;
  int y;

  // Size
  int width;
  int height;

  // Colour
  int red;
  int green;
  int blue;

  // State
  bool eaten;
} Apple;

Apple apples[MAX_APPLES];
Apple default_apple;

void init_apples();

void draw_apples();

// removes the element of apples[] at `index`
void eat_apple(int index);

#endif
