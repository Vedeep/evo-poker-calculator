import { IPokerCard } from "@app/cards";
import { IPokerCombinationResult } from "./interfaces";

export class PokerCombinationResult<C extends IPokerCard> implements IPokerCombinationResult {
    constructor(
        protected readonly id: string,
        protected readonly cards: C[],
        protected readonly weight: number[],
    ) {}

    public getId(): string {
        return this.id;
    }
    
    public getCards(): C[] {
        return this.cards;
    }

    public getWeight(): number[] {
        return this.weight;
    }
    
    public addCards(cards: C[]): void {
        this.cards.push(...cards);
    }

    public addWeight(weight: number[]): void {
        this.weight.push(...weight);
    }
}
