import { IPokerCardDeck, TCardSuit, TCardValue } from "./interfaces";

export enum EPockerDeckType {
    HOLDEM,
    OMAHA,
    FIVE_CARD_DRAW
}

export class PokerCardDeck implements IPokerCardDeck {
    private sortByValue?: Map<TCardValue, number>;

    constructor(
        protected readonly cards: TCardValue[],
        protected readonly suits: TCardSuit[],
    ) {}

    public getValues(): TCardValue[] {
        return this.cards;
    }

    public getSuits(): TCardSuit[] {
        return this.suits;
    }

    public getCardSort(v: TCardValue): number {
        if (!this.sortByValue) {
            this.sortByValue = new Map();

            for (const [i, c] of this.cards.entries()) {
                this.sortByValue.set(c, i);
            }
        }

        return this.sortByValue.get(v)!;
    }

    public static createDeck(type: EPockerDeckType): PokerCardDeck {
        switch (type) {
            case EPockerDeckType.HOLDEM:
            case EPockerDeckType.OMAHA:
            case EPockerDeckType.FIVE_CARD_DRAW: {
                return new this(
                    ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'],
                    ['H', 'D', 'C', 'S']
                );
            }
        }

        throw new Error('Wrong type of poker game');
    }
}
