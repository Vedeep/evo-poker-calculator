import { TCardSuit, TCardValue } from "./IPokerCard";

export interface IPokerCardDeck {
    getValues(): TCardValue[];
    getSuits(): TCardSuit[];
    getCardSort(value: TCardValue): number;
}

export interface IPokerCardDeckParams {
    cards: TCardValue[];
    suits: TCardSuit[];
}
