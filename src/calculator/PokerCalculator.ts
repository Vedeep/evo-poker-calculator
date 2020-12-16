import { IPokerCalculator, IPokerCalculatorParams } from "./interfaces/IPokerCalculator";
import { ECardPosition, PokerCard, PokerCardDeck, PokerSet } from "@app/cards";
import { IPokerCombination } from "@app/combinations";
import { PokerCalculatorInput } from "./PokerCalculatorInput";
import { PokerCalculatorOutput } from "./PokerCalculatorOutput";
import { PokerCombinationResult } from "@app/combinations/PokerCombinationResult";

export class PokerCalculatorResult {}

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

    public calculate(handsCards: PokerCalculatorInput[], boardCards: PokerCard[]): PokerCalculatorOutput[] {
        let result: PokerCalculatorOutput[] = [];

        for (const hand of handsCards) {
            const allCards = hand.cards.concat(boardCards || []);
            const set = new PokerSet<PokerCard, PokerCardDeck>(this.deck!, allCards);
            let handResult: PokerCalculatorOutput;
            
            for (const c of this.combinations!) {
                const combination = c.findBest(set) as PokerCombinationResult<PokerCard>;

                if (!combination) continue;

                if (combination.getCards().length < this.getCombinationLength()) {
                    const currentCards: PokerCard[] = combination.getCards();

                    const extraCards: PokerCard[] = [];

                    let availableHandCards: number = this.getHandCardCount() - currentCards.filter(c => c.getPosition() === ECardPosition.HAND).length;
                    let availableTableCards: number = this.getTableCardCount() - currentCards.filter(c => c.getPosition() === ECardPosition.TABLE).length;
                    let needCards: number = this.getCombinationLength() - currentCards.length;

                    allCards.sort((c1, c2) => {
                        const w1 = set.getCardIndex(c1.getValue());
                        const w2 = set.getCardIndex(c2.getValue());

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
                                };
                                break;

                            default:
                                if (availableTableCards > 0) {
                                    extraCards.push(card);
                                    availableTableCards--;
                                    needCards--;
                                };
                                break;
                        }


                        if (needCards === 0) {
                            break;
                        }
                    }

                    combination.addCards(extraCards);
                    combination.addWeight(extraCards.map(c => set.getCardIndex(c.getValue())));
                }

                // const biggest = combinations[combinations.length - 1];
                handResult = {
                    id: hand.id,
                    weight: c.getWeight(),
                    combination,
                };

                break;
            }

            result.push(handResult! || {
                id: hand.id,
                weight: 0,
                combination: null,
            });
        }

        return result;
    }
}
