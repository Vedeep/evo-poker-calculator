import { IPokerCard, IPokerCardDeck, IPokerSet, TCardValue } from "./interfaces";

export class PokerSet<C extends IPokerCard, D extends IPokerCardDeck> implements IPokerSet {
    protected sequences?: C[][];
    protected matrix?: (C|null)[][];
    protected matrixColumnSum?: number[];
    protected matrixRowSum?: number[];

    constructor(
        protected readonly deck: D,
        protected readonly cards: C[],
    ) {}
    
    public getSequences(): C[][] {
        if (!this.sequences) {
            const sequences = new Map();
            const columnSum = this.getMatrixColumnSum();

            let last = -1;
            for (const [col, sum] of columnSum.entries()) {
                if (sum === 0) {
                    last = -1;
                } else {
                    sequences.set(col, 1);
            
                    if (last === -1) {
                        last = col;
                    } else {
                        for (let j = last; j < col; j++) {
                            if (!sequences.has(j)) continue;
                            
                            let v = sequences.get(j)!;
                            sequences.set(j, ++v);
                        }
                    }
                }
            }

            this.sequences = [];

            for (const [k, v] of sequences.entries()) {
                if (v <= 1) continue;

                this.sequences.push(this.getCards(k, k + v));
            }
        }

        return this.sequences;
    }

    public getCards(from: number, to: number, row: number|null = null): C[] {
        const r: C[] = [];

        const fromRow = row === null ? 0 : row;
        const toRow = row === null ? 4 : row + 1;

        const cardMatrix = this.getCardMatrix();

        for (let i = from; i < to; i++) {
            for (let j = fromRow; j < toRow; j++) {
                if (!cardMatrix[i][j]) continue;

                r.push(cardMatrix[i][j] as C);
            }
        }

        return r;
    }

    public getCardsInRowLength(): number {
        return this.deck.getValues().length;
    }

    public getMatrixColumnSum(): number[] {
        this.initMatrix();

        return this.matrixColumnSum!;
    }

    public getMatrixRowSum(): number[] {
        this.initMatrix();

        return this.matrixRowSum!;
    }

    public getCardIndex(value: TCardValue): number {
        return this.deck.getCardSort(value);
    }

    private getCardMatrix(): (C|null)[][] {
        this.initMatrix();

        return this.matrix!;
    }

    private initMatrix(): void {
        if (this.matrix) {
            return;
        }

        this.cards.sort((c1, c2) => {
            const s1 = this.deck.getCardSort(c1.getValue());
            const s2 = this.deck.getCardSort(c2.getValue());
            return s1 === s2 ? 0:  (s1 > s2 ? 1 : -1);
        });

        const cardByValueAndSuit: Map<string, C> = new Map();

        for (const card of this.cards) {
            cardByValueAndSuit.set(card.getValue() + card.getSuit(), card);
        }

        this.matrix = [];
        this.matrixColumnSum = [];
        this.matrixRowSum = [];

        for (const [j, suit] of this.deck.getSuits().entries()) {
            for (const [i, v] of this.deck.getValues().entries()) {
                if (!this.matrix[i]) {
                    this.matrix[i] = [];
                }

                if (!this.matrixColumnSum[i]) {
                    this.matrixColumnSum[i] = 0;
                }

                const card = cardByValueAndSuit.get(v + suit) || null;

                this.matrix[i].push(card);

                if (card) {
                    this.matrixColumnSum[i]++;
                    this.matrixRowSum[j] = (this.matrixRowSum[j] || 0) + 1;
                }
            }
        }
    }
}
