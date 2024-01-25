const prompt = require("prompt-sync")();

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

const getbet = (balance, lines) => {
  while (true) {
    const bet = prompt("Enter the bet per line: ");
    const numberBet = parseFloat(bet);

    if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
      console.log("Invalid bet, try again");
    } else {
      return numberBet;
    }
  }
};

let balance = deposit();
const numberOfLines = getnumberOfLine();
const bet = getbet(balance, numberOfLines);
