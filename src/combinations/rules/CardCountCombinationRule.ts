import { IPokerCard } from "@app/cards";
import { IPokerCombinationRuleCountParams } from "../interfaces";
import { AbstractPokerCombinationRule } from "./AbstractPokerCombinationRule";

export class CardCountCombinationRule extends AbstractPokerCombinationRule<IPokerCombinationRuleCountParams> {
    public filter(cards: IPokerCard[]) {
        const from = this.params.count[0];
        const to = this.params.count.length > 1 ? this.params.count[1] : this.params.count[0];

        let filterCards: IPokerCard[] = cards;

        if (this.params.belongsTo) {
            filterCards = cards.filter(c => c.getPosition() === this.params.belongsTo);
        }

        return filterCards.length >= from && filterCards.length <= to;
    }
}
