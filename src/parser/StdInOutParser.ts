import { EPokerCalculatorGame, PokerCalculatorInput, PokerCalculatorOutput } from "@app/calculator";
import { ECardPosition, PokerCard, TCardSuit, TCardValue } from "@app/cards";
import { PokerCombinationResult } from "@app/combinations/PokerCombinationResult";
import { IStdInOutParserResult } from "./interfaces";

export type TInputPokerGame = 'texas-holdem'|'omaha-holdem'|'five-card-draw';

export class StdInOutParser {
    constructor() {}

    public parseInputString(str: string): IStdInOutParserResult {
        const arStrings: string[] = str.split(' ').map(s => s.trim());
        const game: EPokerCalculatorGame = this.getPokerGame(arStrings.shift() as TInputPokerGame);
        const boardCards: PokerCard[] = game === EPokerCalculatorGame.FIVE_CARD_DRAW ? [] : this.parseCards(arStrings.shift() as string, ECardPosition.TABLE);
        const handsCards: PokerCalculatorInput[] = arStrings.map(s => {
            const cards = this.parseCards(s, ECardPosition.HAND);

            return new PokerCalculatorInput(
                s,
                cards
            );
        });
        
        return {game, boardCards, handsCards};
    }

    public createOutputString(results: PokerCalculatorOutput<PokerCombinationResult<PokerCard>>[]): string {
        const resultStrings: string[][] = [];
        let prev: PokerCalculatorOutput<PokerCombinationResult<PokerCard>>;

        for (let result of results) {
            if (prev! && prev!.isEqual(result)) {
                resultStrings[resultStrings.length - 1].push(result.getId() as string);
            } else {
                resultStrings.push([result.getId() as string]);
            }

            prev = result;
        }

        return resultStrings.map(strings => strings.join('=')).join(' ');
    }

    private parseCards(str: string, position: ECardPosition): PokerCard[] {
        const arStr: string[][] = str.match(/.{2}/g)?.map(s => s.split(''))!;

        return arStr.map((str: string[]) => {
            return new PokerCard(
                str[1].toUpperCase() as TCardSuit,
                str[0].toUpperCase() as TCardValue,
                position
            );
        });
    }

    private getPokerGame(inputGame: TInputPokerGame): EPokerCalculatorGame {
        switch (inputGame) {
            case 'omaha-holdem':
                return EPokerCalculatorGame.OMAHA;

            case 'five-card-draw':
                return EPokerCalculatorGame.FIVE_CARD_DRAW;
        }

        return EPokerCalculatorGame.HOLDEM;
    }
}
