import { EPokerCalculatorGame, PokerCalculatorInput } from "@app/calculator";
import { PokerCard } from "@app/cards";

export interface IStdInOutParserResult {
    game: EPokerCalculatorGame;
    boardCards: PokerCard[];
    handsCards: PokerCalculatorInput[];
}
