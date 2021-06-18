'use strict';

function Player (name, color, turn) {
    this.name = name;
    this.dice = 0;
    this.color = color;
    this.turn = turn;
    this.piece1 = { box: 0, x: 0, y: 0, round: false, mount: [], win: false };
    this.piece2 = { box: 0, x: 0, y: 0, round: false, mount: [], win: false };
    this.piece3 = { box: 0, x: 0, y: 0, round: false, mount: [], win: false };
    this.piece4 = { box: 0, x: 0, y: 0, round: false, mount: [], win: false };
    this.win = false;
}

module.exports = Player;