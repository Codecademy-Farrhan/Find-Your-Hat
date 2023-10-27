Find Your Hat Game
Find Your Hat is a terminal-based game where players navigate a field to find their hat while avoiding holes. The field is displayed as a grid with distinct characters representing the player, the hat, the holes, and the path.

Game Characters:
^ (Hat): The objective is to reach this character.
O (Hole): Avoid these, or you'll lose!
░ (Field Character): Represents unexplored areas of the field.
*** (Path Character): Indicates the path the player has taken.

Game Instructions:
The player starts at the top-left corner of the field.
Navigate using the following commands:
U: Move up
D: Move down
L: Move left
R: Move right

The game ends if:
The player finds their hat (^).
The player falls into a hole (O).
The player goes out of the field bounds.

Implementation:

Class: Field

Constructor:
Initializes a field and sets the player's starting position.

Methods:
runGame(): Runs the main game loop.
askQuestion(): Asks the player for their next move.
isInBounds(): Checks if the player is within the field boundaries.
isHat(): Checks if the player has found the hat.
isHole(): Checks if the player has fallen into a hole.
print(): Prints the current state of the field.
static generateField(height, width, percentage): Generates a new game field.

How to Play:
Ensure you have Node.js installed.
Navigate to the game directory.
Run node main.js

Follow on-screen instructions to navigate the field.
Customization:
You can adjust the field's size and the percentage of holes by modifying the parameters in the Field.generateField method.

