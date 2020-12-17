import { IPokerCalculator, IPokerCalculatorParams } from "./interfaces/IPokerCalculator";
import { ECardPosition, PokerCard, PokerCardDeck, PokerSet } from "@app/cards";
import { EPokerCombination, IPokerCombination } from "@app/combinations";
import { PokerCalculatorInput } from "./PokerCalculatorInput";
import { PokerCalculatorOutput } from "./PokerCalculatorOutput";
import { PokerCombinationResult } from "@app/combinations/PokerCombinationResult";
import { Comparator } from "@app/common";

export class PokerCalculator implements IPokerCalculator {
    protected combinations: IPokerCombination[];

    constructor(
        private readonly params: IPokerCalculatorParams,
        private readonly deck: PokerCardDeck,
        combinations: IPokerCombination[],
    ) {
        this.combinations = combinations.slice(0);

        this.combinations.sort((c1, c2) => {
            return c1.getWeight() < c2.getWeight() ? 1 : -1;
        });
    }

    private getCombinationLength(): number {
        return this.params.combinationLength;
    }

    private getHandCardCount(): number {
        return this.params.handCardCount || Infinity;
    }

    private getTableCardCount(): number {
        return this.params.tableCardCount || Infinity;
    }

    private setExtraCads(output: PokerCalculatorOutput<PokerCombinationResult<PokerCard>>, allCards: PokerCard[]): void {
        const combination = output.getCombination();
        
        if (combination.getCards().length < this.getCombinationLength()) {
            const currentCards: PokerCard[] = combination.getCards();

            const extraCards: PokerCard[] = [];

            let availableHandCards: number = this.getHandCardCount() - currentCards.filter(c => c.getPosition() === ECardPosition.HAND).length;
            let availableTableCards: number = this.getTableCardCount() - currentCards.filter(c => c.getPosition() === ECardPosition.TABLE).length;
            let needCards: number = this.getCombinationLength() - currentCards.length;

            allCards.sort((c1, c2) => {
                const w1 = this.deck.getCardSort(c1.getValue());
                const w2 = this.deck.getCardSort(c2.getValue());

                return w1 === w2 ? 0 : (w1 > w2 ? -1 : 1);
            });

            for (const card of allCards) {
                if (currentCards.some(c => c === card)) continue;

                switch (card.getPosition()) {
                    case ECardPosition.HAND:
                        if (availableHandCards > 0) {
                            extraCards.push(card);
                            availableHandCards--;
                            needCards--;
                        }
                        break;

                    default:
                        if (availableTableCards > 0) {
                            extraCards.push(card);
                            availableTableCards--;
                            needCards--;
                        }
                        break;
                }


                if (needCards === 0) {
                    break;
                }
            }

            combination.addCards(extraCards);
            combination.addWeight(extraCards.map(c => this.deck.getCardSort(c.getValue())));
        }
    }

    public calculate(handsCards: PokerCalculatorInput[], boardCards: PokerCard[]): PokerCalculatorOutput<PokerCombinationResult<PokerCard>>[] {
        const result: PokerCalculatorOutput<PokerCombinationResult<PokerCard>>[] = [];

        for (const hand of handsCards) {
            const allCards = hand.cards.concat(boardCards || []);
            const set = new PokerSet<PokerCard, PokerCardDeck>(this.deck, allCards);
            let currentResult: PokerCalculatorOutput<PokerCombinationResult<PokerCard>>|null = null;
            
            for (const c of this.combinations) {
                const combination = c.findBest(set) as PokerCombinationResult<PokerCard>;

                if (!combination) continue;

                currentResult = new PokerCalculatorOutput(hand.id, combination);

                break;
            }

            if (!currentResult) {
                currentResult = new PokerCalculatorOutput(
                    hand.id,
                    new PokerCombinationResult(
                        EPokerCombination.HIGH_CARD,
                        [],
                        [0]
                    ),
                );
            }

            this.setExtraCads(currentResult, allCards);

            result.push(currentResult);
        }

        result.sort((r1, r2) => {
            const c = Comparator.compareCombinationResults(r1.getCombination(), r2.getCombination());

            if (c === 0) {
                r1.addEqual(r2);
                r2.addEqual(r1);
            }

            return c;
        });

        return result;
    }
}
