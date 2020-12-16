import { IPokerCard, IPokerSet } from '@app/cards';
import { IPokerCombinationResult } from './IPokerCombinationResult';
import { IPokerCombinationRule } from './IPokerCombinationRule';

export enum EPokerCombinationType {
    SEQUENCE = 'SEQUENCE',
    SET = 'SET',
    SAME_SUITE = 'SAME_SUITE',
    VALUES = 'VALUES'
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
    id: string;
    weight: number;
}

export interface IEqualsFunction {
    (item1: any, item2: any): boolean;
}
