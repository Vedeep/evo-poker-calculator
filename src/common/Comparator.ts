import { IPokerCombinationResult } from "@app/combinations";

export class Comparator {
    public static compareCombinationResults(comb1: IPokerCombinationResult, comb2: IPokerCombinationResult): number {
        const weight1: number[] = comb1.getWeight();
        const weight2: number[] = comb2.getWeight();

        for (const i in weight1) {
            if (weight1[i] === weight2[i]) continue;

            return weight1[i] > weight2[i] ? -1 : 1;
        }

        return 0;
    }
}
