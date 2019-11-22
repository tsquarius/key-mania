# Key Mania

Link to [live site](http://)

## Background/Overview

``KeyMania`` is a simple game based off of the popular Dance Dance revolution. 
Arrows flow across the screen (from bottom to top) and when the arrows approach a fixed zone,
the player needs to press the corresponding arrow key on the keyboard.

A player is scored on how precise/accurate they press the keys. If the player consistently misses their timing,
they will lose the game.

The speed at which the arrow flows will depend on the song. Arrow patterns are generated randomly.

![demo](/demo.gif "demo")


## Architecture and Technologies

- Vanilla ``Javascript`` is be used for all game logic
- ``Canvas`` is used for rendering
- ``Webpack`` for bundling

## Functionality

- [x] Users can choose a song, impacting the tempo of the arrows
- [x] Arrows are generated and flow across the screen
- [x] Users can press directional or WASD keys to hit the corresponding arrows
- [x] Successful hits will render an arrow disappearing animation
- [x] Scores will be calculated on accuracy
- [x] "Combos" or consecutive accurate hits will be tracked and shown on screen
- [x] Game will end when a player misses too many times (>20)
- [x] Restart game

## Feature Highlights

### Arrow tempo
The "tempo" is controlled by (1) the velocity at which the arrows travel across the board, combined with (2) the frequency at which the arrows are produced. The velocity exists as an attribute of an individual arrow, while the frequency is passed on the the ``throttled`` version of the ``activateArrow` method.

Both the velocity and frequency are assigned to a specific song. Once a player selects a song, they paramters are then passed down the chain in ``game.js`` object. 

With successful object oriented programming practices, it was easy to not only tweak the tempo of a specific song, but also deploy any new songs.

### Arrows interaction and randomization
Arrows are hosted in 4 separate ``arrow_group.js`` objects, representing the 4 different directions.

When a game is initialized, arrows are randomly distributed amongst these groups and are hosted in a "queue". At this point in time, they are dormant (i.e. have no velocity).

At every interval, defined by the "tempo" (described above), the arrows are randomly "activated", where in which they assigned a velocity. "Activated" arrows live inside an array.

The player interacts with the arrows chronically -- the first arrows activated are the first ones to hit the player's strike zone. 
If the player successfully hits the arrow, it is removed from the array. 

If the player doesn't hit the arrow and it passes the board's border, then it is also removed.

Additionally, to add a layer of complexity, the game releases "pair arrows" (two different arrows at once) at a 14% rate and skips an arrow release at a 7% rate.



## Music Credits
––––––––––––––––––––––––––––––  
Track: Jungle Mood — Peyruis [Audio Library Release]  
Music provided by Audio Library Plus  
Watch: https://youtu.be/AE4AWGTNa-A  
Free Download / Stream: http://alplus.io/JungleMood  
––––––––––––––––––––––––––––––

––––––––––––––––––––––––––––––  
Track: Vacay In Fiji Riddim - Konrad OldMoney  
Music provided by Audio Library  
Watch: https://www.youtube.com/watch?v=XfiSShuMbvc  
––––––––––––––––––––––––––––––