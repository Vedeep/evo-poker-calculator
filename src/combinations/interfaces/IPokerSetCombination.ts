import { IPokerCard } from '@app/cards';
import { IPokerCombination, IPokerCombinationParams } from './IPokerCombination';

// export interface IPokerSequenceCombination extends IPokerCombination {
//     getSequenceLength(): number;
// }

export interface IPokerSetCombinationParams extends IPokerCombinationParams  {
    items: number[];
}

export interface IPokerSetCombinationItem<C extends IPokerCard> {
    cards: C[];
    id: number;
}
