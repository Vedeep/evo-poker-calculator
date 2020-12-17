import { AbstractPokerCombination } from "./AbstractPokerCombination";
import { EPokerCombinationType, IPokerCombinationRule, IPokerSameSuiteCombinationParams } from "./interfaces";
import { PokerCard, PokerCardDeck, PokerSet } from "@app/cards";

export class PokerSameSuiteCombination extends AbstractPokerCombination<IPokerSameSuiteCombinationParams, PokerCard, IPokerCombinationRule> {
    public getType(): EPokerCombinationType {
        return EPokerCombinationType.SAME_SUITE
    }

    private getLength(): number {
        return this.getParams().length;
    }

    protected getCombinations(set: PokerSet<PokerCard, PokerCardDeck>): PokerCard[][] {
        const result: PokerCard[][] = [];
        const matrixRowSum: number[] = set.getMatrixRowSum();
        const length: number = this.getLength();
        
        for (const [row, sum] of matrixRowSum.entries()) {
            if (sum < length) continue;

            const cards = set.getCards(0, set.getCardsInRowLength(), row);

            this.getCombinationsOfSetRecursive(result, cards, length);
        }

        return result;
    }
}
