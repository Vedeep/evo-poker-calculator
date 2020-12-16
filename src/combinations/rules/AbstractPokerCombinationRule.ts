import { IPokerCard } from "@app/cards";
import { IPokerCombinationRule, IPokerCombinationRuleParams } from "../interfaces";

export abstract class AbstractPokerCombinationRule<P extends IPokerCombinationRuleParams> implements IPokerCombinationRule {
    constructor(
        protected readonly params: P,
    ) {}

    public abstract filter(cards: IPokerCard[]): boolean;
}
