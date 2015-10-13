#include "collision.h"

#include "player.h"
#include "apple.h"

int player_on_apple() {
  for (int i = 0; i < MAX_APPLES; i++) {
    Apple a = apples[i];

    if (player.x                 < a.x + a.width  &&
        player.x + player.width  > a.x            &&
        player.y                 < a.y + a.height &&
        player.y + player.height > a.y) {
      return i;
    }
  }

  return -1;
}

void handle_collisions() {
  int apple_collision = player_on_apple();
  if (apple_collision > -1) {
    eat_apple(apple_collision);
  }
}
