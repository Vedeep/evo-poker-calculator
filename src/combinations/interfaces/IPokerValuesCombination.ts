import { IPokerCombinationParams } from './IPokerCombination';
import { TCardValue } from '@app/cards';

export interface IPokerValuesCombinationParams extends IPokerCombinationParams  {
    values: TCardValue[];
}