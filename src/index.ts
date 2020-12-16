import { PokerCalculatorFactory } from "./calculator";
import { PokerCalculator } from "./calculator/PokerCalculator";
import { PokerCalculatorInput } from "./calculator/PokerCalculatorInput";
import { ECardPosition, EPockerDeckType, PokerCard, PokerCardDeck } from "./cards";
import { 
    CardCountCombinationRule,
    CardSameSuiteCombinationRule,
    CardValueCombinationRule,
    PokerSameSuiteCombination,
    PokerSequenceCombination,
    PokerSetCombination,
    PokerValuesCombination
} from "./combinations";

const calculator = PokerCalculatorFactory.createOmahaCalculator();

const handCards = [
    new PokerCard(
        'C',
        '2',
        ECardPosition.HAND,
    ),
    new PokerCard(
        'C',
        '8',
        ECardPosition.HAND,
    ),
    new PokerCard(
        'C',
        'A',
        ECardPosition.HAND,
    ),
    new PokerCard(
        'C',
        'A',
        ECardPosition.HAND,
    ),
];

const handCards2 = [
    new PokerCard(
        'D',
        '2',
        ECardPosition.HAND,
    ),
    new PokerCard(
        'D',
        '3',
        ECardPosition.HAND,
    ),
    new PokerCard(
        'D',
        '9',
        ECardPosition.HAND,
    ),
    new PokerCard(
        'D',
        'K',
        ECardPosition.HAND,
    ),
];

const tableCards = [
    new PokerCard(
        'H',
        '4',
        ECardPosition.TABLE,
    ),
    new PokerCard(
        'H',
        '5',
        ECardPosition.TABLE,
    ),
    new PokerCard(
        'H',
        '6',
        ECardPosition.TABLE,
    ),
    new PokerCard(
        'H',
        '7',
        ECardPosition.TABLE,
    ),
    new PokerCard(
        'H',
        '8',
        ECardPosition.TABLE,
    ),
    new PokerCard(
        'H',
        'A',
        ECardPosition.TABLE,
    ),
];

const calcInput = [new PokerCalculatorInput(
    1,
    handCards
), new PokerCalculatorInput(
    2,
    handCards2
)];

console.time('calc')
console.log(JSON.stringify(calculator.calculate(
    calcInput,
    tableCards
), null, 2))
console.timeEnd('calc')
