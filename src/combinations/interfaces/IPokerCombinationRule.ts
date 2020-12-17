import { ECardPosition, IPokerCard, TCardValue } from "@app/cards";

export enum EPokerCombinationRuleType {
    CARD_COUNT = 'CARD_COUNT',
    SAME_CARD_SUITE = 'SAME_CARD_SUITE',
    CARD_VALUE = 'CARD_VALUE',
}

export interface IPokerCombinationRule {
    filter(cards: IPokerCard[]): boolean;
}

export interface IPokerCombinationRuleParams {}

export interface IPokerCombinationRuleCountParams extends IPokerCombinationRuleParams {
    belongsTo?: ECardPosition;
    count: number[];
}

export interface IPokerCombinationRuleValueParams extends IPokerCombinationRuleParams {
    values: TCardValue[];
}

export type IPokerCombinationRuleSameSuiteParams = IPokerCombinationRuleParams;
