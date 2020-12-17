import { PokerCalculatorFactory } from "@app/calculator";
import { StdInOutParser } from "@app/parser";

describe('StdInOutParser', function () {
    it('e2e test', function () {
        const strings = `texas-holdem 5c6dAcAsQs Ks4c KdJs 2hAh Kh4h Kc7h 6h7d 2cJc
        texas-holdem 2h5c8sAsKc Qs9h KdQh 3cKh Jc6s
        texas-holdem 3d4s5dJsQd 5c4h 7sJd KcAs 9h7h 2dTc Qh8c TsJc
        omaha-holdem 5c6dAcAsQs TsQh9hQc 8d7cTcJd 5s5d7s4d Qd3cKs4c KdJs2hAh Kh4hKc7h 6h7d2cJc
        omaha-holdem 3d4s5dJsQd 8s2h6s8h 7cThKs5s 5hJh2s7d 8d9s5c4h 7sJdKcAs 9h7h2dTc Qh8cTsJc
        omaha-holdem 3d3s4d6hJc Js2dKd8c KsAsTcTs Jh2h3c9c Qc8dAd6c 7dQsAc5d
        five-card-draw 4s5hTsQh9h Qc8d7cTcJd 5s5d7s4dQd 3cKs4cKdJs 2hAhKh4hKc 7h6h7d2cJc As6d5cQsAc
        five-card-draw 7h4s4h8c9h Tc5h6dAc5c Kd9sAs3cQs Ah9d6s2cKh 4c8h2h6c9c
        five-card-draw 5s3s4c2h9d 8dKsTc6c2c 4h6s8hJd5d 5c3cQdTd9s AhQhKcQc2d KhJs9c5h9h 8c3d7h7dTs`.split("\n").map(s => s.trim());

        const results = `2cJc Kh4h=Ks4c Kc7h KdJs 6h7d 2hAh
        Jc6s Qs9h 3cKh KdQh
        9h7h 2dTc KcAs 7sJd TsJc Qh8c 5c4h
        8d7cTcJd 6h7d2cJc Qd3cKs4c Kh4hKc7h KdJs2hAh 5s5d7s4d TsQh9hQc
        9h7h2dTc 7cThKs5s 7sJdKcAs 8d9s5c4h 5hJh2s7d Qh8cTsJc 8s2h6s8h
        Qc8dAd6c KsAsTcTs Js2dKd8c 7dQsAc5d Jh2h3c9c
        4s5hTsQh9h Qc8d7cTcJd 5s5d7s4dQd 7h6h7d2cJc 3cKs4cKdJs 2hAhKh4hKc As6d5cQsAc
        4c8h2h6c9c Ah9d6s2cKh Kd9sAs3cQs 7h4s4h8c9h Tc5h6dAc5c
        5s3s4c2h9d 4h6s8hJd5d 5c3cQdTd9s 8dKsTc6c2c 8c3d7h7dTs KhJs9c5h9h AhQhKcQc2d`.split("\n").map(s => s.trim());

        const parser = new StdInOutParser();

        for (const [i, str] of strings.entries()) {
            const parsed = parser.parseInputString(str);
            const calculator = PokerCalculatorFactory.createCalculator(parsed.game);
            const result = calculator.calculate(parsed.handsCards, parsed.boardCards); 
            const strResult = parser.createOutputString(result.reverse());

            expect(strResult).toBe(results[i]);
        }
    });
});
