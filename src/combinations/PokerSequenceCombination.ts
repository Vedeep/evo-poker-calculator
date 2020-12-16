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

        for (const sequence of sequences) {
            if (sequence.length < this.getSequenceLength()) continue;

            const cardIndex = set.getCardIndex(sequence[0].getValue());
            const cards = set.getCards(cardIndex, cardIndex + this.getSequenceLength());
        
            this.getCombinationsRecursive(combinations, cards);
        }
console.log(combinations)
        return combinations;
    }
}
