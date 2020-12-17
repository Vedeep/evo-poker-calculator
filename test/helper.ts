import { PokerCalculatorInput } from "@app/calculator";
import { ECardPosition, PokerCard, TCardSuit, TCardValue } from "@app/cards";

export class TestHelper {
    public static suits: TCardSuit[] = ['H', 'D', 'C', 'S'];
    public static values: TCardValue[] = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

    public static strMatrixToCards(strMatrix: string): {hand: PokerCalculatorInput[], board: PokerCard[]} {
        const numCards: string[] = strMatrix.trim().split(/[^0-9]+/);
        const result: {hand: PokerCalculatorInput[], board: PokerCard[]} = {hand: [], board: []};
        const hands: {[index: string]: PokerCard[]} = {};
        
        for (const [i, c] of numCards.entries()) {
            const nc = parseInt(c);
            const suit: TCardSuit = this.suits[Math.floor(i / 13)];
            const v = i - (13 * Math.floor(i / 13));
    
            if (nc === 0) continue;
    
            if (nc === 1) {
                result.board.push(new PokerCard(
                    suit,
                    this.values[v],
                    ECardPosition.TABLE,
                ));
            } else {
                if (!hands[nc]) {
                    hands[nc] = [];
                }
    
                hands[nc].push(new PokerCard(
                    suit,
                    this.values[v],
                    ECardPosition.HAND
                ));
            }
        }
    
        for (const [i, c] of Object.entries(hands)) {
            result.hand.push(new PokerCalculatorInput(i, c));
        }
    
        return result;
    }
}
