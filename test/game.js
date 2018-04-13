/**
 * Created by oblako on 13.04.18.
 */

//https://bespoyasov.ru/ttt-tdd/

import {expect} from 'chai';
import Game from '../src/Game';
import {it} from "mocha";
import * as sinon from "sinon";

const userMoveSymbol = 'x';
const userName = 'user';
const computerName = 'computer';
const computerMoveSymbol = 'o';
const initialGameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let game;
beforeEach(() => { game = new Game() });

describe('Game', () => {
    it('Should return empty game board', () => {
        const game = new Game();

        const board = game.getState();

        expect(board).to.deep.equal(initialGameBoard)
    });

    it('Writes symbol in ceil with given coordinates', () => {
        const x = 1, y = 1;

        game.acceptUserMove(x ,y);
        const board = game.getState();

        expect(board[x][y]).to.equal(userMoveSymbol);
    });

    it('Thows an exception if user moves in taken ceil', () => {
        const x = 2, y = 2;

        game.acceptUserMove(x,y);
        const func = game.acceptUserMove.bind(game, x, y);

        expect(func).to.throw('ceil is already taken');
    });

    it('Game saves users move in history', () => {
        const x = 1, y = 1;

        game.acceptUserMove(x, y);
        const history = game.getMoveHistory();

        expect(history).to.deep.equal([{turn: userName, x, y}])
    });

    it('Game saves computers move in history', () => {
        const stub = sinon.stub(Math, 'random').returns(0.5);

        game.createComputerMove();
        const history = game.getMoveHistory();

        expect(history).to.deep.equal([{turn: computerName, x: 1, y: 1}]);
        stub.restore();
    });

    it('Game saves 1 users move and 1 computers move in history', () => {
        const x = 1, y = 1;

        game.acceptUserMove(x, y);
        game.createComputerMove();
        const history = game.getMoveHistory();

        expect(history.length).to.equal(2);
        expect(history[0].turn).to.equal(userName);
        expect(history[1].turn).to.equal(computerName);
    });

    it('Computer moves in randomly chose cell', () => {
        const stub = sinon.stub(Math, 'random').returns(0.5);

        game.createComputerMove();
        const board = game.getState();

        expect(board[1][1]).to.equal(computerMoveSymbol);
        stub.restore()
    });

    it('Computer moves in cel that is not token', () => {
        // fill all the cells with user's symbol except last
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (i !== 2 || j !== 2) game.acceptUserMove(i, j)
            }
        }

        game.createComputerMove();
        const board = game.getState();

        const userCount = board.reduce( (result, row) => {
            return row.reduce( (count, el) => {
                return el === userMoveSymbol ? ++count : count
            }, result)
        }, 0);

        expect(userCount).to.equal(8);
        expect(computerCount).to.equal(1);
        expect(board[2][2]).to.equal(computerMoveSymbol);
    })
});