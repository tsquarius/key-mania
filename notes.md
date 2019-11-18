## Background

``Keyboard Revolution`` is a simple game based off of the popular Dance Dance revolution. 
Arrows flow across the screen (from bottom to top) and when the arrows approach a fixed zone,
the player needs to press the corresponding arrow key on the keyboard.

A player is scored on how precise/accurate they press the keys. If the player consistently misses their timing,
they will lose the game.

The complexity of the arrow strokes will increase based on the difficulty setting the player chooses.
The speed at which the arrow flows will depend on the song.

##Functionality

- Arrows are generated and flow across the screen
- Users can press directional keys to hit the corresponding arrows
- Scores will be calculated on accuracy
- Game will end when a player misses too many times (~20)
- Users can choose a song and difficulty, impacting the speed and complexity of arrows
- Pause / Restart game
- "Combos" or consecutive accurate hits will be tracked and shown on screen
- Play music

### Future/Bonus implementations
- High scores
- Arrow color/explosion effects
- Pull songs from youtube/spotify and calculate BPM -> generate steps

## Architecture and Technologies

- Vanilla ``Javascript`` will be used for game logic
- ``Canvas`` will be used for rendering
- ``Webpack`` for bundling
- TBD - music implementation

### Objects and purpose
``game.js`` - game logic will lie here
``arrows.js`` - handles individual arrows
``player.js`` - handles player input
``hit_zone.js`` - defines the hit zone and accuracy
``game_view.js`` - renders and animates the game
``score.js`` - renders score for the game

