import { PokerCalculatorFactory } from "./calculator";
import { StdInOutParser } from "./parser";

const strings = [
    'texas-holdem 4cKs4h8s7s Ad4s Ac4d As9s KhKd 5d6d',
    'texas-holdem 2h3h4h5d8d KdKs 9hJh',
    'omaha-holdem 3d3s4d6hJc Js2dKd8c KsAsTcTs Jh2h3c9c Qc8dAd6c 7dQsAc5d',
    'five-card-draw 7h4s4h8c9h Tc5h6dAc5c Kd9sAs3cQs Ah9d6s2cKh 4c8h2h6c9c',
];

const parser = new StdInOutParser();

for (const str of strings) {
    const parsed = parser.parseInputString(str);
    const calculator = PokerCalculatorFactory.createCalculator(parsed.game);

    const results = calculator.calculate(parsed.handsCards, parsed.boardCards);

    console.log(parser.createOutputString(results.reverse()));
}

