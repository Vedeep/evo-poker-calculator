import { IPokerCard } from "@app/cards";
import { IPokerCombinationResult } from "@app/combinations";
import { IPokerCalculatorOutput } from "./interfaces/IPokerCalculator";

export class PokerCalculatorOutput implements IPokerCalculatorOutput {
    constructor(
        public id: string|number,
        public weight: number,
        public combination: IPokerCombinationResult|null,
    ) {}
}
