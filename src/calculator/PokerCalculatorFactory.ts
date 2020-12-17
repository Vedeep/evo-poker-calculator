import { ECardPosition, EPockerDeckType, PokerCardDeck } from "@app/cards";
import { CardCountCombinationRule, CardSameSuiteCombinationRule, CardValueCombinationRule, EPokerCombination, PokerSameSuiteCombination, PokerSequenceCombination, PokerSetCombination, PokerValuesCombination } from "@app/combinations";
import { EPokerCalculatorGame } from "./interfaces";
import { PokerCalculator } from "./PokerCalculator";

export class PokerCalculatorFactory {
    private static instances: {[index: string]: PokerCalculator} = {};

    public static createCalculator(type: EPokerCalculatorGame): PokerCalculator {
        if (!this.instances[type]) {
            switch (type) {
                case EPokerCalculatorGame.HOLDEM:
                    this.instances[type] = this.createHoldemCalculator();
                    break;
    
                case EPokerCalculatorGame.OMAHA:
                    this.instances[type] = this.createOmahaCalculator();
                    break;
    
                default:
                    this.instances[type] = this.createFiveCardDrawCalculator();
            }
        }

        return this.instances[type];
    }

    public static createHoldemCalculator(): PokerCalculator {
        return new PokerCalculator(
            {
                combinationLength: 5,
                handCardCount: Infinity,
                tableCardCount: Infinity,
            },
            PokerCardDeck.createDeck(EPockerDeckType.OMAHA),
            [
                new PokerSequenceCombination({
                    id: EPokerCombination.STRAIGHT_FLUSH,
                    length: 5,
                    weight: 9,
                }, [
                    new CardValueCombinationRule({
                        values: ['T', 'J', 'Q', 'K', 'A']
                    }),
                    new CardSameSuiteCombinationRule({}),
                ]),
                new PokerSetCombination({
                    id: EPokerCombination.FOUR_KIND,
                    items: [4],
                    weight: 8,
                }, []),
                new PokerSetCombination({
                    id: EPokerCombination.FULL_HOUSE,
                    items: [3, 2],
                    weight: 7,
                }, []),
                new PokerSameSuiteCombination({
                    id: EPokerCombination.FLUSH,
                    length: 5,
                    weight: 6,
                }, []),
                new PokerSequenceCombination({
                    id: EPokerCombination.STRAIGHT,
                    length: 5,
                    weight: 5,
                }, []),
                new PokerValuesCombination({
                    id: EPokerCombination.STRAIGHT_LOWER,
                    values: ['A', '2', '3', '4', '5'],
                    weight: 4,
                }, []),
                new PokerSetCombination({
                    id: EPokerCombination.THREE_KIND,
                    items: [3],
                    weight: 3,
                }, []),
                new PokerSetCombination({
                    id: EPokerCombination.TWO_PAIRS,
                    items: [2, 2],
                    weight: 2,
                }, []),
                new PokerSetCombination({
                    id: EPokerCombination.PAIR,
                    items: [2],
                    weight: 1,
                }, []),
            ]
        );
    }

    public static createOmahaCalculator(): PokerCalculator {
        return new PokerCalculator(
            {
                combinationLength: 5,
                handCardCount: 2,
                tableCardCount: 3,
            },
            PokerCardDeck.createDeck(EPockerDeckType.OMAHA),
            [
                new PokerSequenceCombination({
                    id: EPokerCombination.STRAIGHT_FLUSH,
                    length: 5,
                    weight: 9,
                }, [
                    new CardValueCombinationRule({
                        values: ['T', 'J', 'Q', 'K', 'A']
                    }),
                    new CardSameSuiteCombinationRule({}),
                    new CardCountCombinationRule({
                        belongsTo: ECardPosition.TABLE,
                        count: [3, 3],
                    }),
                    new CardCountCombinationRule({
                        belongsTo: ECardPosition.HAND,
                        count: [2, 2],
                    }),
                ]),
                new PokerSetCombination({
                    id: EPokerCombination.FOUR_KIND,
                    items: [4],
                    weight: 8,
                }, [
                    new CardCountCombinationRule({
                        belongsTo: ECardPosition.TABLE,
                        count: [2, 3],
                    }),
                    new CardCountCombinationRule({
                        belongsTo: ECardPosition.HAND,
                        count: [1, 2],
                    }),
                ]),
                new PokerSetCombination({
                    id: EPokerCombination.FULL_HOUSE,
                    items: [3, 2],
                    weight: 7,
                }, [
                    new CardCountCombinationRule({
                        belongsTo: ECardPosition.TABLE,
                        count: [3, 3],
                    }),
                    new CardCountCombinationRule({
                        belongsTo: ECardPosition.HAND,
                        count: [2, 2],
                    }),
                ]),
                new PokerSameSuiteCombination({
                    id: EPokerCombination.FLUSH,
                    length: 5,
                    weight: 6,
                }, [
                    new CardCountCombinationRule({
                        belongsTo: ECardPosition.TABLE,
                        count: [3, 3],
                    }),
                    new CardCountCombinationRule({
                        belongsTo: ECardPosition.HAND,
                        count: [2, 2],
                    }),
                ]),
                new PokerSequenceCombination({
                    id: EPokerCombination.STRAIGHT,
                    length: 5,
                    weight: 5,
                }, [
                    new CardCountCombinationRule({
                        belongsTo: ECardPosition.TABLE,
                        count: [3, 3],
                    }),
                    new CardCountCombinationRule({
                        belongsTo: ECardPosition.HAND,
                        count: [2, 2],
                    }),
                ]),
                new PokerValuesCombination({
                    id: EPokerCombination.STRAIGHT_LOWER,
                    values: ['A', '2', '3', '4', '5'],
                    weight: 4,
                }, [
                    new CardCountCombinationRule({
                        belongsTo: ECardPosition.TABLE,
                        count: [3, 3],
                    }),
                    new CardCountCombinationRule({
                        belongsTo: ECardPosition.HAND,
                        count: [2, 2],
                    }),
                ]),
                new PokerSetCombination({
                    id: EPokerCombination.THREE_KIND,
                    items: [3],
                    weight: 3,
                }, [
                    new CardCountCombinationRule({
                        belongsTo: ECardPosition.HAND,
                        count: [0, 2],
                    }),
                ]),
                new PokerSetCombination({
                    id: EPokerCombination.TWO_PAIRS,
                    items: [2, 2],
                    weight: 2,
                }, [
                    new CardCountCombinationRule({
                        belongsTo: ECardPosition.TABLE,
                        count: [2, 3],
                    }),
                    new CardCountCombinationRule({
                        belongsTo: ECardPosition.HAND,
                        count: [1, 2],
                    }),
                ]),
                new PokerSetCombination({
                    id: EPokerCombination.PAIR,
                    items: [2],
                    weight: 1,
                }, [
                ]),
            ]
        );
    }

    public static createFiveCardDrawCalculator(): PokerCalculator {
        return new PokerCalculator(
            {
                combinationLength: 5,
                handCardCount: Infinity,
                tableCardCount: Infinity,
            },
            PokerCardDeck.createDeck(EPockerDeckType.OMAHA),
            [
                new PokerSequenceCombination({
                    id: EPokerCombination.STRAIGHT_FLUSH,
                    length: 5,
                    weight: 9,
                }, [
                    new CardValueCombinationRule({
                        values: ['T', 'J', 'Q', 'K', 'A']
                    }),
                    new CardSameSuiteCombinationRule({}),
                ]),
                new PokerSetCombination({
                    id: EPokerCombination.FOUR_KIND,
                    items: [4],
                    weight: 8,
                }, []),
                new PokerSetCombination({
                    id: EPokerCombination.FULL_HOUSE,
                    items: [3, 2],
                    weight: 7,
                }, []),
                new PokerSameSuiteCombination({
                    id: EPokerCombination.FLUSH,
                    length: 5,
                    weight: 6,
                }, []),
                new PokerSequenceCombination({
                    id: EPokerCombination.STRAIGHT,
                    length: 5,
                    weight: 5,
                }, []),
                new PokerValuesCombination({
                    id: EPokerCombination.STRAIGHT_LOWER,
                    values: ['A', '2', '3', '4', '5'],
                    weight: 4,
                }, []),
                new PokerSetCombination({
                    id: EPokerCombination.THREE_KIND,
                    items: [3],
                    weight: 3,
                }, []),
                new PokerSetCombination({
                    id: EPokerCombination.TWO_PAIRS,
                    items: [2, 2],
                    weight: 2,
                }, []),
                new PokerSetCombination({
                    id: EPokerCombination.PAIR,
                    items: [2],
                    weight: 1,
                }, []),
            ]
        );
    }
}
