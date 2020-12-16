import { ECardPosition, IPokerCard, TCardValue } from "@app/cards";

export enum EPokerCombinationRuleType {
    CARD_COUNT = 'CARD_COUNT',
    SAME_CARD_SUITE = 'SAME_CARD_SUITE',
    CARD_VALUE = 'CARD_VALUE',
}

export interface IPokerCombinationRule {
    // getType(): EPokerCombinationRuleType;
    filter(cards: IPokerCard[]): boolean;
}

export interface IPokerCombinationRuleParams {
    // type: EPokerCombinationRuleType;
}

export interface IPokerCombinationRuleCountParams extends IPokerCombinationRuleParams {
    belongsTo?: ECardPosition;
    count: number[];
}

export interface IPokerCombinationRuleValueParams extends IPokerCombinationRuleParams {
    values: TCardValue[];
}

export interface IPokerCombinationRuleSameSuiteParams extends IPokerCombinationRuleParams {}
