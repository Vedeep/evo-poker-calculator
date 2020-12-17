import { IPokerCard } from '@app/cards';
import { IPokerCombinationParams } from './IPokerCombination';

export interface IPokerSetCombinationParams extends IPokerCombinationParams  {
    items: number[];
}

export interface IPokerSetCombinationItem<C extends IPokerCard> {
    cards: C[];
    id: number;
}
