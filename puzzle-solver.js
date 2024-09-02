// Function that solves the crossword.
function crosswordSolver(crossword, words) {
    if (!isValidCrossword(crossword) || !isValidWords(words)) {
        return 'Error';
    }

    const grid = parseCrossword(crossword);
    const puzzleWords = initializePuzzle(grid);

    if (!isWordCountMatching(crossword, words.length)) {
        return 'Error';
    }

    if (!addWordsToPuzzle(words, grid, puzzleWords)) {
        return 'Error';
    }

    return puzzleWords.map(row => row.join("")).join("\n");
}

// Helper function to validate crossword format
function isValidCrossword(crossword) {
    return typeof crossword === "string" && /^[.\n012]+$/.test(crossword);
}

// Helper function to validate words array
function isValidWords(words) {
    return Array.isArray(words) && words.length >= 3 && !hasDuplicates(words) &&
        words.every(word => typeof word === "string");
}

// Helper function to check if the number of words matches the number of starting positions in the crossword
function isWordCountMatching(crossword, expectedCount) {
    const startWordCount = [...crossword].reduce((count, char) => {
        return (char > '0' && char !== '.') ? count + parseInt(char) : count;
    }, 0);
    return startWordCount === expectedCount;
}

// Function to parse the input crossword into a 2D array
function parseCrossword(input) {
    return input.trim().split("\n").map(row => 
        [...row].map(char => (char === "." ? -1 : parseInt(char)))
    );
}

// Function to initialize the puzzleWords array
function initializePuzzle(grid) {
    return grid.map(row => row.map(char => (char === -1 ? "." : "")));
}

// Function to add words to the crossword
function addWordsToPuzzle(words, grid, puzzleWords) {
    // console.log(grid)
    const addWords = (currentInd) => {
        if (currentInd === words.length) return true;

        const word = words[currentInd];

        for (let rowInd = 0; rowInd < grid.length; rowInd++) {
            for (let colInd = 0; colInd < grid[0].length; colInd++) {
                if (grid[rowInd][colInd] === 0) continue;

                const charPosition = { row: rowInd, col: colInd };

                if (tryAddingWord(word, charPosition, puzzleWords, addWords, currentInd)) {
                    return true;
                }
            }
        }
        return false;
    };

    return addWords(0);
}

// Function to try adding a word in a specific direction
function tryAddingWord(word, charPosition, puzzleWords, addWords, currentInd) {
    // console.log(word,puzzleWords,charPosition)
    const directions = ["horizontal", "vertical"];
    for (const direction of directions) {
        const othersCharsBackup = [];

        if (canPlaceWord(word, charPosition, puzzleWords, othersCharsBackup, direction)) {
            if (addWords(currentInd + 1)) {
                return true;
            }
            restorePreviousState(othersCharsBackup, puzzleWords);
        }
    }
    return false;
}

// Function to check if a word can be placed at a position
function canPlaceWord(word, { row, col }, puzzleWords, othersCharsBackup, direction) {
    for (let i = 0; i < word.length; i++) {
        const r = direction === "horizontal" ? row : row + i;
        const c = direction === "horizontal" ? col + i : col;

        if (r >= puzzleWords.length || c >= puzzleWords[0].length ||
            (puzzleWords[r][c] !== "" && puzzleWords[r][c] !== word[i])) {
            return false;
        }

        othersCharsBackup.push({ row: r, col: c, value: puzzleWords[r][c] });
        puzzleWords[r][c] = word[i];
    }
    return true;
}

// Function to restore the previous state of the puzzleWords
function restorePreviousState(othersCharsBackup, puzzleWords) {
    othersCharsBackup.forEach(({ row, col, value }) => {
        puzzleWords[row][col] = value;
    });
}

// Function to check for duplicates in an array
function hasDuplicates(arr) {
    return (new Set(arr)).size !== arr.length;
}

module.exports = { crosswordSolver };

const puzzle = '2001\n0..0\n1000\n0..0'
const words = ['casa','alan', 'ciao', 'anta']

// Function that solve the crossword and set board and words.
const crosswordSolution = crosswordSolver(puzzle, words)
console.log (crosswordSolution)