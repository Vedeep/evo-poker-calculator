import { IPokerCombination, IPokerCombinationParams } from './IPokerCombination';

// export interface IPokerSequenceCombination extends IPokerCombination {
//     getSequenceLength(): number;
// }

export interface IPokerSequenceCombinationParams extends IPokerCombinationParams  {
    length: number;
}
