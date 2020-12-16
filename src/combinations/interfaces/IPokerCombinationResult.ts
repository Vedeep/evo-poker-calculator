import { IPokerCard } from "@app/cards/interfaces/IPokerCard";

export interface IPokerCombinationResult {
    getId(): string;
    getCards(): IPokerCard[];
    getWeight(): number[];
    addCards(cards: IPokerCard[]): void;
    addWeight(weight: number[]): void;
}
