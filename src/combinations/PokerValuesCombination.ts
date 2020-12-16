import { AbstractPokerCombination } from "./AbstractPokerCombination";
import { EPokerCombinationType, IPokerCombinationRule, IPokerValuesCombinationParams } from "./interfaces";
import { PokerCard, PokerCardDeck, PokerSet, TCardValue } from "@app/cards";

export class PokerValuesCombination extends AbstractPokerCombination<IPokerValuesCombinationParams, PokerCard, IPokerCombinationRule> {
    public getType(): EPokerCombinationType {
        return EPokerCombinationType.VALUES
    }

    private getValues(): TCardValue[] {
        return this.getParams().values;
    }

    protected getCombinations(set: PokerSet<PokerCard, PokerCardDeck>): PokerCard[][] {
        const values: TCardValue[] = this.getValues();
        const allCards: PokerCard[][] = [];

        for (const card of values) {
            const index: number = set.getCardIndex(card);
            const current: PokerCard[] = set.getCards(index, index + 1);

            if (current.length) {
                allCards.push(current);
                continue;
            }

            break;
        }

        if (allCards.length !== values.length) {
            return [];
        }

        const result: PokerCard[][] = [];
        this.getCombinationsRecursive(result, this.flatten(allCards));

        return result;
    }
}
