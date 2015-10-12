#ifndef APPLE_H
#define APPLE_H

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
} Apple;

Apple apples[MAX_APPLES];
Apple default_apple;

void init_apples();

void draw_apples();

#endif
