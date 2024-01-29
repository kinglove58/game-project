const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
  A: 2,
  B: 3,
  C: 6,
  D: 8,
};

const SYMBOLS_VALUES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

const deposit = () => {
  while (true) {
    const depositAmount = prompt("Enter a deposit amount: ");
    const numberDepositAmount = parseFloat(depositAmount);

    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
      console.log("This is not a valid number try again!");
    } else {
      return numberDepositAmount;
    }
  }
};

const getnumberOfLine = () => {
  while (true) {
    const lines = prompt("Enter the number of line between 1-3: ");
    const numberOfLine = parseFloat(lines);

    if (isNaN(numberOfLine) || numberOfLine <= 0 || numberOfLine > 3) {
      console.log("Invalid Number, try again");
    } else {
      return numberOfLine;
    }
  }
};

const getbet = (balance, line) => {
  while (true) {
    const bet = prompt("Enter the bet per line: ");
    const numberBet = parseFloat(bet);

    if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / line) {
      console.log("Invalid bet, try again");
    } else {
      return numberBet;
    }
  }
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

let balanceAvailable = deposit();
const numberOfLine = getnumberOfLine();
const betAvailable = getbet(balanceAvailable, numberOfLine);
const reelAvailable = spin();
const transposeAvailable = transpose(reelAvailable);
printRows(transposeAvailable);
