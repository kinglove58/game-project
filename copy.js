// ENTER DEPOSIT
//GET THE NUMBER OF LINE
// GET BET PER LINE
// SPIN
// TRANSPOSE
// PRINTROW
// GET THE WINNING

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
  A: 8,
  B: 6,
  C: 3,
  D: 2,
};

const SYMBOLS_VALUES = {
  A: 2,
  B: 3,
  C: 4,
  D: 5,
};

const deposit = () => {
  const maxAttempts = 4;
  for (let i = 0; i < maxAttempts; i++) {
    const depositAmount = prompt("Enter a deposit amount: ");
    const numberDepositAmount = parseFloat(depositAmount);
    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
      console.log(
        "Invalid amount try again!, you have " +
          (maxAttempts - i - 1) +
          " attempt left"
      );
    } else {
      return numberDepositAmount;
    }
  }
  console.log("You have exceeded your attempt");
  return null;
};

const getNumberOfLine = () => {
  const maxAttempts = 2;
  for (let i = 0; i < maxAttempts; i++) {
    const line = prompt("Enter the number of line between 1- 3: ");
    const lineNumber = parseFloat(line);
    if (isNaN(lineNumber) || lineNumber <= 0 || lineNumber > 3) {
      console.log(
        "invalid number, you have " + (maxAttempts - i - 1) + " left"
      );
    } else {
      return lineNumber;
    }
  }
  console.log("You have exceeded your attempt try again!");
  return null;
};

const getBet = (balance, line) => {
  const maxAttempts = 2;
  for (let i = 0; i < maxAttempts; i++) {
    const bet = prompt("Enter the bet amount per line: ");
    const betNumber = parseFloat(bet);
    if (isNaN(betNumber) || betNumber <= 0 || betNumber > balance / line) {
      console.log(
        "invalid amount check your balance, you have " +
          (maxAttempts - i - 1) +
          " attempt left"
      );
    } else {
      return betNumber;
    }
  }
  console.log("You have exceeded your attempt try again!");
  return null;
};

const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }

  const reels = [];
  for (let i = 0; i < COLS; i++) {
    reels.push([]);
    const reelSymbols = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbols.length);
      const selectedSymbol = reelSymbols[randomIndex];
      reels[i].push(selectedSymbol);
      reelSymbols.splice(randomIndex, 1);
    }
  }
  return reels;
};

const transpose = (reel) => {
  const rows = [];
  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reel[j][i]);
    }
  }
  return rows;
};

const printRows = (any) => {
  for (const roll of any) {
    let rowString = "";
    for (const [i, symb] of roll.entries()) {
      rowString += symb;
      if (i != roll.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
};

// we want check for winner and asign it money to it per bet

const getWinning = (row, bet, lines) => {
  const winning = 0;
  for (let i = 0; i < lines; i++) {
    const symbols = row[i];
    let allSame = true;
    for (const symbol of symbols) {
      if (symbol != symbols) {
        allSame = false;
        break;
      }
    }
    if (allSame) {
      winning += bet * SYMBOLS_VALUES[symbols[0]];
    }
  }
  return winning;
};

//we need balance to display,

const gameSetUp = () => {
  let balance = deposit();
  if (balance === null) {
    console.log("Game over, try again!");
    return;
  } else {
    console.log(`Your balance is $${balance}`);
  }
  while (true) {
    const numberOfLine = getNumberOfLine();
    if (numberOfLine === null) {
      console.log("Game over, Try again!");
      return;
    }
    const betAvailable = getBet(balance, numberOfLine);
    if (betAvailable === null) {
      console.log("Game over, try again!");
    } else {
      balance -= betAvailable * numberOfLine;
    }
    const targetspin = spin();
    const targetrows = transpose(targetspin);
    printRows(targetrows);
    const winner = getWinning(targetrows, betAvailable, numberOfLine);

    console.log(`You have won $${winner.toString}`);

    balance += winner;

    if (balance <= 1) {
      console.log("Sorry you have run out of Money");
      break;
    }
    const playAgain = prompt("Do you want to play more (Yes or No)?");
    if (playAgain != Yes) {
      console.log("Bye, I hope you have make enough profit");
      break;
    }
  }
};

gameSetUp();
