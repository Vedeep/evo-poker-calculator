import { PokerCalculatorFactory } from '@app/calculator';
import { StdInOutParser } from '@app/parser';
import { createInterface } from 'readline';

const readline = createInterface({
    input: process.stdin,
});

const parser = new StdInOutParser();

readline.on('line', function (str: string) {
    if (!str.trim()) return;

    const parsed = parser.parseInputString(str);
    const calculator = PokerCalculatorFactory.createCalculator(parsed.game);
    const results = calculator.calculate(parsed.handsCards, parsed.boardCards);

    console.log(parser.createOutputString(results.reverse()));
});

readline.on('close', function () {
    setTimeout(() => process.exit(0), 1000);
});
