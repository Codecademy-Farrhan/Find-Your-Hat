const chalk = require("chalk");
const readline = require("readline-sync"); // For taking user inputs

class Field {
    // The Field constructor initializes the game field and player's starting position
    constructor(fieldArray) {
        this.field = fieldArray; // The current game field
        this.playerPos = { x: 0, y: 0 }; // The player starts at the top-left corner
    }

    // The print() method displays the current state of the field in the console
    print() {
        for (let row of this.field) {
            console.log(row.join("")); // Converts each row of field into a string and logs it. This line prints each inner array in a row, and upon completion, moves onto the next outer array element onto a new row, and repeats the inner array process.
        }
    }

    // The move() method updates player's position based on the provided direction
    move(direction) {
        // Start with the player's current position
        let newY = this.playerPos.y;
        let newX = this.playerPos.x;

        // Update the coordinates based on the move direction where X is the horizontal axis and Y is the vertical axis.
        switch (direction) {
            case "U":
                newY--; // Move up
                break;
            case "D":
                newY++; // Move down
                break;
            case "L":
                newX--; // Move left
                break;
            case "R":
                newX++; // Move right
                break;
            default:
                console.log(
                    "Enter a valid direction: U (up), D (down), L (left), R (right)."
                );
                return;
        }

        // Check if the move is outside of the field boundaries
        if (this.isOutOfField(newX, newY)) {
            throw new Error("You went out of the field!");
        }

        // Handle special field cells (Hat or Hole)
        const newPosVal = this.field[newY][newX];
        if (newPosVal.includes('^')) {
            // Flow Control: Throwing an error immediately stops the execution of the current code block and transfers control to the nearest error handling block. In the context of the game, this is a quick and effective way to end the game loop when the player wins or loses.
            throw new Error("Congratulations, you found your hat!");
        } else if (newPosVal.includes("O")) {
            throw new Error("Sorry, you fell into a hole.");
        } else {
            // Update the field to show player's path
            this.field[this.playerPos.y][this.playerPos.x] = chalk.green("░");
            this.playerPos.y = newY;
            this.playerPos.x = newX;
            this.field[newY][newX] = chalk.blue('*');
        }
    }

    // Function to check if given x, y coordinates are outside of the field
    isOutOfField(x, y) {
        return (
            y < 0 || x < 0 || y >= this.field.length || x >= this.field[y].length
        );
    }

    // A static method to generate a randomized field with a given height, width and hole percentage. This generates a 2D array.
    static generateField(height, width, percentage) {
        // Initialize the empty field
        const field = new Array(height)
            .fill(0) // Array is a built-in JavaScript object that constructors arrays. [0, 0, 0]
            .map((element0) => new Array(width).fill(chalk.green('░'))); // This line iterates over each element '0' in the array and maps over it with the background. For each element '0', a new array is inserted inside it. The new array can only be shown in horizontally,

        // Randomly place holes based on the given percentage
        let holeCount = Math.floor(height * width * percentage);
        while (holeCount > 0) {
            const randomY = Math.floor(Math.random() * height);
            const randomX = Math.floor(Math.random() * width);

            if (field[randomY][randomX] !== "O") {
                field[randomY][randomX] = chalk.red("O");
                holeCount--;
            }
        }

        // Place the hat at a random position
        let hatY, hatX;
        do {
            hatY = Math.floor(Math.random() * height);
            hatX = Math.floor(Math.random() * width);
        } while (hatY === 0 && hatX === 0); // Ensure the hat is not at the top-left corner where the player starts

        field[hatY][hatX] = chalk.yellow('^');

        // Set player's initial position
        field[0][0] = chalk.blue('*');
        return field;
    }
}

// Main game loop
try {
    // Use the generateField method to create a random game field
    const generatedField = Field.generateField(10, 10, 0.2);
    const myField = new Field(generatedField);

    // Predefined static field:
    /*
      const myField = new Field([
        ['*', '░', 'O'],
        ['░', 'O', '░'],
        ['░', '^', '░'],
      ]);
      */

    // Main game loop, prompts user for moves until the game ends
    while (true) {
        console.clear();
        myField.print(); // Display the current state
        console.log('Legend: * = Player, ^ = Hat, O = Hole, ░ = Path');
        const moveDirection = readline
            .question("Which way? U (up), D (down), L (left), R (right): ")
            .toUpperCase();
        myField.move(moveDirection); // Move the player
    }
} catch (e) {
    // Display end game messages (win/lose/out of bounds)
    console.log(e.message);
}
