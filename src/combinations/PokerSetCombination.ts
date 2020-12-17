import { AbstractPokerCombination } from "./AbstractPokerCombination";
import { EPokerCombinationType, IPokerCombinationRule, IPokerSetCombinationParams, IPokerSetCombinationItem } from "./interfaces";
import { PokerCard, PokerCardDeck, PokerSet } from "@app/cards";

export class PokerSetCombination extends AbstractPokerCombination<IPokerSetCombinationParams, PokerCard, IPokerCombinationRule> {
    public getType(): EPokerCombinationType {
        return EPokerCombinationType.SET;
    }

    public getCombinationWeight(set: PokerSet<PokerCard, PokerCardDeck>, cards: PokerCard[]): number[] {
        const result: number[] = [this.getWeight()];
        const weightByCard: {[index: string]: {
            count: number,
            weight: number
        }} = {};

        for (const card of cards) {
            if (!weightByCard[card.getValue()]) {
                weightByCard[card.getValue()] = {
                    count: 0,
                    weight: 0
                };
            }

            weightByCard[card.getValue()].count++;
            weightByCard[card.getValue()].weight += set.getCardIndex(card.getValue());
        }

        const weight = Object.values(weightByCard).sort((w1, w2) => {
            if (w1.count === w2.count) {
                return w1.weight === w2.weight ? 0 : (w1.weight > w2.weight ? 1 : -1);
            }

            return w1.count > w2.count ? 1 : -1;
        }).map(w => w.weight);

        return result.concat(weight);
    }

    protected getItems(): number[] {
        return this.getParams().items;
    }

    private getSets(set: PokerSet<PokerCard, PokerCardDeck>, length: number): PokerCard[][] {
        const result: PokerCard[][] = [];
        const matrixColumnSum: number[] = set.getMatrixColumnSum();
    
        for (const [column, sum] of matrixColumnSum.entries()) {
            if (sum < length) {
                continue;
            }

            const cards: PokerCard[] = set.getCards(column, column + 1);
            this.getCombinationsOfSetRecursive(result, cards, length);
        }
    
        return result;
    }

    private isSetEquals(s1: IPokerSetCombinationItem<PokerCard>, s2: IPokerSetCombinationItem<PokerCard>): boolean {
        return s1.id === s2.id;
    }

    protected getCombinations(set: PokerSet<PokerCard, PokerCardDeck>): PokerCard[][] {
        const currentCombinations: PokerCard[][][] = this.getItems().map(length => this.getSets(set, length));

        if (!currentCombinations.every(combs => combs.length > 0)) {
            return [];
        }

        const sequence: IPokerSetCombinationItem<PokerCard>[] = currentCombinations.reduce((acc: IPokerSetCombinationItem<PokerCard>[], comb: PokerCard[][], i: number) => {
            acc.push(...comb.map((cards: PokerCard[]) => {
                return {
                    cards,
                    id: i
                };
            }));

            return acc;
        }, []);

        const result: IPokerSetCombinationItem<PokerCard>[][] = [];
        this.getCombinationsRecursive(result, sequence, null, this.isSetEquals);

        return result.map(comb => this.flatten(comb.map(c => c.cards)));
    }
}
