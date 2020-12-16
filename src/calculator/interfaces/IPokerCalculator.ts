import { IPokerCard, IPokerCardDeck } from "@app/cards";
import { IPokerCombination, IPokerCombinationResult } from "@app/combinations";

export interface IPokerCalculator {
    calculate(handsCards: IPokerCalculatorInput[], boardCards: IPokerCard[]): IPokerCalculatorOutput[];
}

export interface IPokerCalculatorParams {
    combinationLength: number;
    handCardCount: number;
    tableCardCount: number;
}

export interface IPokerCalculatorInput {
    cards: IPokerCard[];
    id: string|number;
}

export interface IPokerCalculatorOutput {
    id: string|number;
    weight: number;
    combination: IPokerCombinationResult|null;
}
