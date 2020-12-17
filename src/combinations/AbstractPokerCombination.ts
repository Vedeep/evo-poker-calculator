import { EPokerCombinationType, IEqualsFunction, IPokerCombination, IPokerCombinationParams } from "./interfaces/IPokerCombination";
import { IPokerCombinationRule } from "./interfaces";
import { IPokerCard, IPokerSet } from "@app/cards";
import { PokerCombinationResult } from "./PokerCombinationResult";
import { Comparator } from "@app/common";

export abstract class AbstractPokerCombination<P extends IPokerCombinationParams, C extends IPokerCard, U extends IPokerCombinationRule> implements IPokerCombination {
    constructor(
        protected readonly params: P,
        protected readonly rules: U[],
    ) {}

    public getId(): string {
        return this.getParams().id;
    }

    public abstract getType(): EPokerCombinationType;
    protected abstract getCombinations(set: IPokerSet): C[][];

    public getCombinationWeight(set: IPokerSet, cards: IPokerCard[]): number[] {
        const baseWeight: number = this.getWeight();
        const cardsWeight: number = cards.reduce((sum, c) => sum + set.getCardIndex(c.getValue()), 0);

        return [baseWeight, cardsWeight];
    }

    protected isCardsEquals(c1: C, c2: C): boolean {
        return c1.getValue() === c2.getValue();
    }

    protected getDuplicates(items: any[], equalsFunction: CallableFunction): C[][] {
        const result: C[][] = [];
        let prev;
        
        for (const item of items) {
            if (prev && equalsFunction(prev.item, item)) {
                if (prev.index === -1) {
                    prev.index = result.push([prev.item]) - 1;
                }
                
                result[prev.index].push(item);
            } else {
                prev = {
                    item: item,
                    index: -1
                };
            }
        }
    
        return Object.values(result).filter(d => d.length > 1);
    }

    protected getCombinationsOfSetRecursive(result: C[][], items: C[], length: number, from = 0, stack: number[] = []): void {
        if (items.length === length) {
            result.push(items);
            return;
        }
        
        for (let i = from; i < items.length; i++) {
            const currentStack: number[] = Object.assign([], stack);
            const lastValue: number = currentStack[currentStack.length - 1] || 0;
    
            if (currentStack.length && lastValue >= i) {
                continue;
            }
    
            currentStack.push(i);
    
            if (from < length - 1) {
                this.getCombinationsOfSetRecursive(result, items, length, from + 1, currentStack);
            } else {
                result.push(currentStack.map(i => items[i]));
            }
        }
    }

    protected getCombinationsRecursive(result: any[][], sequence: any[], duplicates?: any[]|null, equalsFunction: IEqualsFunction = this.isCardsEquals): void {
        if (!duplicates) {
            duplicates = this.getDuplicates(sequence, equalsFunction);
        }
    
        const duplicatesClone = duplicates!.slice(0);
        const currentDuplicates = duplicatesClone.shift() || [];
    
        for (let i = 0; i < (currentDuplicates.length || 1); i++) {
            const d = currentDuplicates[i];
            const currentResult: C[] = [];
            let used = false;
    
            for (const s of sequence) {
                if (d && equalsFunction(s, d)) {
                    if (!used) {
                        currentResult.push(d);
                        used = true;
                    }
    
                    continue;
                }
    
                currentResult.push(s);
            }
    
            if (duplicates!.length) {
                this.getCombinationsRecursive(result, currentResult, duplicatesClone, equalsFunction);
            } else {
                result.push(currentResult);
            }
        }
    }

    protected flatten(items: any[]): any[] {
        return items.reduce((acc: any[], item: any) => {
            if (Array.isArray(item)) {
                acc.push(...item);
            } else {
                acc.push(item);
            }
    
            return acc;
        }, []);
    }
    
    protected getCardsCombinations(cards: C[]): C[][] {
        const result: C[][] = [];

        this.getCombinationsRecursive(result, cards);

        return result;
    }

    protected hasSameCards(cards: C[]): boolean {
        return cards.some((card, i1) => {
            if (cards.some((card2, i2) => {
                return i1 !== i2 && card.getValue() === card2.getValue() && card2.getSuit() === card.getSuit();
            })) {
                return true;
            }
    
            return false;
        });
    }

    protected filterCombination(cards: C[]): boolean {
        let result = true;
    
        if (this.hasSameCards(cards)) {
            return false;
        }
    
        for (const condition of this.getRules()) {
            result = condition.filter(cards);

            if (!result) {
                break;
            }
        }
    
        return result;
    }

    public fintAll(set: IPokerSet): C[][] {
        const combinations: C[][] = this.getCombinations(set);
        const filtered: C[][] = combinations.filter(c => this.filterCombination(c));

        return filtered;
    }

    public findBest(set: IPokerSet): PokerCombinationResult<C>|null {
        const allCombinations = this.fintAll(set);

        if (!allCombinations.length) {
            return null;
        }

        const results = allCombinations.map(c => new PokerCombinationResult(
                this.getId(),
                c,
                this.getCombinationWeight(set, c)
            )
        );

        results.sort((r1, r2) => {
            return Comparator.compareCombinationResults(r1, r2);
        });
        
        return results[0];
    }

    protected getParams(): P {
        return this.params;
    }

    public getRules(): U[] {
        return this.rules;
    }

    public getWeight(): number {
        return this.params.weight;
    }
}
