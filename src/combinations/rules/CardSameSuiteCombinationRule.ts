import { IPokerCard } from "@app/cards";
import { IPokerCombinationRuleSameSuiteParams } from "../interfaces";
import { AbstractPokerCombinationRule } from "./AbstractPokerCombinationRule";

export class CardSameSuiteCombinationRule extends AbstractPokerCombinationRule<IPokerCombinationRuleSameSuiteParams> {
    public filter(cards: IPokerCard[]): boolean {
        return cards.length > 1 ? cards.every(c => c.getSuit() === cards[0].getSuit()) : true;
    }
}
