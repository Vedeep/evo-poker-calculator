import { IPokerCard, TCardValue } from "./IPokerCard";

export interface IPokerSet {
    getSequences(): IPokerCard[][];
    getCardIndex(value: TCardValue): number;
}
