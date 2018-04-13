export default class Game {
    constructor() {
        this._userMoveSymbol = 'x';
        this._computerMoveSymbol = 'o';
        this._userName = 'user';
        this._computerName = 'computer';
        this._history = [];
        this._fieldSize = 3;
        this._board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ]
    }

    getState() {
        return this._board;
    }

    createComputerMove() {
        const x = this._getRandomCoordinate();
        const y = this._getRandomCoordinate();
        this._updateHistory(this._computerName, x, y);
        this.updateBoard(x, y, this._computerMoveSymbol)
    }

    acceptUserMove(x, y) {
        if (!this._isCellFree(x, y)) {
            this._throwException('ceil is already taken');
        }
        this._updateHistory(this._userName, x, y);
        this.updateBoard(x, y, this._userMoveSymbol)
    }

    updateBoard(x, y, symbol) {

        this._board[x][y] = symbol;
    }

    getMoveHistory() {
        return this._history;
    }

    _isCellFree(x, y) {
        return !this._board[x][y];
    }

    _throwException(msg) {
        throw new Error(msg);
    }

    _updateHistory(turn, x, y) {
        this._history.push({turn, x ,y});
    }

    _getRandomCoordinate() {
        return Math.floor(Math.random() * this._fieldSize)
    }
}