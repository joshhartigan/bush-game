#include "collision.h"

#include "player.h"
#include "apple.h"

int player_on_apple() {
  for (int i = 0; i < MAX_APPLES; i++) {
    Apple a = apples[i];

    if (player.x < a.x + a.width &&
        player.x + a.width > a.x &&
        player.y < a.y + a.height &&
        a.height + player.y > a.y) {
      return i;
    }
  }

  return 0;
}

void handle_collisions() {
  int apple_collision = player_on_apple();
  if (apple_collision > 0) {
    apples[apple_collision].red = 255;
    apples[apple_collision].green = 0;
  }
}
