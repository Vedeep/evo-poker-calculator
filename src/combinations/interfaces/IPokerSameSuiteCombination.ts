import { IPokerCard } from '@app/cards';
import { IPokerCombination, IPokerCombinationParams } from './IPokerCombination';

// export interface IPokerSequenceCombination extends IPokerCombination {
//     getSequenceLength(): number;
// }

export interface IPokerSameSuiteCombinationParams extends IPokerCombinationParams  {
    length: number;
}
