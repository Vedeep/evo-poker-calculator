import { ECardPosition, EPockerDeckType, PokerCardDeck } from "@app/cards";
import { CardCountCombinationRule, CardSameSuiteCombinationRule, CardValueCombinationRule, PokerSameSuiteCombination, PokerSequenceCombination, PokerSetCombination, PokerValuesCombination } from "@app/combinations";
import { PokerCalculator } from "./PokerCalculator";

export class PokerCalculatorFactory {
    public static createCalculator(type: EPockerDeckType): PokerCalculator {
        switch (type) {
            case EPockerDeckType.HOLDEM:
                return this.createHoldemCalculator();

            case EPockerDeckType.OMAHA:
                return this.createOmahaCalculator();

            case EPockerDeckType.FIVE_CARD_DRAW:
                return this.createFiveCardDrawCalculator();
        }
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
                    id: 'Straight Flush',
                    length: 5,
                    weight: 9,
                }, [
                    new CardValueCombinationRule({
                        values: ['T', 'J', 'Q', 'K', 'A']
                    }),
                    new CardSameSuiteCombinationRule({}),
                ]),
                new PokerSetCombination({
                    id: 'Four of a kind',
                    items: [4],
                    weight: 8,
                }, []),
                new PokerSetCombination({
                    id: 'Full House',
                    items: [3, 2],
                    weight: 7,
                }, []),
                new PokerSameSuiteCombination({
                    id: 'Flush',
                    length: 5,
                    weight: 6,
                }, []),
                new PokerSequenceCombination({
                    id: 'Straight',
                    length: 5,
                    weight: 5,
                }, []),
                new PokerValuesCombination({
                    id: 'Straight (lower)',
                    values: ['A', '2', '3', '4', '5'],
                    weight: 4,
                }, []),
                new PokerSetCombination({
                    id: 'Three of a kind',
                    items: [3],
                    weight: 3,
                }, []),
                new PokerSetCombination({
                    id: 'Two pairs',
                    items: [2, 2],
                    weight: 2,
                }, []),
                new PokerSetCombination({
                    id: 'Pair',
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
                    id: 'Straight Flush',
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
                    id: 'Four of a kind',
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
                    id: 'Full House',
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
                    id: 'Flush',
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
                    id: 'Straight',
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
                    id: 'Straight (lower)',
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
                    id: 'Three of a kind',
                    items: [3],
                    weight: 3,
                }, [
                    new CardCountCombinationRule({
                        belongsTo: ECardPosition.HAND,
                        count: [0, 2],
                    }),
                ]),
                new PokerSetCombination({
                    id: 'Two pairs',
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
                    id: 'Pair',
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
                    id: 'Straight Flush',
                    length: 5,
                    weight: 9,
                }, [
                    new CardValueCombinationRule({
                        values: ['T', 'J', 'Q', 'K', 'A']
                    }),
                    new CardSameSuiteCombinationRule({}),
                ]),
                new PokerSetCombination({
                    id: 'Four of a kind',
                    items: [4],
                    weight: 8,
                }, []),
                new PokerSetCombination({
                    id: 'Full House',
                    items: [3, 2],
                    weight: 7,
                }, []),
                new PokerSameSuiteCombination({
                    id: 'Flush',
                    length: 5,
                    weight: 6,
                }, []),
                new PokerSequenceCombination({
                    id: 'Straight',
                    length: 5,
                    weight: 5,
                }, []),
                new PokerValuesCombination({
                    id: 'Straight (lower)',
                    values: ['A', '2', '3', '4', '5'],
                    weight: 4,
                }, []),
                new PokerSetCombination({
                    id: 'Three of a kind',
                    items: [3],
                    weight: 3,
                }, []),
                new PokerSetCombination({
                    id: 'Two pairs',
                    items: [2, 2],
                    weight: 2,
                }, []),
                new PokerSetCombination({
                    id: 'Pair',
                    items: [2],
                    weight: 1,
                }, []),
            ]
        );
    }
}
