CFLAGS += -Wall -Wextra -Wformat -Wno-missing-braces -pedantic -Werror -std=gnu11
INCFLAGS = -I./h
SDLFLAGS = -L/usr/local/lib -lSDL2

SRCFILES := $(wildcard *.c)

saddle: saddle.c
	@$(CC) $(CFLAGS) $(INCFLAGS) $(SDLFLAGS) $(SRCFILES) -o $@

clean:
	find $(BINDIR) -maxdepth 1 -type f -delete
