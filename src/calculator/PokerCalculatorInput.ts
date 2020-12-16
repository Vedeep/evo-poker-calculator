import { PokerCard } from "@app/cards";
import { IPokerCalculatorInput } from "./interfaces/IPokerCalculator";

export class PokerCalculatorInput implements IPokerCalculatorInput {
    constructor(
        public id: string|number,
        public cards: PokerCard[],
    ) {}
}
