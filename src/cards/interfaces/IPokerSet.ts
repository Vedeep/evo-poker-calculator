import { TCardValue } from "./IPokerCard";

export interface IPokerSet {
    getSequences(): Map<number, number>;
    getCardIndex(value: TCardValue): number;
}
