import { AbstractPokerCombination } from "./AbstractPokerCombination";
import { EPokerCombinationType } from "./interfaces/IPokerCombination";
import { IPokerCombinationRule } from "./interfaces/IPokerCombinationRule";
import { IPokerSequenceCombinationParams } from "./interfaces";
import { PokerCard, PokerCardDeck } from "@app/cards";
import { PokerSet } from "@app/cards/PokerSet";

export class PokerSequenceCombination extends AbstractPokerCombination<IPokerSequenceCombinationParams, PokerCard, IPokerCombinationRule> {
    public getType(): EPokerCombinationType {
        return EPokerCombinationType.SEQUENCE
    }

    public getSequenceLength(): number {
        return this.getParams().length;
    }

    protected getCombinations(set: PokerSet<PokerCard, PokerCardDeck>): PokerCard[][] {
        const combinations: PokerCard[][] = [];
        const sequences = set.getSequences();

        for (const [column, sum] of sequences.entries()) {
            if (sum < this.getSequenceLength()) continue;

            const cards = set.getCards(column, column + this.getSequenceLength());
        
            this.getCombinationsRecursive(combinations, cards);
        }

        return combinations;
    }
}
