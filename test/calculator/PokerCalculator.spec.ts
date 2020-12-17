import { PokerCalculatorFactory } from "@app/calculator";
import { EPokerCombination } from "@app/combinations";
import { TestHelper } from "../helper";

describe("PokerCalculator", function () {
    describe('Omaha', function () {
        it('should find a Straight Flush', function () {
            const calculator = PokerCalculatorFactory.createOmahaCalculator();
            const cards = TestHelper.strMatrixToCards(`
            0 0 0 0 0 0 0 0 1 2 1 2 1
            0 0 1 0 0 2 0 0 0 0 0 0 0
            0 0 0 0 2 0 0 0 0 0 0 0 0
            1 0 0 0 0 0 0 0 0 0 0 0 0
            `);
    
            const result = calculator.calculate(cards.hand, cards.board);
    
            expect(result.length).toBe(1);
            expect(result[0].getCombination().getId()).toBe(EPokerCombination.STRAIGHT_FLUSH);
            expect(result[0].getCombination().getCards().length).toBe(5);
        });

        it('should find a Four of a kind', function () {
            const calculator = PokerCalculatorFactory.createOmahaCalculator();
            const cards = TestHelper.strMatrixToCards(`
            2 0 1 0 0 0 0 0 0 0 0 0 0
            2 0 1 0 0 2 0 0 0 0 0 0 0
            1 0 0 0 1 2 0 0 0 0 0 0 0
            1 0 0 0 0 1 0 0 0 0 0 0 0
            `);
    
            const result = calculator.calculate(cards.hand, cards.board);
    
            expect(result.length).toBe(1);
            expect(result[0].getCombination().getId()).toBe(EPokerCombination.FOUR_KIND);
            expect(result[0].getCombination().getCards().length).toBe(5);
        });

        it('should find a Full house', function () {
            const calculator = PokerCalculatorFactory.createOmahaCalculator();
            const cards = TestHelper.strMatrixToCards(`
            2 0 1 0 0 0 0 0 0 0 0 0 0
            2 0 1 0 0 2 0 0 0 0 0 0 0
            1 0 1 0 1 2 0 0 0 0 0 0 0
            0 0 0 0 0 1 0 0 0 0 0 0 0
            `);
    
            const result = calculator.calculate(cards.hand, cards.board);
    
            expect(result.length).toBe(1);
            expect(result[0].getCombination().getId()).toBe(EPokerCombination.FULL_HOUSE);
            expect(result[0].getCombination().getCards().length).toBe(5);
        });

        it('should find a Flush', function () {
            const calculator = PokerCalculatorFactory.createOmahaCalculator();
            const cards = TestHelper.strMatrixToCards(`
            2 0 1 0 1 0 0 2 0 0 0 1 0
            2 0 1 0 0 0 0 0 0 0 0 0 0
            0 1 0 0 0 2 0 0 0 0 0 0 0
            0 0 0 0 0 1 0 0 0 0 0 0 0
            `);
    
            const result = calculator.calculate(cards.hand, cards.board);
    
            expect(result.length).toBe(1);
            expect(result[0].getCombination().getId()).toBe(EPokerCombination.FLUSH);
            expect(result[0].getCombination().getCards().length).toBe(5);
        });

        it('should find a Straight', function () {
            const calculator = PokerCalculatorFactory.createOmahaCalculator();
            const cards = TestHelper.strMatrixToCards(`
            0 0 1 0 1 0 2 0 0 0 0 1 0
            2 0 1 2 0 0 0 0 0 0 0 0 0
            0 1 0 0 0 0 0 2 0 0 0 0 0
            0 0 0 0 0 1 0 0 0 1 0 0 0
            `);
    
            const result = calculator.calculate(cards.hand, cards.board);
    
            expect(result.length).toBe(1);
            expect(result[0].getCombination().getId()).toBe(EPokerCombination.STRAIGHT);
            expect(result[0].getCombination().getCards().length).toBe(5);
        });

        it('should find a Straight (lower)', function () {
            const calculator = PokerCalculatorFactory.createOmahaCalculator();
            const cards = TestHelper.strMatrixToCards(`
            0 0 0 0 0 0 0 0 0 0 0 0 2
            2 0 1 0 0 0 0 0 0 0 0 0 0
            0 1 0 0 0 2 0 2 0 0 0 0 0
            0 0 0 1 0 1 0 0 0 1 0 0 0
            `);
    
            const result = calculator.calculate(cards.hand, cards.board);
    
            expect(result.length).toBe(1);
            expect(result[0].getCombination().getId()).toBe(EPokerCombination.STRAIGHT_LOWER);
            expect(result[0].getCombination().getCards().length).toBe(5);
        });

        it('should find a Three of a kind', function () {
            const calculator = PokerCalculatorFactory.createOmahaCalculator();
            const cards = TestHelper.strMatrixToCards(`
            0 0 0 0 0 0 0 0 0 0 0 0 2
            2 0 1 0 0 1 0 0 0 0 0 0 0
            0 1 0 0 0 2 0 2 0 0 0 0 0
            0 0 0 0 0 1 0 0 0 1 0 0 0
            `);
    
            const result = calculator.calculate(cards.hand, cards.board);
    
            expect(result.length).toBe(1);
            expect(result[0].getCombination().getId()).toBe(EPokerCombination.THREE_KIND);
            expect(result[0].getCombination().getCards().length).toBe(5);
        });

        it('should find a Two pairs', function () {
            const calculator = PokerCalculatorFactory.createOmahaCalculator();
            const cards = TestHelper.strMatrixToCards(`
            0 0 0 0 0 0 0 0 0 0 0 0 2
            2 0 1 0 0 0 0 0 0 0 0 0 0
            0 1 0 0 0 2 0 2 0 0 0 0 1
            0 0 0 0 0 1 0 0 0 1 0 0 0
            `);
    
            const result = calculator.calculate(cards.hand, cards.board);
    
            expect(result.length).toBe(1);
            expect(result[0].getCombination().getId()).toBe(EPokerCombination.TWO_PAIRS);
            expect(result[0].getCombination().getCards().length).toBe(5);
        });

        it('should find a Pair', function () {
            const calculator = PokerCalculatorFactory.createOmahaCalculator();
            const cards = TestHelper.strMatrixToCards(`
            0 0 0 0 0 0 0 0 0 0 0 0 2
            2 0 1 0 0 0 0 0 2 0 0 0 0
            0 1 0 0 2 0 0 0 1 0 0 0 0
            0 0 0 0 0 1 0 0 0 0 0 1 0
            `);
    
            const result = calculator.calculate(cards.hand, cards.board);
    
            expect(result.length).toBe(1);
            expect(result[0].getCombination().getId()).toBe(EPokerCombination.PAIR);
            expect(result[0].getCombination().getCards().length).toBe(5);
        });
    
        it('should find a High card', function () {
            const calculator = PokerCalculatorFactory.createOmahaCalculator();
            const cards = TestHelper.strMatrixToCards(`
            1 0 0 0 0 0 1 0 0 0 0 2 0
            0 0 1 0 0 0 0 0 0 0 2 0 0
            0 0 0 0 1 3 0 0 1 0 0 0 2
            0 0 0 0 0 2 0 0 0 3 3 0 3
            `);
    
            const result = calculator.calculate(cards.hand, cards.board);
    
            expect(result.length).toBe(2);
            expect(result[0].getCombination().getId()).toBe(EPokerCombination.HIGH_CARD);
            expect(result[0].getCombination().getCards().length).toBe(5);
            expect(result[1].getCombination().getId()).toBe(EPokerCombination.HIGH_CARD);
            expect(result[1].getCombination().getCards().length).toBe(5);
        });
    });

    describe('Holdem', function () {
        it('should find a Straight Flush', function () {
            const calculator = PokerCalculatorFactory.createHoldemCalculator();
            const cards = TestHelper.strMatrixToCards(`
            0 0 0 0 0 0 0 0 1 1 1 2 1
            0 0 0 0 0 1 0 0 0 0 0 0 0
            0 0 0 0 2 0 0 0 0 0 0 0 0
            0 0 0 0 0 0 0 0 0 0 0 0 0
            `);
    
            const result = calculator.calculate(cards.hand, cards.board);
    
            expect(result.length).toBe(1);
            expect(result[0].getCombination().getId()).toBe(EPokerCombination.STRAIGHT_FLUSH);
            expect(result[0].getCombination().getCards().length).toBe(5);
        });

        it('should find a Four of a kind', function () {
            const calculator = PokerCalculatorFactory.createHoldemCalculator();
            const cards = TestHelper.strMatrixToCards(`
            2 0 1 0 0 0 0 0 0 0 0 0 0
            1 0 1 0 0 2 0 0 0 0 0 0 0
            1 0 3 0 0 0 0 0 0 0 0 0 0
            1 0 3 0 0 0 0 0 0 0 0 0 0
            `);
    
            const result = calculator.calculate(cards.hand, cards.board);
    
            expect(result.length).toBe(2);
            expect(result[0].getCombination().getId()).toBe(EPokerCombination.FOUR_KIND);
            expect(result[0].getCombination().getCards().length).toBe(5);
            expect(result[1].getCombination().getId()).toBe(EPokerCombination.FOUR_KIND);
            expect(result[1].getCombination().getCards().length).toBe(5);
        });

        it('should find a Full house', function () {
            const calculator = PokerCalculatorFactory.createHoldemCalculator();
            const cards = TestHelper.strMatrixToCards(`
            0 0 1 0 0 0 0 0 0 0 0 0 0
            0 0 1 0 0 2 0 0 0 0 0 0 0
            0 0 1 0 0 2 0 1 1 0 0 0 0
            0 0 0 0 0 0 0 3 3 0 0 0 0
            `);
    
            const result = calculator.calculate(cards.hand, cards.board);
    
            expect(result.length).toBe(2);
            expect(result[0].getCombination().getId()).toBe(EPokerCombination.FULL_HOUSE);
            expect(result[0].getCombination().getCards().length).toBe(5);
            expect(result[1].getCombination().getId()).toBe(EPokerCombination.FULL_HOUSE);
            expect(result[1].getCombination().getCards().length).toBe(5);
        });

        it('should find a Flush', function () {
            const calculator = PokerCalculatorFactory.createHoldemCalculator();
            const cards = TestHelper.strMatrixToCards(`
            2 3 1 0 1 0 0 1 0 0 0 1 0
            2 3 0 0 0 0 0 0 0 0 0 0 0
            0 0 0 0 0 0 0 0 0 1 0 0 0
            0 0 0 0 0 0 0 0 0 0 0 0 0
            `);
    
            const result = calculator.calculate(cards.hand, cards.board);
    
            expect(result.length).toBe(2);
            expect(result[0].getCombination().getId()).toBe(EPokerCombination.FLUSH);
            expect(result[0].getCombination().getCards().length).toBe(5);
            expect(result[1].getCombination().getId()).toBe(EPokerCombination.FLUSH);
            expect(result[1].getCombination().getCards().length).toBe(5);
        });

        it('should find a Straight', function () {
            const calculator = PokerCalculatorFactory.createHoldemCalculator();
            const cards = TestHelper.strMatrixToCards(`
            0 0 1 0 1 0 0 0 0 3 0 0 0
            2 0 1 1 0 0 0 0 0 0 0 0 0
            0 1 0 0 0 0 0 0 2 0 0 0 0
            3 0 0 0 0 1 0 0 0 0 0 0 0
            `);
    
            const result = calculator.calculate(cards.hand, cards.board);
    
            expect(result.length).toBe(2);
            expect(result[0].getCombination().getId()).toBe(EPokerCombination.STRAIGHT);
            expect(result[0].getCombination().getCards().length).toBe(5);
            expect(result[1].getCombination().getId()).toBe(EPokerCombination.STRAIGHT);
            expect(result[1].getCombination().getCards().length).toBe(5);
        });

        it('should find a Straight (lower)', function () {
            const calculator = PokerCalculatorFactory.createHoldemCalculator();
            const cards = TestHelper.strMatrixToCards(`
            0 0 0 0 0 0 0 0 0 0 0 0 2
            2 0 1 0 0 0 0 0 0 0 0 0 3
            3 1 0 0 0 0 0 0 0 0 0 0 0
            0 0 0 1 0 1 0 0 0 1 0 0 0
            `);
    
            const result = calculator.calculate(cards.hand, cards.board);
    
            expect(result.length).toBe(2);
            expect(result[0].getCombination().getId()).toBe(EPokerCombination.STRAIGHT_LOWER);
            expect(result[0].getCombination().getCards().length).toBe(5);
            expect(result[1].getCombination().getId()).toBe(EPokerCombination.STRAIGHT_LOWER);
            expect(result[1].getCombination().getCards().length).toBe(5);
        });

        it('should find a Three of a kind', function () {
            const calculator = PokerCalculatorFactory.createHoldemCalculator();
            const cards = TestHelper.strMatrixToCards(`
            1 0 0 0 0 0 0 0 0 0 0 0 0
            2 0 1 0 1 0 0 0 0 0 0 0 0
            2 0 3 0 0 0 1 0 0 0 0 0 0
            0 0 3 0 0 0 0 1 0 0 0 0 0
            `);
    
            const result = calculator.calculate(cards.hand, cards.board);
    
            expect(result.length).toBe(2);
            expect(result[0].getCombination().getId()).toBe(EPokerCombination.THREE_KIND);
            expect(result[0].getCombination().getCards().length).toBe(5);
            expect(result[1].getCombination().getId()).toBe(EPokerCombination.THREE_KIND);
            expect(result[1].getCombination().getCards().length).toBe(5);
        });

        it('should find a Two pairs', function () {
            const calculator = PokerCalculatorFactory.createHoldemCalculator();
            const cards = TestHelper.strMatrixToCards(`
            0 0 0 0 0 3 0 0 0 0 0 0 2
            0 0 1 0 0 0 0 0 0 0 0 0 0
            0 1 0 0 0 2 0 0 0 3 0 0 1
            0 0 0 0 0 1 0 0 0 1 0 0 0
            `);
    
            const result = calculator.calculate(cards.hand, cards.board);
    
            expect(result.length).toBe(2);
            expect(result[0].getCombination().getId()).toBe(EPokerCombination.TWO_PAIRS);
            expect(result[0].getCombination().getCards().length).toBe(5);
            expect(result[1].getCombination().getId()).toBe(EPokerCombination.TWO_PAIRS);
            expect(result[1].getCombination().getCards().length).toBe(5);
        });

        it('should find a Pair', function () {
            const calculator = PokerCalculatorFactory.createHoldemCalculator();
            const cards = TestHelper.strMatrixToCards(`
            0 0 0 0 0 0 0 0 0 0 0 0 2
            0 0 1 0 0 0 0 0 2 0 0 0 0
            0 1 0 0 0 0 0 0 1 0 3 0 0
            0 3 0 0 0 1 0 0 0 0 0 1 0
            `);
    
            const result = calculator.calculate(cards.hand, cards.board);
    
            expect(result.length).toBe(2);
            expect(result[0].getCombination().getId()).toBe(EPokerCombination.PAIR);
            expect(result[0].getCombination().getCards().length).toBe(5);
            expect(result[1].getCombination().getId()).toBe(EPokerCombination.PAIR);
            expect(result[1].getCombination().getCards().length).toBe(5);
        });

        it('should find a High card', function () {
            const calculator = PokerCalculatorFactory.createHoldemCalculator();
            const cards = TestHelper.strMatrixToCards(`
            1 0 0 0 0 0 1 0 0 0 0 0 0
            0 0 1 0 0 0 0 0 0 0 0 0 0
            0 0 0 0 1 3 0 0 1 0 0 0 2
            0 0 0 0 0 2 0 0 0 0 0 0 3
            `);
    
            const result = calculator.calculate(cards.hand, cards.board);
    
            expect(result.length).toBe(2);
            expect(result[0].getCombination().getId()).toBe(EPokerCombination.HIGH_CARD);
            expect(result[0].getCombination().getCards().length).toBe(5);
            expect(result[1].getCombination().getId()).toBe(EPokerCombination.HIGH_CARD);
            expect(result[1].getCombination().getCards().length).toBe(5);
        });
    });

    describe('Five Card Draw', function () {
        it('should find a Straight Flush', function () {
            const calculator = PokerCalculatorFactory.createFiveCardDrawCalculator();
            const cards = TestHelper.strMatrixToCards(`
            0 0 0 0 0 0 0 2 2 2 2 2 2
            0 0 0 0 0 0 0 3 3 3 3 3 3
            0 0 0 0 0 0 0 4 4 4 4 4 4
            0 0 0 0 0 0 0 5 5 5 5 5 5
            `);
    
            const result = calculator.calculate(cards.hand, cards.board);
    
            expect(result.length).toBe(4);
            expect(result[0].getCombination().getId()).toBe(EPokerCombination.STRAIGHT_FLUSH);
            expect(result[0].getCombination().getCards().length).toBe(5);
            expect(result[1].getCombination().getId()).toBe(EPokerCombination.STRAIGHT_FLUSH);
            expect(result[1].getCombination().getCards().length).toBe(5);
            expect(result[2].getCombination().getId()).toBe(EPokerCombination.STRAIGHT_FLUSH);
            expect(result[2].getCombination().getCards().length).toBe(5);
            expect(result[3].getCombination().getId()).toBe(EPokerCombination.STRAIGHT_FLUSH);
            expect(result[3].getCombination().getCards().length).toBe(5);
        });

        it('should find a Four of a kind', function () {
            const calculator = PokerCalculatorFactory.createFiveCardDrawCalculator();
            const cards = TestHelper.strMatrixToCards(`
            2 0 3 0 0 0 0 0 4 0 0 0 0
            2 0 3 0 0 0 0 0 4 0 0 2 0
            2 0 3 0 0 3 0 0 4 0 0 0 4
            2 0 3 0 0 0 0 0 4 0 0 0 0
            `);
    
            const result = calculator.calculate(cards.hand, cards.board);
    
            expect(result.length).toBe(3);
            expect(result[0].getCombination().getId()).toBe(EPokerCombination.FOUR_KIND);
            expect(result[0].getCombination().getCards().length).toBe(5);
            expect(result[1].getCombination().getId()).toBe(EPokerCombination.FOUR_KIND);
            expect(result[1].getCombination().getCards().length).toBe(5);
            expect(result[2].getCombination().getId()).toBe(EPokerCombination.FOUR_KIND);
            expect(result[2].getCombination().getCards().length).toBe(5);
        });

        it('should find a Full house', function () {
            const calculator = PokerCalculatorFactory.createFiveCardDrawCalculator();
            const cards = TestHelper.strMatrixToCards(`
            0 0 0 0 0 2 0 3 0 0 0 0 0
            0 0 2 0 0 0 0 0 3 0 0 0 0
            0 0 0 0 0 2 0 3 0 0 0 0 0
            0 0 2 0 0 2 0 3 3 0 0 0 0
            `);
    
            const result = calculator.calculate(cards.hand, cards.board);
    
            expect(result.length).toBe(2);
            expect(result[0].getCombination().getId()).toBe(EPokerCombination.FULL_HOUSE);
            expect(result[0].getCombination().getCards().length).toBe(5);
            expect(result[1].getCombination().getId()).toBe(EPokerCombination.FULL_HOUSE);
            expect(result[1].getCombination().getCards().length).toBe(5);
        });

        it('should find a Flush', function () {
            const calculator = PokerCalculatorFactory.createFiveCardDrawCalculator();
            const cards = TestHelper.strMatrixToCards(`
            2 3 2 3 2 3 2 3 2 3 0 0 0
            0 0 0 0 0 0 0 0 0 0 0 0 0
            0 0 0 0 0 0 0 0 0 0 0 0 0
            0 0 0 0 0 0 0 0 0 0 0 0 0
            `);
    
            const result = calculator.calculate(cards.hand, cards.board);
    
            expect(result.length).toBe(2);
            expect(result[0].getCombination().getId()).toBe(EPokerCombination.FLUSH);
            expect(result[0].getCombination().getCards().length).toBe(5);
            expect(result[1].getCombination().getId()).toBe(EPokerCombination.FLUSH);
            expect(result[1].getCombination().getCards().length).toBe(5);
        });

        it('should find a Straight', function () {
            const calculator = PokerCalculatorFactory.createFiveCardDrawCalculator();
            const cards = TestHelper.strMatrixToCards(`
            0 0 0 2 0 0 3 0 3 0 3 0 0
            2 0 0 0 0 0 0 0 0 3 0 0 0
            0 0 2 0 2 0 0 3 0 0 0 0 0
            0 2 0 0 0 0 0 0 0 0 0 0 0
            `);
    
            const result = calculator.calculate(cards.hand, cards.board);
    
            expect(result.length).toBe(2);
            expect(result[0].getCombination().getId()).toBe(EPokerCombination.STRAIGHT);
            expect(result[0].getCombination().getCards().length).toBe(5);
            expect(result[1].getCombination().getId()).toBe(EPokerCombination.STRAIGHT);
            expect(result[1].getCombination().getCards().length).toBe(5);
        });

        it('should find a Straight (lower)', function () {
            const calculator = PokerCalculatorFactory.createFiveCardDrawCalculator();
            const cards = TestHelper.strMatrixToCards(`
            0 3 0 3 0 0 0 0 0 0 0 0 2
            2 0 3 0 0 0 0 0 0 0 0 0 3
            3 2 0 2 0 0 0 0 0 0 0 0 0
            0 0 2 0 0 0 0 0 0 0 0 0 0
            `);
    
            const result = calculator.calculate(cards.hand, cards.board);
    
            expect(result.length).toBe(2);
            expect(result[0].getCombination().getId()).toBe(EPokerCombination.STRAIGHT_LOWER);
            expect(result[0].getCombination().getCards().length).toBe(5);
            expect(result[1].getCombination().getId()).toBe(EPokerCombination.STRAIGHT_LOWER);
            expect(result[1].getCombination().getCards().length).toBe(5);
        });

        it('should find a Three of a kind', function () {
            const calculator = PokerCalculatorFactory.createFiveCardDrawCalculator();
            const cards = TestHelper.strMatrixToCards(`
            0 0 0 0 0 2 0 0 0 3 0 0 0
            0 0 0 0 0 0 0 0 0 3 0 3 3
            0 0 0 0 0 2 0 2 0 3 0 0 0
            2 0 0 0 0 2 0 0 0 0 0 0 0
            `);
    
            const result = calculator.calculate(cards.hand, cards.board);
    
            expect(result.length).toBe(2);
            expect(result[0].getCombination().getId()).toBe(EPokerCombination.THREE_KIND);
            expect(result[0].getCombination().getCards().length).toBe(5);
            expect(result[1].getCombination().getId()).toBe(EPokerCombination.THREE_KIND);
            expect(result[1].getCombination().getCards().length).toBe(5);
        });

        it('should find a Two pairs', function () {
            const calculator = PokerCalculatorFactory.createFiveCardDrawCalculator();
            const cards = TestHelper.strMatrixToCards(`
            0 0 2 0 0 3 0 0 0 0 0 0 2
            0 0 0 0 0 0 0 3 0 0 0 0 0
            0 0 2 0 0 3 0 0 0 3 0 0 2
            2 0 0 0 0 0 0 3 0 0 0 0 0
            `);
    
            const result = calculator.calculate(cards.hand, cards.board);
    
            expect(result.length).toBe(2);
            expect(result[0].getCombination().getId()).toBe(EPokerCombination.TWO_PAIRS);
            expect(result[0].getCombination().getCards().length).toBe(5);
            expect(result[1].getCombination().getId()).toBe(EPokerCombination.TWO_PAIRS);
            expect(result[1].getCombination().getCards().length).toBe(5);
        });

        it('should find a Pair', function () {
            const calculator = PokerCalculatorFactory.createFiveCardDrawCalculator();
            const cards = TestHelper.strMatrixToCards(`
            0 0 0 0 0 0 0 0 0 0 2 2 2
            0 0 0 3 0 3 0 0 2 0 0 0 0
            0 0 0 0 0 3 0 3 0 0 3 0 0
            0 3 0 0 0 0 0 0 2 0 0 0 0
            `);
    
            const result = calculator.calculate(cards.hand, cards.board);
    
            expect(result.length).toBe(2);
            expect(result[0].getCombination().getId()).toBe(EPokerCombination.PAIR);
            expect(result[0].getCombination().getCards().length).toBe(5);
            expect(result[1].getCombination().getId()).toBe(EPokerCombination.PAIR);
            expect(result[1].getCombination().getCards().length).toBe(5);
        });

        it('should find a High card', function () {
            const calculator = PokerCalculatorFactory.createFiveCardDrawCalculator();
            const cards = TestHelper.strMatrixToCards(`
            2 3 0 0 0 0 0 0 0 0 0 0 0
            0 0 2 3 0 0 0 0 0 0 0 0 0
            0 0 0 0 2 3 0 0 2 3 0 0 0
            0 0 0 0 0 0 2 3 0 0 0 0 0
            `);
    
            const result = calculator.calculate(cards.hand, cards.board);
    
            expect(result.length).toBe(2);
            expect(result[0].getCombination().getId()).toBe(EPokerCombination.HIGH_CARD);
            expect(result[0].getCombination().getCards().length).toBe(5);
            expect(result[1].getCombination().getId()).toBe(EPokerCombination.HIGH_CARD);
            expect(result[1].getCombination().getCards().length).toBe(5);
        });
    });

    describe('Common', function () {
        it('should sort result by weight', function () {
            const calculator = PokerCalculatorFactory.createHoldemCalculator();
            let cards = TestHelper.strMatrixToCards(`
            0 0 1 0 1 0 0 0 0 0 0 0 0
            0 1 0 0 0 2 1 0 0 0 0 0 0
            0 0 0 1 2 0 0 3 0 0 0 0 0
            0 0 0 0 0 3 0 0 0 0 0 0 0
            `);
    
            let result = calculator.calculate(cards.hand, cards.board);
    
            expect(result.length).toBe(2);
            expect(result[0].getCombination().getId()).toBe(EPokerCombination.STRAIGHT);
            expect(result[0].getId()).toBe('3');
            expect(result[1].getCombination().getId()).toBe(EPokerCombination.STRAIGHT);
            expect(result[1].getId()).toBe('2');

            cards = TestHelper.strMatrixToCards(`
            0 0 1 0 1 0 0 0 0 0 0 0 0
            0 1 0 0 0 2 1 0 0 0 0 0 0
            0 0 0 1 0 0 0 2 0 0 0 0 0
            0 0 0 0 3 3 0 0 0 0 0 0 0
            `);
    
            result = calculator.calculate(cards.hand, cards.board);
    
            expect(result.length).toBe(2);
            expect(result[0].getCombination().getId()).toBe(EPokerCombination.STRAIGHT);
            expect(result[0].getId()).toBe('2');
            expect(result[1].getCombination().getId()).toBe(EPokerCombination.STRAIGHT);
            expect(result[1].getId()).toBe('3');
        });

        it('should set equals', function () {
            const calculator = PokerCalculatorFactory.createHoldemCalculator();
            let cards = TestHelper.strMatrixToCards(`
            0 0 1 0 1 0 0 0 0 0 0 0 0
            0 1 0 0 0 2 1 0 0 0 0 0 0
            0 0 0 1 2 0 0 0 0 0 0 0 0
            4 0 0 0 0 3 3 0 4 0 0 0 0
            `);
    
            let result = calculator.calculate(cards.hand, cards.board);
    
            expect(result.length).toBe(3);
            expect(result[0].getCombination().getId()).toBe(EPokerCombination.STRAIGHT);
            expect(result[1].getCombination().getId()).toBe(EPokerCombination.STRAIGHT);
            expect(result[2].getCombination().getId()).toBe(EPokerCombination.STRAIGHT);

            expect(result[0].isEqual(result[1])).toBeTruthy();
            expect(result[1].isEqual(result[0])).toBeTruthy();

            expect(result[0].isEqual(result[2])).toBeFalsy();
            expect(result[1].isEqual(result[2])).toBeFalsy();
            
            expect(result[2].isEqual(result[0])).toBeFalsy();
            expect(result[2].isEqual(result[1])).toBeFalsy();
        });
    });
});
