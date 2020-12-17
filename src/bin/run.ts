import { PokerCalculatorFactory } from '@app/calculator';
import { StdInOutParser } from '@app/parser';
import { createInterface } from 'readline';

const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

const parser = new StdInOutParser();

readline.on('line', function (str: string) {
    const parsed = parser.parseInputString(str);
    const calculator = PokerCalculatorFactory.createCalculator(parsed.game);
    const results = calculator.calculate(parsed.handsCards, parsed.boardCards);
console.log(123)
    readline.write(parser.createOutputString(results.reverse()));
});

readline.on('close', function () {
    process.exit(0);
});
