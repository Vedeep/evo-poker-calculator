import { IPokerCard, TCardValue, TCardSuit, ECardPosition } from "./interfaces";

export class PokerCard implements IPokerCard {
    constructor(
        private readonly suit: TCardSuit,
        private readonly value: TCardValue,
        private readonly position: ECardPosition,
    ) {}

    public getSuit(): TCardSuit {
        return this.suit;
    }

    public getValue(): TCardValue {
        return this.value;
    }

    public getPosition(): ECardPosition {
        return this.position;
    }
}
