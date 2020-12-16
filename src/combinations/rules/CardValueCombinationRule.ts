import { IPokerCard, TCardValue } from "@app/cards";
import { IPokerCombinationRuleValueParams } from "../interfaces";
import { AbstractPokerCombinationRule } from "./AbstractPokerCombinationRule";

export class CardValueCombinationRule extends AbstractPokerCombinationRule<IPokerCombinationRuleValueParams> {
    private getValues(): TCardValue[] {
        return this.params.values;
    }

    public filter(cards: IPokerCard[]) {
        return this.getValues().every(v => !!cards.find(c => c.getValue() === v));
    }
}
