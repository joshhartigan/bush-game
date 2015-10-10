#ifndef PLAYER_H
#define PLAYER_H

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
} Player;

Player player;

void init_player();

void draw_player();

#endif
