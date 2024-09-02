# Crossword Solver
This project provides a solution to a crossword puzzle where the crossword grid and a list of words are provided as input. The solution attempts to fill the grid with the given words according to certain rules and returns the completed crossword puzzle as output.

## Description

The crossword solver project is a JavaScript-based tool that solves simple crossword puzzles by placing given words into a grid. The grid is represented by a string containing numbers and dots (.), where numbers indicate starting points for words, and dots represent empty spaces. The program validates the input and then attempts to place all the words in the correct positions.
Features

- Validates the format of the crossword grid and word list.
- Ensures the number of words matches the number of starting positions in the grid.
- Supports horizontal and vertical word placement.
- Handles input errors and provides meaningful feedback.
- Restores the puzzle grid state if a word cannot be placed.

## Installation

To use the crossword solver, clone the repository and install the necessary dependencies:
```bash

git clone https://github.com/ombima56/crossword-solver.git
cd crossword-solver
npm install
```
## Usage

To solve a crossword puzzle, call the crosswordSolver function with the grid and word list as arguments. The grid is provided as a string, with rows separated by newline characters. Words are provided as an array of strings.
### Example

```javascript

const { crosswordSolver } = require('./crosswordSolver');

const puzzle = '2001\n0..0\n1000\n0..0';
const words = ['casa', 'alan', 'ciao', 'anta'];

const solution = crosswordSolver(puzzle, words);
console.log(solution);
```
## Output:

```javascript
casa
a..a
alan
a..a
```
## Code Overview
### Main Function

- crosswordSolver(crossword, words): This is the main function that orchestrates the solving of the crossword. It validates the input, parses the grid, initializes the puzzle, checks if the word count matches, and attempts to add the words to the grid.

### Helper Functions

- isValidCrossword(crossword): Validates the format of the crossword grid to ensure it is a string containing only numbers, dots, and newline characters.
- isValidWords(words): Validates the word list to ensure it is an array of strings with no duplicates.
- isWordCountMatching(crossword, expectedCount): Checks if the number of words matches the number of starting positions indicated in the crossword grid.
- parseCrossword(input): Converts the crossword string into a 2D array where dots are replaced with -1 and numbers are kept as integers.
- initializePuzzle(grid): Initializes the puzzle array by replacing all starting positions with empty strings and all empty spaces with dots.
- addWordsToPuzzle(words, grid, puzzleWords): Recursively attempts to add each word to the puzzle grid.
- tryAddingWord(word, charPosition, puzzleWords, addWords, currentInd): Tries to place a word in either a horizontal or vertical direction.
- canPlaceWord(word, { row, col }, puzzleWords, othersCharsBackup, direction): Checks if a word can be placed in the grid at the specified position and direction.
- restorePreviousState(othersCharsBackup, puzzleWords): Restores the grid to its previous state if placing a word fails.
- hasDuplicates(arr): Checks for duplicate words in the array.

## How It Works

- Validation: The input crossword and word list are validated to ensure they are correctly formatted.
- Parsing: The crossword string is parsed into a 2D array representing the grid.
- Initialization: The grid is initialized, marking starting positions for the words.
- Word Placement: The words are placed into the grid, attempting to match the positions indicated by the numbers.
- Backtracking: If a word cannot be placed, the grid state is restored, and the function tries a different placement.
- Result: If successful, the completed puzzle is returned; otherwise, an error is indicated.

### Error Handling

The crossword solver includes several error-handling mechanisms:

- Input Validation: Returns 'Error' if the input grid or word list is invalid.
- Word Count Mismatch: Returns 'Error' if the number of words does not match the number of starting positions.
- Failed Word Placement: Returns 'Error' if the words cannot be placed into the grid.

## License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.