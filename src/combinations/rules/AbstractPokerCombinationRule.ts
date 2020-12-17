import { IPokerCard } from "@app/cards";
import { IPokerCombinationRule } from "../interfaces";

export abstract class AbstractPokerCombinationRule<P> implements IPokerCombinationRule {
    constructor(
        protected readonly params: P,
    ) {}

    public abstract filter(cards: IPokerCard[]): boolean;
}
