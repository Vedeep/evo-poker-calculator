import { IPokerCard } from "@app/cards";
import { IPokerCombinationResult } from "@app/combinations";

export enum EPokerCalculatorGame  {
    HOLDEM = 'HOLDEM',
    OMAHA = 'OMAHA',
    FIVE_CARD_DRAW = 'FIVE_CARD_DRAW',
}

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
    getId(): string|number;
    getCombination(): IPokerCombinationResult;
    addEqual(o: IPokerCalculatorOutput): void;
    isEqual(o: IPokerCalculatorOutput): boolean;
}
