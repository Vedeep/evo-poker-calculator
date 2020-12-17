import { IPokerCombinationResult } from "@app/combinations";
import { IPokerCalculatorOutput } from "./interfaces/IPokerCalculator";

export class PokerCalculatorOutput<R extends IPokerCombinationResult> implements IPokerCalculatorOutput {
    private equals: Set<PokerCalculatorOutput<R>> = new Set();

    constructor(
        public id: string|number,
        public combination: R,
    ) {}

    public getId(): string|number {
        return this.id;
    }

    public getCombination(): R {
        return this.combination;
    }

    public addEqual(o: PokerCalculatorOutput<R>): void {
        this.equals.add(o);
    }

    public isEqual(o: PokerCalculatorOutput<R>): boolean {
        return this.equals.has(o);
    }
}
