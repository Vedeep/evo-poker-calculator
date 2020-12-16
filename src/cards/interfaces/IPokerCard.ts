export enum ECardSuit {
    CLUB = 'CLUB',
    DIAMOND = 'DIAMOND',
    HEARTH = 'HEARTH',
    SPADE = 'SPADE'
}

export enum ECardPosition {
    HAND = 'HAND',
    TABLE = 'TABLE',
}

export type TCardValue = '2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'|'T'|'J'|'Q'|'K'|'A';
export type TCardSuit = 'H'|'D'|'C'|'S';

export interface IPokerCard {
    getSuit(): TCardSuit;
    getValue(): TCardValue;
    getPosition(): ECardPosition;
}
