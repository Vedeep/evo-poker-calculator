import { IPokerCard, IPokerSet } from '@app/cards';
import { IPokerCombinationResult } from './IPokerCombinationResult';
import { IPokerCombinationRule } from './IPokerCombinationRule';

export enum EPokerCombinationType {
    SEQUENCE = 'SEQUENCE',
    SET = 'SET',
    SAME_SUITE = 'SAME_SUITE',
    VALUES = 'VALUES'
}

export enum EPokerCombination {
    STRAIGHT_FLUSH = 'STRAIGHT_FLUSH',
    FOUR_KIND = 'FOUR_KIND',
    FULL_HOUSE = 'FULL_HOUSE',
    FLUSH = 'FLUSH',
    STRAIGHT = 'STRAIGHT',
    STRAIGHT_LOWER = 'STRAIGHT_LOWER',
    THREE_KIND = 'THREE_KIND',
    TWO_PAIRS = 'TWO_PAIRS',
    PAIR = 'PAIR',
    HIGH_CARD = 'HIGH_CARD',
}

export interface IPokerCombination {
    fintAll(set: IPokerSet): IPokerCard[][];
    findBest(set: IPokerSet): IPokerCombinationResult|null;
    getType(): EPokerCombinationType;
    getRules(): IPokerCombinationRule[];
    getWeight(): number;
    getCombinationWeight(set: IPokerSet, combination: IPokerCard[]): number[];
    getId(): string;
}

export interface IPokerCombinationParams {
    id: string|EPokerCombination;
    weight: number;
}

export interface IEqualsFunction {
    (item1: any, item2: any): boolean;
}
