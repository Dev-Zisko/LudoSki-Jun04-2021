'use strict';

const board = require('../data/board');
const spawn = require('../data/spawn');

const Player = require('../models/Player');

const spawnGreen = spawn.green;
const spawnYellow = spawn.yellow;
const spawnBlue = spawn.blue;
const spawnRed = spawn.red;

var playerGreen = '';
var playerYellow = '';
var playerBlue = '';
var playerRed = '';

var turnNow = 1;
var maxTurn = 0;

function createPlayer (nickname) {
  try {
    let message = '';
    if (playerGreen == '') {
      playerGreen = new Player(nickname, 'green', 1);
      message = nickname + ' entro a la partida con el color verde.';
    }
    else if (playerYellow == '') {
      playerYellow = new Player(nickname, 'yellow', 2);
      message = nickname + ' entro a la partida con el color amarillo.';
    }
    else if (playerBlue == '') {
      playerBlue = new Player(nickname, 'blue', 3);
      message = nickname + ' entro a la partida con el color azul.';
    }
    else if (playerRed == '') {
      playerRed = new Player(nickname, 'red', 4);
      message = nickname + ' entro a la partida con el color rojo.';
    }
    else {
      message = 'La sala esta llena ' + message.name + ' espera a que termine la partida e intenta nuevamente.';
    }
    return message;
  } catch (error) {
    console.log('Error al crear el jugador: ' + error);
  }
}

function resetGame () {
  try {
    playerGreen = '';
    playerYellow = '';
    playerBlue = '';
    playerRed = '';
    turnNow = 1;
    maxTurn = 0; 
  } catch (error) {
    console.log('Error al resetear el juego: ' + error);
  }
}

function allPlayers () {
  try {
    return [playerGreen, playerYellow, playerBlue, playerRed];
  } catch (error) {
    console.log('Error al retornar todos los jugadores: ' + error);
  }
}

function searchPlayer (turn) {
  if (playerGreen != '') {
    if (turn == playerGreen.turn) {
      return playerGreen.name;
    }
  }
  if (playerYellow != '') {
    if (turn == playerYellow.turn) {
      return playerYellow.name;
    }
  }
  if (playerBlue != '') {
    if (turn == playerBlue.turn) {
      return playerBlue.name;
    }
  }
  if (playerRed != '') {
    if (turn == playerRed.turn) {
      return playerRed.name;
    }
  }
}

function sameTurn (turn) {
  if (playerGreen != '') {
    if (playerGreen.turn == turn) {
      if (playerGreen.dice == 1 || playerGreen.dice == 6) {
        return true;
      }
      else {
        return false;
      }
    }
  }
  if (playerYellow != '') {
    if (playerYellow.turn == turn) {
      if (playerYellow.dice == 1 || playerYellow.dice == 6) {
        return true;
      }
      else {
        return false;
      }
    }
  }
  if (playerBlue != '') {
    if (playerBlue.turn == turn) {
      if (playerBlue.dice == 1 || playerBlue.dice == 6) {
        return true;
      }
      else {
        return false;
      }
    }
  }
  if (playerRed != '') {
    if (playerRed.turn == turn) {
      if (playerRed.dice == 1 || playerRed.dice == 6) {
        return true;
      }
      else {
        return false;
      }
    }
  }
}

function currentTurn () {
  try {
    return turnNow;
  } catch (error) {
    console.log('Error al retornar todos los jugadores: ' + error);
  }
}

function turnAvailable () {
  let turnOn = [];
  if (!playerGreen.win && playerGreen != '') {
    turnOn.push(1);
  }
  if (!playerYellow.win && playerYellow != '') {
    turnOn.push(2);
  }
  if (!playerBlue.win && playerBlue != '') {
    turnOn.push(3);
  }
  if (!playerRed.win && playerRed != '') {
    turnOn.push(4);
  }
  return turnOn;
}

function passTurn (turn) {
  let turnOn = turnAvailable();
  let validateTurn = true;
  let newName = '';
  turnNow = turn;
  while (validateTurn) {
    turnNow = turnNow + 1;
    if (turnNow > maxTurn) {
      turnNow = 1;
    }
    if (turnOn.includes(turnNow)) {
      validateTurn = false;
    }
    if (turnOn.length == 0) {
      validateTurn = false;
    }
  }
  if (playerGreen.turn == turnNow) {
    newName = playerGreen.name;
  }
  else if (playerYellow.turn == turnNow) {
    newName = playerYellow.name;
  }
  else if (playerBlue.turn == turnNow) {
    newName = playerBlue.name;
  }
  else if (playerRed.turn == turnNow) {
    newName = playerRed.name;
  }
  return [turnNow, newName];
}

function setSpawnPlayers () {
	try {
		if (playerGreen != '') {
			// Set Spawn Green Player
			playerGreen.piece1.x = spawnGreen.piece1.x;
			playerGreen.piece1.y = spawnGreen.piece1.y;
			playerGreen.piece2.x = spawnGreen.piece2.x;
			playerGreen.piece2.y = spawnGreen.piece2.y;
			playerGreen.piece3.x = spawnGreen.piece3.x;
			playerGreen.piece3.y = spawnGreen.piece3.y;
			playerGreen.piece4.x = spawnGreen.piece4.x;
			playerGreen.piece4.y = spawnGreen.piece4.y;
      maxTurn += 1;
		}
		if (playerYellow != '') {
			// Set Spawn Yellow Player
			playerYellow.piece1.x = spawnYellow.piece1.x;
			playerYellow.piece1.y = spawnYellow.piece1.y;
			playerYellow.piece2.x = spawnYellow.piece2.x;
			playerYellow.piece2.y = spawnYellow.piece2.y;
			playerYellow.piece3.x = spawnYellow.piece3.x;
			playerYellow.piece3.y = spawnYellow.piece3.y;
			playerYellow.piece4.x = spawnYellow.piece4.x;
			playerYellow.piece4.y = spawnYellow.piece4.y;
      maxTurn += 1;
		}
		if (playerBlue != '') {
			// Set Spawn Blue Player
			playerBlue.piece1.x = spawnBlue.piece1.x;
			playerBlue.piece1.y = spawnBlue.piece1.y;
			playerBlue.piece2.x = spawnBlue.piece2.x;
			playerBlue.piece2.y = spawnBlue.piece2.y;
			playerBlue.piece3.x = spawnBlue.piece3.x;
			playerBlue.piece3.y = spawnBlue.piece3.y;
			playerBlue.piece4.x = spawnBlue.piece4.x;
			playerBlue.piece4.y = spawnBlue.piece4.y;
      maxTurn += 1;
		}
		if (playerRed != '') {
			// Set Spawn Red Player
			playerRed.piece1.x = spawnRed.piece1.x;
			playerRed.piece1.y = spawnRed.piece1.y;
			playerRed.piece2.x = spawnRed.piece2.x;
			playerRed.piece2.y = spawnRed.piece2.y;
			playerRed.piece3.x = spawnRed.piece3.x;
			playerRed.piece3.y = spawnRed.piece3.y;
			playerRed.piece4.x = spawnRed.piece4.x;
			playerRed.piece4.y = spawnRed.piece4.y;
      maxTurn += 1;
		}
    return [playerGreen, playerYellow, playerBlue, playerRed];
	} catch (error) {
		console.log('Error al setear los spawns de jugadores: ' + error);
	}
}

function verifyWinner () {
  let players = [];
  if (playerGreen != '') {
    if (playerGreen.piece1.win && playerGreen.piece2.win && playerGreen.piece3.win && playerGreen.piece4.win){
      players.push(playerGreen);
      playerGreen.win = true;
    }
  }
  if (playerYellow != '') {
    if (playerYellow.piece1.win && playerYellow.piece2.win && playerYellow.piece3.win && playerYellow.piece4.win){
      players.push(playerYellow);
      playerYellow.win = true;
    }
  }
  if (playerBlue != '') {
    if (playerBlue.piece1.win && playerBlue.piece2.win && playerBlue.piece3.win && playerBlue.piece4.win){
      players.push(playerBlue);
      playerBlue.win = true;
    }
  }
  if (playerRed != '') {
    if (playerRed.piece1.win && playerRed.piece2.win && playerRed.piece3.win && playerRed.piece4.win){
      players.push(playerRed);
      playerRed.win = true;
    }
  }
  return players;
}

function pieceOutSpawn (player, piece) {
	try {
		let validate = 0; // 0 = pieces in the spawn ... 1 = At least one piece out of the spawn
		if (player.color == 'green') {
			// Check if the green player's pieces are in the spawn
			if (player.piece1.x != spawnGreen.piece1.x && player.piece1.y != spawnGreen.piece1.y) {
				if (piece == '') return (validate = 1);
				else {
					if (piece == 'piece1') return (validate = 1);
				}
			}
			if (player.piece2.x != spawnGreen.piece2.x && player.piece2.y != spawnGreen.piece2.y) {
				if (piece == '') return (validate = 1);
				else {
					if (piece == 'piece2') return (validate = 1);
				}
			}
			if (player.piece3.x != spawnGreen.piece3.x && player.piece3.y != spawnGreen.piece3.y) {
				if (piece == '') return (validate = 1);
				else {
					if (piece == 'piece3') return (validate = 1);
				}
			}
			if (player.piece4.x != spawnGreen.piece4.x && player.piece4.y != spawnGreen.piece4.y) {
				if (piece == '') return (validate = 1);
				else {
					if (piece == 'piece4') return (validate = 1);
				}
			}
		}
		else if (player.color == 'yellow') {
			// Check if the yellow player's pieces are in the spawn
			if (player.piece1.x != spawnYellow.piece1.x && player.piece1.y != spawnYellow.piece1.y) {
				if (piece == '') return (validate = 1);
				else {
					if (piece == 'piece1') return (validate = 1);
				}
			}
			if (player.piece2.x != spawnYellow.piece2.x && player.piece2.y != spawnYellow.piece2.y) {
				if (piece == '') return (validate = 1);
				else {
					if (piece == 'piece2') return (validate = 1);
				}
			}
			if (player.piece3.x != spawnYellow.piece3.x && player.piece3.y != spawnYellow.piece3.y) {
				if (piece == '') return (validate = 1);
				else {
					if (piece == 'piece3') return (validate = 1);
				}
			}
			if (player.piece4.x != spawnYellow.piece4.x && player.piece4.y != spawnYellow.piece4.y) {
				if (piece == '') return (validate = 1);
				else {
					if (piece == 'piece4') return (validate = 1);
				}
			}
		}
		else if (player.color == 'blue') {
			// Check if the blue player's pieces are in the spawn
			if (player.piece1.x != spawnBlue.piece1.x && player.piece1.y != spawnBlue.piece1.y) {
				if (piece == '') return (validate = 1);
				else {
					if (piece == 'piece1') return (validate = 1);
				}
			}
			if (player.piece2.x != spawnBlue.piece2.x && player.piece2.y != spawnBlue.piece2.y) {
				if (piece == '') return (validate = 1);
				else {
					if (piece == 'piece2') return (validate = 1);
				}
			}
			if (player.piece3.x != spawnBlue.piece3.x && player.piece3.y != spawnBlue.piece3.y) {
				if (piece == '') return (validate = 1);
				else {
					if (piece == 'piece3') return (validate = 1);
				}
			}
			if (player.piece4.x != spawnBlue.piece4.x && player.piece4.y != spawnBlue.piece4.y) {
				if (piece == '') return (validate = 1);
				else {
					if (piece == 'piece4') return (validate = 1);
				}
			}
		}
		else if (player.color == 'red') {
			// Check if the red player's pieces are in the spawn
			if (player.piece1.x != spawnRed.piece1.x && player.piece1.y != spawnRed.piece1.y) {
				if (piece == '') return (validate = 1);
				else {
					if (piece == 'piece1') return (validate = 1);
				}
			}
			if (player.piece2.x != spawnRed.piece2.x && player.piece2.y != spawnRed.piece2.y) {
				if (piece == '') return (validate = 1);
				else {
					if (piece == 'piece2') return (validate = 1);
				}
			}
			if (player.piece3.x != spawnRed.piece3.x && player.piece3.y != spawnRed.piece3.y) {
				if (piece == '') return (validate = 1);
				else {
					if (piece == 'piece3') return (validate = 1);
				}
			}
			if (player.piece4.x != spawnRed.piece4.x && player.piece4.y != spawnRed.piece4.y) {
				if (piece == '') return (validate = 1);
				else {
					if (piece == 'piece4') return (validate = 1);
				}
			}
		}
		return validate;
	} catch (error) {
		console.log('Error al verificar si la pieza esta en el spawn: ' + error);
	}
}

function verifyMove (turn, dice, piece) {
    let validate = -1;
    let nickname = '';
    if (playerGreen.turn == turn) {
        if (dice != '') playerGreen.dice = dice;
        if (playerGreen.dice != 1 && playerGreen.dice != 6) {
            if (piece == '') validate = pieceOutSpawn(playerGreen, '');
            else validate = pieceOutSpawn(playerGreen, piece);
        }
        nickname = playerGreen.name;
    }
    else if (playerYellow.turn == turn) {
        if (dice != '') playerYellow.dice = dice;
        if (playerYellow.dice != 1 && playerYellow.dice != 6) {
            if (piece == '') validate = pieceOutSpawn(playerYellow, '');
            else validate = pieceOutSpawn(playerYellow, piece);
        }
        nickname = playerYellow.name;
    }
    else if (playerBlue.turn == turn) {
        if (dice != '') playerBlue.dice = dice;
        if (playerBlue.dice != 1 && playerBlue.dice != 6) {
            if (piece == '') validate =pieceOutSpawn(playerBlue, '');
            else validate = pieceOutSpawn(playerBlue, piece);
        }
        nickname = playerBlue.name;
    }
    else if (playerRed.turn == turn) {
        if (dice != '') playerRed.dice = dice;
        if (playerRed.dice != 1 && playerRed.dice != 6) {
            if (piece == '') validate = pieceOutSpawn(playerRed, '');
            else validate = pieceOutSpawn(playerRed, piece);
        }
        nickname = playerRed.name;
    }
    return [validate, nickname];
}

function newPos (turn, piece) {
  let nextPos = 0;
  if (playerGreen != '') {
    if (turn == playerGreen.turn) {
      if (piece == 'piece1') {
        if (playerGreen.piece1.box == 0) { // Si esta en el spawn
          nextPos = nextPos + 41 + playerGreen.dice; // Se le suma las casillas para salir del spawn
        }
        else {
          nextPos = playerGreen.piece1.box + playerGreen.dice; // Se le suma la casilla + el dado
        }

        if (!playerGreen.piece1.round && nextPos > 52) {
          playerGreen.piece1.round = true;
          nextPos = nextPos - 52;
        }

        if (playerGreen.piece1.round && nextPos > 40 && nextPos < 100) {
          nextPos = 400 + (nextPos - 41)
        }

        if (playerGreen.piece1.round && nextPos > 405) {
          nextPos = 405 - (nextPos - 405);
        }

        if (playerGreen.piece1.round && nextPos == 405) {
          playerGreen.piece1.win = true;

          playerGreen.piece1.mount.forEach(element => {
            if (element == 'piece3') {
              playerGreen.piece3.box = 1000;
              playerGreen.piece3.x = '';
              playerGreen.piece3.y = '';
              playerGreen.piece3.round = false;
              playerGreen.piece3.mount = [];
              playerGreen.piece3.win = true;
            }
            else if (element == 'piece2') {
              playerGreen.piece2.box = 1000;
              playerGreen.piece2.x = '';
              playerGreen.piece2.y = '';
              playerGreen.piece2.round = false;
              playerGreen.piece2.mount = [];
              playerGreen.piece2.win = true;
            }
            else if (element == 'piece4') {
              playerGreen.piece4.box = 1000;
              playerGreen.piece4.x = '';
              playerGreen.piece4.y = '';
              playerGreen.piece4.round = false;
              playerGreen.piece4.mount = [];
              playerGreen.piece4.win = true;
            }
          });
        }

        // playerGreen.piece1.box = nextPos;
      }
      else if (piece == 'piece2') {
        if (playerGreen.piece2.box == 0) { // Si esta en el spawn
          nextPos = nextPos + 41 + playerGreen.dice; // Se le suma las casillas para salir del spawn
        }
        else {
          nextPos = playerGreen.piece2.box + playerGreen.dice; // Se le suma la casilla + el dado
        }

        if (!playerGreen.piece2.round && nextPos > 52) {
          playerGreen.piece2.round = true;
          nextPos = nextPos - 52;
        }

        if (playerGreen.piece2.round && nextPos > 40 && nextPos < 100) {
          nextPos = 400 + (nextPos - 41)
        }

        if (playerGreen.piece2.round && nextPos > 405) {
          nextPos = 405 - (nextPos - 405);
        }

        if (playerGreen.piece2.round && nextPos == 405) {
          playerGreen.piece2.win = true;

          playerGreen.piece2.mount.forEach(element => {
            if (element == 'piece3') {
              playerGreen.piece3.box = 1000;
              playerGreen.piece3.x = '';
              playerGreen.piece3.y = '';
              playerGreen.piece3.round = false;
              playerGreen.piece3.mount = [];
              playerGreen.piece3.win = true;
            }
            else if (element == 'piece1') {
              playerGreen.piece1.box = 1000;
              playerGreen.piece1.x = '';
              playerGreen.piece1.y = '';
              playerGreen.piece1.round = false;
              playerGreen.piece1.mount = [];
              playerGreen.piece1.win = true;
            }
            else if (element == 'piece4') {
              playerGreen.piece4.box = 1000;
              playerGreen.piece4.x = '';
              playerGreen.piece4.y = '';
              playerGreen.piece4.round = false;
              playerGreen.piece4.mount = [];
              playerGreen.piece4.win = true;
            }
          });
        }

        // playerGreen.piece2.box = nextPos;
      }
      else if (piece == 'piece3') {
        if (playerGreen.piece3.box == 0) { // Si esta en el spawn
          nextPos = nextPos + 41 + playerGreen.dice; // Se le suma las casillas para salir del spawn
        }
        else {
          nextPos = playerGreen.piece3.box + playerGreen.dice; // Se le suma la casilla + el dado
        }

        if (!playerGreen.piece3.round && nextPos > 52) {
          playerGreen.piece3.round = true;
          nextPos = nextPos - 52;
        }

        if (playerGreen.piece3.round && nextPos > 40 && nextPos < 100) {
          nextPos = 400 + (nextPos - 41)
        }

        if (playerGreen.piece3.round && nextPos > 405) {
          nextPos = 405 - (nextPos - 405);
        }

        if (playerGreen.piece3.round && nextPos == 405) {
          playerGreen.piece3.win = true;

          playerGreen.piece3.mount.forEach(element => {
            if (element == 'piece1') {
              playerGreen.piece1.box = 1000;
              playerGreen.piece1.x = '';
              playerGreen.piece1.y = '';
              playerGreen.piece1.round = false;
              playerGreen.piece1.mount = [];
              playerGreen.piece1.win = true;
            }
            else if (element == 'piece2') {
              playerGreen.piece2.box = 1000;
              playerGreen.piece2.x = '';
              playerGreen.piece2.y = '';
              playerGreen.piece2.round = false;
              playerGreen.piece2.mount = [];
              playerGreen.piece2.win = true;
            }
            else if (element == 'piece4') {
              playerGreen.piece4.box = 1000;
              playerGreen.piece4.x = '';
              playerGreen.piece4.y = '';
              playerGreen.piece4.round = false;
              playerGreen.piece4.mount = [];
              playerGreen.piece4.win = true;
            }
          });
        }

        // playerGreen.piece3.box = nextPos;
      }
      else if (piece == 'piece4') {
        if (playerGreen.piece4.box == 0) { // Si esta en el spawn
          nextPos = nextPos + 41 + playerGreen.dice; // Se le suma las casillas para salir del spawn
        }
        else {
          nextPos = playerGreen.piece4.box + playerGreen.dice; // Se le suma la casilla + el dado
        }

        if (!playerGreen.piece4.round && nextPos > 52) {
          playerGreen.piece4.round = true;
          nextPos = nextPos - 52;
        }

        if (playerGreen.piece4.round && nextPos > 40 && nextPos < 100) {
          nextPos = 400 + (nextPos - 41)
        }

        if (playerGreen.piece4.round && nextPos > 405) {
          nextPos = 405 - (nextPos - 405);
        }

        if (playerGreen.piece4.round && nextPos == 405) {
          playerGreen.piece4.win = true;

          playerGreen.piece4.mount.forEach(element => {
            if (element == 'piece3') {
              playerGreen.piece3.box = 1000;
              playerGreen.piece3.x = '';
              playerGreen.piece3.y = '';
              playerGreen.piece3.round = false;
              playerGreen.piece3.mount = [];
              playerGreen.piece3.win = true;
            }
            else if (element == 'piece2') {
              playerGreen.piece2.box = 1000;
              playerGreen.piece2.x = '';
              playerGreen.piece2.y = '';
              playerGreen.piece2.round = false;
              playerGreen.piece2.mount = [];
              playerGreen.piece2.win = true;
            }
            else if (element == 'piece1') {
              playerGreen.piece1.box = 1000;
              playerGreen.piece1.x = '';
              playerGreen.piece1.y = '';
              playerGreen.piece1.round = false;
              playerGreen.piece1.mount = [];
              playerGreen.piece1.win = true;
            }
          });
        }

        // playerGreen.piece4.box = nextPos;
      }
    }
  }
  if (playerYellow != '') {
    if (turn == playerYellow.turn) {
      if (piece == 'piece1') {
        if (playerYellow.piece1.box == 0) { // Si esta en el spawn
          nextPos = nextPos + 28 + playerYellow.dice; // Se le suma las casillas para salir del spawn
        }
        else {
          nextPos = playerYellow.piece1.box + playerYellow.dice; // Se le suma la casilla + el dado
        }

        if (!playerYellow.piece1.round && nextPos > 52) {
          playerYellow.piece1.round = true;
          nextPos = nextPos - 52;
        }

        if (playerYellow.piece1.round && nextPos > 27 && nextPos < 100) {
          nextPos = 300 + (nextPos - 28);
        }

        if (playerYellow.piece1.round && nextPos > 305) {
          nextPos = 305 - (nextPos - 305);
        }

        if (playerYellow.piece1.round && nextPos == 305) {
          playerYellow.piece1.win = true;

          playerYellow.piece1.mount.forEach(element => {
            if (element == 'piece3') {
              playerYellow.piece3.box = 1000;
              playerYellow.piece3.x = '';
              playerYellow.piece3.y = '';
              playerYellow.piece3.round = false;
              playerYellow.piece3.mount = [];
              playerYellow.piece3.win = true;
            }
            else if (element == 'piece2') {
              playerYellow.piece2.box = 1000;
              playerYellow.piece2.x = '';
              playerYellow.piece2.y = '';
              playerYellow.piece2.round = false;
              playerYellow.piece2.mount = [];
              playerYellow.piece2.win = true;
            }
            else if (element == 'piece4') {
              playerYellow.piece4.box = 1000;
              playerYellow.piece4.x = '';
              playerYellow.piece4.y = '';
              playerYellow.piece4.round = false;
              playerYellow.piece4.mount = [];
              playerYellow.piece4.win = true;
            }
          });
        }

        // playerYellow.piece1.box = nextPos;
      }
      else if (piece == 'piece2') {
        if (playerYellow.piece2.box == 0) { // Si esta en el spawn
          nextPos = nextPos + 28 + playerYellow.dice; // Se le suma las casillas para salir del spawn
        }
        else {
          nextPos = playerYellow.piece2.box + playerYellow.dice; // Se le suma la casilla + el dado
        }

        if (!playerYellow.piece2.round && nextPos > 52) {
          playerYellow.piece2.round = true;
          nextPos = nextPos - 52;
        }

        if (playerYellow.piece2.round && nextPos > 27 && nextPos < 100) {
          nextPos = 300 + (nextPos - 28);
        }

        if (playerYellow.piece2.round && nextPos > 305) {
          nextPos = 305 - (nextPos - 305);
        }

        if (playerYellow.piece2.round && nextPos == 305) {
          playerYellow.piece2.win = true;

          playerYellow.piece2.mount.forEach(element => {
            if (element == 'piece3') {
              playerYellow.piece3.box = 1000;
              playerYellow.piece3.x = '';
              playerYellow.piece3.y = '';
              playerYellow.piece3.round = false;
              playerYellow.piece3.mount = [];
              playerYellow.piece3.win = true;
            }
            else if (element == 'piece1') {
              playerYellow.piece1.box = 1000;
              playerYellow.piece1.x = '';
              playerYellow.piece1.y = '';
              playerYellow.piece1.round = false;
              playerYellow.piece1.mount = [];
              playerYellow.piece1.win = true;
            }
            else if (element == 'piece4') {
              playerYellow.piece4.box = 1000;
              playerYellow.piece4.x = '';
              playerYellow.piece4.y = '';
              playerYellow.piece4.round = false;
              playerYellow.piece4.mount = [];
              playerYellow.piece4.win = true;
            }
          });
        }

        // playerYellow.piece2.box = nextPos;
      }
      else if (piece == 'piece3') {
        if (playerYellow.piece3.box == 0) { // Si esta en el spawn
          nextPos = nextPos + 28 + playerYellow.dice; // Se le suma las casillas para salir del spawn
        }
        else {
          nextPos = playerYellow.piece3.box + playerYellow.dice; // Se le suma la casilla + el dado
        }

        if (!playerYellow.piece3.round && nextPos > 52) {
          playerYellow.piece3.round = true;
          nextPos = nextPos - 52;
        }

        if (playerYellow.piece3.round && nextPos > 27 && nextPos < 100) {
          nextPos = 300 + (nextPos - 28);
        }

        if (playerYellow.piece3.round && nextPos > 305) {
          nextPos = 305 - (nextPos - 305);
        }

        if (playerYellow.piece3.round && nextPos == 305) {
          playerYellow.piece3.win = true;

          playerYellow.piece3.mount.forEach(element => {
            if (element == 'piece1') {
              playerYellow.piece1.box = 1000;
              playerYellow.piece1.x = '';
              playerYellow.piece1.y = '';
              playerYellow.piece1.round = false;
              playerYellow.piece1.mount = [];
              playerYellow.piece1.win = true;
            }
            else if (element == 'piece2') {
              playerYellow.piece2.box = 1000;
              playerYellow.piece2.x = '';
              playerYellow.piece2.y = '';
              playerYellow.piece2.round = false;
              playerYellow.piece2.mount = [];
              playerYellow.piece2.win = true;
            }
            else if (element == 'piece4') {
              playerYellow.piece4.box = 1000;
              playerYellow.piece4.x = '';
              playerYellow.piece4.y = '';
              playerYellow.piece4.round = false;
              playerYellow.piece4.mount = [];
              playerYellow.piece4.win = true;
            }
          });
        }

        // playerYellow.piece3.box = nextPos;
      }
      else if (piece == 'piece4') {
        if (playerYellow.piece4.box == 0) { // Si esta en el spawn
          nextPos = nextPos + 28 + playerYellow.dice; // Se le suma las casillas para salir del spawn
        }
        else {
          nextPos = playerYellow.piece4.box + playerYellow.dice; // Se le suma la casilla + el dado
        }

        if (!playerYellow.piece4.round && nextPos > 52) {
          playerYellow.piece4.round = true;
          nextPos = nextPos - 52;
        }

        if (playerYellow.piece4.round && nextPos > 27 && nextPos < 100) {
          nextPos = 300 + (nextPos - 28);
        }

        if (playerYellow.piece4.round && nextPos > 305) {
          nextPos = 305 - (nextPos - 305);
        }

        if (playerYellow.piece4.round && nextPos == 305) {
          playerYellow.piece4.win = true;

          playerYellow.piece4.mount.forEach(element => {
            if (element == 'piece3') {
              playerYellow.piece3.box = 1000;
              playerYellow.piece3.x = '';
              playerYellow.piece3.y = '';
              playerYellow.piece3.round = false;
              playerYellow.piece3.mount = [];
              playerYellow.piece3.win = true;
            }
            else if (element == 'piece2') {
              playerYellow.piece2.box = 1000;
              playerYellow.piece2.x = '';
              playerYellow.piece2.y = '';
              playerYellow.piece2.round = false;
              playerYellow.piece2.mount = [];
              playerYellow.piece2.win = true;
            }
            else if (element == 'piece1') {
              playerYellow.piece1.box = 1000;
              playerYellow.piece1.x = '';
              playerYellow.piece1.y = '';
              playerYellow.piece1.round = false;
              playerYellow.piece1.mount = [];
              playerYellow.piece1.win = true;
            }
          });
        }

        // playerYellow.piece4.box = nextPos;
      }
    }
  }
  if (playerBlue != '') {
    if (turn == playerBlue.turn) {
      if (piece == 'piece1') {
        if (playerBlue.piece1.box == 0) { // Si esta en el spawn
          nextPos = nextPos + 15 + playerBlue.dice; // Se le suma las casillas para salir del spawn
        }
        else {
          nextPos = playerBlue.piece1.box + playerBlue.dice; // Se le suma la casilla + el dado
        }

        if (!playerBlue.piece1.round && nextPos > 52) {
          playerBlue.piece1.round = true;
          nextPos = nextPos - 52;
        }

        if (playerBlue.piece1.round && nextPos > 14 && nextPos < 100) {
          nextPos = 200 + (nextPos - 15);
        }

        if (playerBlue.piece1.round && nextPos > 205) {
          nextPos = 205 - (nextPos - 205);
        }

        if (playerBlue.piece1.round && nextPos == 205) {
          playerBlue.piece1.win = true;

          playerBlue.piece1.mount.forEach(element => {
            if (element == 'piece3') {
              playerBlue.piece3.box = 1000;
              playerBlue.piece3.x = '';
              playerBlue.piece3.y = '';
              playerBlue.piece3.round = false;
              playerBlue.piece3.mount = [];
              playerBlue.piece3.win = true;
            }
            else if (element == 'piece2') {
              playerBlue.piece2.box = 1000;
              playerBlue.piece2.x = '';
              playerBlue.piece2.y = '';
              playerBlue.piece2.round = false;
              playerBlue.piece2.mount = [];
              playerBlue.piece2.win = true;
            }
            else if (element == 'piece4') {
              playerBlue.piece4.box = 1000;
              playerBlue.piece4.x = '';
              playerBlue.piece4.y = '';
              playerBlue.piece4.round = false;
              playerBlue.piece4.mount = [];
              playerBlue.piece4.win = true;
            }
          });
        }

        // playerBlue.piece1.box = nextPos;
      }
      else if (piece == 'piece2') {
        if (playerBlue.piece2.box == 0) { // Si esta en el spawn
          nextPos = nextPos + 15 + playerBlue.dice; // Se le suma las casillas para salir del spawn
        }
        else {
          nextPos = playerBlue.piece2.box + playerBlue.dice; // Se le suma la casilla + el dado
        }

        if (!playerBlue.piece2.round && nextPos > 52) {
          playerBlue.piece2.round = true;
          nextPos = nextPos - 52;
        }

        if (playerBlue.piece2.round && nextPos > 14 && nextPos < 100) {
          nextPos = 200 + (nextPos - 15);
        }

        if (playerBlue.piece2.round && nextPos > 205) {
          nextPos = 205 - (nextPos - 205);
        }

        if (playerBlue.piece2.round && nextPos == 205) {
          playerBlue.piece2.win = true;

          playerBlue.piece2.mount.forEach(element => {
            if (element == 'piece3') {
              playerBlue.piece3.box = 1000;
              playerBlue.piece3.x = '';
              playerBlue.piece3.y = '';
              playerBlue.piece3.round = false;
              playerBlue.piece3.mount = [];
              playerBlue.piece3.win = true;
            }
            else if (element == 'piece1') {
              playerBlue.piece1.box = 1000;
              playerBlue.piece1.x = '';
              playerBlue.piece1.y = '';
              playerBlue.piece1.round = false;
              playerBlue.piece1.mount = [];
              playerBlue.piece1.win = true;
            }
            else if (element == 'piece4') {
              playerBlue.piece4.box = 1000;
              playerBlue.piece4.x = '';
              playerBlue.piece4.y = '';
              playerBlue.piece4.round = false;
              playerBlue.piece4.mount = [];
              playerBlue.piece4.win = true;
            }
          });
        }

        // playerBlue.piece2.box = nextPos;
      }
      else if (piece == 'piece3') {
        if (playerBlue.piece3.box == 0) { // Si esta en el spawn
          nextPos = nextPos + 15 + playerBlue.dice; // Se le suma las casillas para salir del spawn
        }
        else {
          nextPos = playerBlue.piece3.box + playerBlue.dice; // Se le suma la casilla + el dado
        }

        if (!playerBlue.piece3.round && nextPos > 52) {
          playerBlue.piece3.round = true;
          nextPos = nextPos - 52;
        }

        if (playerBlue.piece3.round && nextPos > 14 && nextPos < 100) {
          nextPos = 200 + (nextPos - 15);
        }

        if (playerBlue.piece3.round && nextPos > 205) {
          nextPos = 205 - (nextPos - 205);
        }

        if (playerBlue.piece3.round && nextPos == 205) {
          playerBlue.piece3.win = true;

          playerBlue.piece3.mount.forEach(element => {
            if (element == 'piece1') {
              playerBlue.piece1.box = 1000;
              playerBlue.piece1.x = '';
              playerBlue.piece1.y = '';
              playerBlue.piece1.round = false;
              playerBlue.piece1.mount = [];
              playerBlue.piece1.win = true;
            }
            else if (element == 'piece2') {
              playerBlue.piece2.box = 1000;
              playerBlue.piece2.x = '';
              playerBlue.piece2.y = '';
              playerBlue.piece2.round = false;
              playerBlue.piece2.mount = [];
              playerBlue.piece2.win = true;
            }
            else if (element == 'piece4') {
              playerBlue.piece4.box = 1000;
              playerBlue.piece4.x = '';
              playerBlue.piece4.y = '';
              playerBlue.piece4.round = false;
              playerBlue.piece4.mount = [];
              playerBlue.piece4.win = true;
            }
          });
        }

        // playerBlue.piece3.box = nextPos;
      }
      else if (piece == 'piece4') {
        if (playerBlue.piece4.box == 0) { // Si esta en el spawn
          nextPos = nextPos + 15 + playerBlue.dice; // Se le suma las casillas para salir del spawn
        }
        else {
          nextPos = playerBlue.piece4.box + playerBlue.dice; // Se le suma la casilla + el dado
        }

        if (!playerBlue.piece4.round && nextPos > 52) {
          playerBlue.piece4.round = true;
          nextPos = nextPos - 52;
        }

        if (playerBlue.piece4.round && nextPos > 14 && nextPos < 100) {
          nextPos = 200 + (nextPos - 15);
        }

        if (playerBlue.piece4.round && nextPos > 205) {
          nextPos = 205 - (nextPos - 205);
        }

        if (playerBlue.piece4.round && nextPos == 205) {
          playerBlue.piece4.win = true;

          playerBlue.piece4.mount.forEach(element => {
            if (element == 'piece3') {
              playerBlue.piece3.box = 1000;
              playerBlue.piece3.x = '';
              playerBlue.piece3.y = '';
              playerBlue.piece3.round = false;
              playerBlue.piece3.mount = [];
              playerBlue.piece3.win = true;
            }
            else if (element == 'piece2') {
              playerBlue.piece2.box = 1000;
              playerBlue.piece2.x = '';
              playerBlue.piece2.y = '';
              playerBlue.piece2.round = false;
              playerBlue.piece2.mount = [];
              playerBlue.piece2.win = true;
            }
            else if (element == 'piece1') {
              playerBlue.piece1.box = 1000;
              playerBlue.piece1.x = '';
              playerBlue.piece1.y = '';
              playerBlue.piece1.round = false;
              playerBlue.piece1.mount = [];
              playerBlue.piece1.win = true;
            }
          });
        }

        // playerBlue.piece4.box = nextPos;
      }
    }
  }
  if (playerRed != '') {
    if (turn == playerRed.turn) {
      if (piece == 'piece1') {
        if (playerRed.piece1.box == 0) { // Si esta en el spawn
          nextPos = nextPos + 2 + playerRed.dice; // Se le suma las casillas para salir del spawn
        }
        else {
          nextPos = playerRed.piece1.box + playerRed.dice; // Se le suma la casilla + el dado
        }

        if (!playerRed.piece1.round && nextPos > 52) {
          playerRed.piece1.round = true;
          nextPos = nextPos - 52;
        }

        if (playerRed.piece1.round && nextPos > 1 && nextPos < 100) {
          nextPos = 100 + (nextPos - 2);
        }

        if (playerRed.piece1.round && nextPos > 105) {
          nextPos = 105 - (nextPos - 105);
        }

        if (playerRed.piece1.round && nextPos == 105) {
          playerRed.piece1.win = true;

          playerRed.piece1.mount.forEach(element => {
            if (element == 'piece3') {
              playerRed.piece3.box = 1000;
              playerRed.piece3.x = '';
              playerRed.piece3.y = '';
              playerRed.piece3.round = false;
              playerRed.piece3.mount = [];
              playerRed.piece3.win = true;
            }
            else if (element == 'piece2') {
              playerRed.piece2.box = 1000;
              playerRed.piece2.x = '';
              playerRed.piece2.y = '';
              playerRed.piece2.round = false;
              playerRed.piece2.mount = [];
              playerRed.piece2.win = true;
            }
            else if (element == 'piece4') {
              playerRed.piece4.box = 1000;
              playerRed.piece4.x = '';
              playerRed.piece4.y = '';
              playerRed.piece4.round = false;
              playerRed.piece4.mount = [];
              playerRed.piece4.win = true;
            }
          });
        }

        // playerRed.piece1.box = nextPos;
      }
      else if (piece == 'piece2') {
        if (playerRed.piece2.box == 0) { // Si esta en el spawn
          nextPos = nextPos + 2 + playerRed.dice; // Se le suma las casillas para salir del spawn
        }
        else {
          nextPos = playerRed.piece2.box + playerRed.dice; // Se le suma la casilla + el dado
        }

        if (!playerRed.piece2.round && nextPos > 52) {
          playerRed.piece2.round = true;
          nextPos = nextPos - 52;
        }

        if (playerRed.piece2.round && nextPos > 1 && nextPos < 100) {
          nextPos = 100 + (nextPos - 2);
        }

        if (playerRed.piece2.round && nextPos > 105) {
          nextPos = 105 - (nextPos - 105);
        }

        if (playerRed.piece2.round && nextPos == 105) {
          playerRed.piece2.win = true;

          playerRed.piece2.mount.forEach(element => {
            if (element == 'piece3') {
              playerRed.piece3.box = 1000;
              playerRed.piece3.x = '';
              playerRed.piece3.y = '';
              playerRed.piece3.round = false;
              playerRed.piece3.mount = [];
              playerRed.piece3.win = true;
            }
            else if (element == 'piece1') {
              playerRed.piece1.box = 1000;
              playerRed.piece1.x = '';
              playerRed.piece1.y = '';
              playerRed.piece1.round = false;
              playerRed.piece1.mount = [];
              playerRed.piece1.win = true;
            }
            else if (element == 'piece4') {
              playerRed.piece4.box = 1000;
              playerRed.piece4.x = '';
              playerRed.piece4.y = '';
              playerRed.piece4.round = false;
              playerRed.piece4.mount = [];
              playerRed.piece4.win = true;
            }
          });
        }

        // playerRed.piece2.box = nextPos;
      }
      else if (piece == 'piece3') {
        if (playerRed.piece3.box == 0) { // Si esta en el spawn
          nextPos = nextPos + 2 + playerRed.dice; // Se le suma las casillas para salir del spawn
        }
        else {
          nextPos = playerRed.piece3.box + playerRed.dice; // Se le suma la casilla + el dado
        }

        if (!playerRed.piece3.round && nextPos > 52) {
          playerRed.piece3.round = true;
          nextPos = nextPos - 52;
        }

        if (playerRed.piece3.round && nextPos > 1 && nextPos < 100) {
          nextPos = 100 + (nextPos - 2);
        }

        if (playerRed.piece3.round && nextPos > 105) {
          nextPos = 105 - (nextPos - 105);
        }

        if (playerRed.piece3.round && nextPos == 105) {
          playerRed.piece3.win = true;

          playerRed.piece3.mount.forEach(element => {
            if (element == 'piece1') {
              playerRed.piece1.box = 1000;
              playerRed.piece1.x = '';
              playerRed.piece1.y = '';
              playerRed.piece1.round = false;
              playerRed.piece1.mount = [];
              playerRed.piece1.win = true;
            }
            else if (element == 'piece2') {
              playerRed.piece2.box = 1000;
              playerRed.piece2.x = '';
              playerRed.piece2.y = '';
              playerRed.piece2.round = false;
              playerRed.piece2.mount = [];
              playerRed.piece2.win = true;
            }
            else if (element == 'piece4') {
              playerRed.piece4.box = 1000;
              playerRed.piece4.x = '';
              playerRed.piece4.y = '';
              playerRed.piece4.round = false;
              playerRed.piece4.mount = [];
              playerRed.piece4.win = true;
            }
          });
        }

        // playerRed.piece3.box = nextPos;
      }
      else if (piece == 'piece4') {
        if (playerRed.piece4.box == 0) { // Si esta en el spawn
          nextPos = nextPos + 2 + playerRed.dice; // Se le suma las casillas para salir del spawn
        }
        else {
          nextPos = playerRed.piece4.box + playerRed.dice; // Se le suma la casilla + el dado
        }

        if (!playerRed.piece4.round && nextPos > 52) {
          playerRed.piece4.round = true;
          nextPos = nextPos - 52;
        }

        if (playerRed.piece4.round && nextPos > 1 && nextPos < 100) {
          nextPos = 100 + (nextPos - 2);
        }

        if (playerRed.piece4.round && nextPos > 105) {
          nextPos = 105 - (nextPos - 105);
        }

        if (playerRed.piece4.round && nextPos == 105) {
          playerRed.piece4.win = true;

          playerRed.piece4.mount.forEach(element => {
            if (element == 'piece3') {
              playerRed.piece3.box = 1000;
              playerRed.piece3.x = '';
              playerRed.piece3.y = '';
              playerRed.piece3.round = false;
              playerRed.piece3.mount = [];
              playerRed.piece3.win = true;
            }
            else if (element == 'piece2') {
              playerRed.piece2.box = 1000;
              playerRed.piece2.x = '';
              playerRed.piece2.y = '';
              playerRed.piece2.round = false;
              playerRed.piece2.mount = [];
              playerRed.piece2.win = true;
            }
            else if (element == 'piece1') {
              playerRed.piece1.box = 1000;
              playerRed.piece1.x = '';
              playerRed.piece1.y = '';
              playerRed.piece1.round = false;
              playerRed.piece1.mount = [];
              playerRed.piece1.win = true;
            }
          });
        }

        // playerRed.piece4.box = nextPos;
      }
    }
  }
  return nextPos;
}

function searchBox (nextPos) {
  for (const box in board) {
    if (box == 'casilla'+nextPos) {
      return board[box];
    }
  }
}

function verifyBox (nextPos, turn) {
  let validate = [];
  if (playerGreen != '') {
    if (playerGreen.piece1.box == nextPos) {
      if (playerGreen.turn == turn) {
        return validate = ['friendly', 'green', 'piece1'];
      }
      else {
        return validate = ['enemy', 'green', 'piece1'];
      }
    }
    else if (playerGreen.piece2.box == nextPos) {
      if (playerGreen.turn == turn) {
        return validate = ['friendly', 'green', 'piece2'];
      }
      else {
        return validate = ['enemy', 'green', 'piece2'];
      }
    }
    else if (playerGreen.piece3.box == nextPos) {
      if (playerGreen.turn == turn) {
        return validate = ['friendly', 'green', 'piece3'];
      }
      else {
        return validate = ['enemy', 'green', 'piece3'];
      }
    }
    else if (playerGreen.piece4.box == nextPos) {
      if (playerGreen.turn == turn) {
        return validate = ['friendly', 'green', 'piece4'];
      }
      else {
        return validate = ['enemy', 'green', 'piece4'];
      }
    }
  }
  if (playerYellow != '') {
    if (playerYellow.piece1.box == nextPos) {
      if (playerYellow.turn == turn) {
        return validate = ['friendly', 'yellow', 'piece1'];
      }
      else {
        return validate = ['enemy', 'yellow', 'piece1'];
      }
    }
    else if (playerYellow.piece2.box == nextPos) {
      if (playerYellow.turn == turn) {
        return validate = ['friendly', 'yellow', 'piece2'];
      }
      else {
        return validate = ['enemy', 'yellow', 'piece2'];
      }
    }
    else if (playerYellow.piece3.box == nextPos) {
      if (playerYellow.turn == turn) {
        return validate = ['friendly', 'yellow', 'piece3'];
      }
      else {
        return validate = ['enemy', 'yellow', 'piece3'];
      }
    }
    else if (playerYellow.piece4.box == nextPos) {
      if (playerYellow.turn == turn) {
        validate = ['friendly', 'yellow', 'piece4'];
      }
      else {
        validate = ['enemy', 'yellow', 'piece4'];
      }
    }
  }
  if (playerBlue != '') {
    if (playerBlue.piece1.box == nextPos) {
      if (playerBlue.turn == turn) {
        return validate = ['friendly', 'blue', 'piece1'];
      }
      else {
        return validate = ['enemy', 'blue', 'piece1'];
      }
    }
    else if (playerBlue.piece2.box == nextPos) {
      if (playerBlue.turn == turn) {
        return validate = ['friendly', 'blue', 'piece2'];
      }
      else {
        return validate = ['enemy', 'blue', 'piece2'];
      }
    }
    else if (playerBlue.piece3.box == nextPos) {
      if (playerBlue.turn == turn) {
        return validate = ['friendly', 'blue', 'piece3'];
      }
      else {
        return validate = ['enemy', 'blue', 'piece3'];
      }
    }
    else if (playerBlue.piece4.box == nextPos) {
      if (playerBlue.turn == turn) {
        return validate = ['friendly', 'blue', 'piece4'];
      }
      else {
        return validate = ['enemy', 'blue', 'piece4'];
      }
    }
  }
  if (playerRed != '') {
    if (playerRed.piece1.box == nextPos) {
      if (playerRed.turn == turn) {
        return validate = ['friendly', 'red', 'piece1'];
      }
      else {
        return validate = ['enemy', 'red', 'piece1'];
      }
    }
    else if (playerRed.piece2.box == nextPos) {
      if (playerRed.turn == turn) {
        return validate = ['friendly', 'red', 'piece2'];
      }
      else {
        return validate = ['enemy', 'red', 'piece2'];
      }
    }
    else if (playerRed.piece3.box == nextPos) {
      if (playerRed.turn == turn) {
        return validate = ['friendly', 'red', 'piece3'];
      }
      else {
        return validate = ['enemy', 'red', 'piece3'];
      }
    }
    else if (playerRed.piece4.box == nextPos) {
      if (playerRed.turn == turn) {
        return validate = ['friendly', 'red', 'piece4'];
      }
      else {
        return validate = ['enemy', 'red', 'piece4'];
      }
    }
  }
  return validate = ['nothing', '', ''];
}

function killToEnemy (color, piece) {
  if (playerGreen != '') {
    if (playerGreen.color == color) {
      if (piece == 'piece1') {
        playerGreen.piece1.mount.forEach(element => {
          if (element == 'piece2') {
            playerGreen.piece2.box = 0;
            playerGreen.piece2.x = spawnGreen.piece2.x;
            playerGreen.piece2.y = spawnGreen.piece2.y;
            playerGreen.piece2.round = false;
            playerGreen.piece2.mount = [];
          }
          else if (element == 'piece3') {
            playerGreen.piece3.box = 0;
            playerGreen.piece3.x = spawnGreen.piece3.x;
            playerGreen.piece3.y = spawnGreen.piece3.y;
            playerGreen.piece3.round = false;
            playerGreen.piece3.mount = [];
          }
          else if (element == 'piece4') {
            playerGreen.piece4.box = 0;
            playerGreen.piece4.x = spawnGreen.piece4.x;
            playerGreen.piece4.y = spawnGreen.piece4.y;
            playerGreen.piece4.round = false;
            playerGreen.piece4.mount = [];
          }
        });
        playerGreen.piece1.box = 0;
        playerGreen.piece1.x = spawnGreen.piece1.x;
        playerGreen.piece1.y = spawnGreen.piece1.y;
        playerGreen.piece1.round = false;
        playerGreen.piece1.mount = [];

        return 0;
      }
      else if (piece == 'piece2') {
        playerGreen.piece2.mount.forEach(element => {
          if (element == 'piece1') {
            playerGreen.piece1.box = 0;
            playerGreen.piece1.x = spawnGreen.piece1.x;
            playerGreen.piece1.y = spawnGreen.piece1.y;
            playerGreen.piece1.round = false;
            playerGreen.piece1.mount = [];
          }
          else if (element == 'piece3') {
            playerGreen.piece3.box = 0;
            playerGreen.piece3.x = spawnGreen.piece3.x;
            playerGreen.piece3.y = spawnGreen.piece3.y;
            playerGreen.piece3.round = false;
            playerGreen.piece3.mount = [];
          }
          else if (element == 'piece4') {
            playerGreen.piece4.box = 0;
            playerGreen.piece4.x = spawnGreen.piece4.x;
            playerGreen.piece4.y = spawnGreen.piece4.y;
            playerGreen.piece4.round = false;
            playerGreen.piece4.mount = [];
          }
        });
        playerGreen.piece2.box = 0;
        playerGreen.piece2.x = spawnGreen.piece2.x;
        playerGreen.piece2.y = spawnGreen.piece2.y;
        playerGreen.piece2.round = false;
        playerGreen.piece2.mount = [];

        return 0;
      }
      else if (piece == 'piece3') {
        playerGreen.piece3.mount.forEach(element => {
          if (element == 'piece1') {
            playerGreen.piece1.box = 0;
            playerGreen.piece1.x = spawnGreen.piece1.x;
            playerGreen.piece1.y = spawnGreen.piece1.y;
            playerGreen.piece1.round = false;
            playerGreen.piece1.mount = [];
          }
          else if (element == 'piece2') {
            playerGreen.piece2.box = 0;
            playerGreen.piece2.x = spawnGreen.piece2.x;
            playerGreen.piece2.y = spawnGreen.piece2.y;
            playerGreen.piece2.round = false;
            playerGreen.piece2.mount = [];
          }
          else if (element == 'piece4') {
            playerGreen.piece4.box = 0;
            playerGreen.piece4.x = spawnGreen.piece4.x;
            playerGreen.piece4.y = spawnGreen.piece4.y;
            playerGreen.piece4.round = false;
            playerGreen.piece4.mount = [];
          }
        });
        playerGreen.piece3.box = 0;
        playerGreen.piece3.x = spawnGreen.piece3.x;
        playerGreen.piece3.y = spawnGreen.piece3.y;
        playerGreen.piece3.round = false;
        playerGreen.piece3.mount = [];

        return 0;
      }
      else if (piece == 'piece4') {
        playerGreen.piece4.mount.forEach(element => {
          if (element == 'piece1') {
            playerGreen.piece1.box = 0;
            playerGreen.piece1.x = spawnGreen.piece1.x;
            playerGreen.piece1.y = spawnGreen.piece1.y;
            playerGreen.piece1.round = false;
            playerGreen.piece1.mount = [];
          }
          else if (element == 'piece2') {
            playerGreen.piece2.box = 0;
            playerGreen.piece2.x = spawnGreen.piece2.x;
            playerGreen.piece2.y = spawnGreen.piece2.y;
            playerGreen.piece2.round = false;
            playerGreen.piece2.mount = [];
          }
          else if (element == 'piece3') {
            playerGreen.piece3.box = 0;
            playerGreen.piece3.x = spawnGreen.piece3.x;
            playerGreen.piece3.y = spawnGreen.piece3.y;
            playerGreen.piece3.round = false;
            playerGreen.piece3.mount = [];
          }
        });
        playerGreen.piece4.box = 0;
        playerGreen.piece4.x = spawnGreen.piece4.x;
        playerGreen.piece4.y = spawnGreen.piece4.y;
        playerGreen.piece4.round = false;
        playerGreen.piece4.mount = [];

        return 0;
      }
    }
  }
  if (playerYellow != '') {
    if (playerYellow.color == color) {
      if (piece == 'piece1') {
        playerYellow.piece1.mount.forEach(element => {
          if (element == 'piece2') {
            playerYellow.piece2.box = 0;
            playerYellow.piece2.x = spawnYellow.piece2.x;
            playerYellow.piece2.y = spawnYellow.piece2.y;
            playerYellow.piece2.round = false;
            playerYellow.piece2.mount = [];
          }
          else if (element == 'piece3') {
            playerYellow.piece3.box = 0;
            playerYellow.piece3.x = spawnYellow.piece3.x;
            playerYellow.piece3.y = spawnYellow.piece3.y;
            playerYellow.piece3.round = false;
            playerYellow.piece3.mount = [];
          }
          else if (element == 'piece4') {
            playerYellow.piece4.box = 0;
            playerYellow.piece4.x = spawnYellow.piece4.x;
            playerYellow.piece4.y = spawnYellow.piece4.y;
            playerYellow.piece4.round = false;
            playerYellow.piece4.mount = [];
          }
        });
        playerYellow.piece1.box = 0;
        playerYellow.piece1.x = spawnYellow.piece1.x;
        playerYellow.piece1.y = spawnYellow.piece1.y;
        playerYellow.piece1.round = false;
        playerYellow.piece1.mount = [];

        return 0;
      }
      else if (piece == 'piece2') {
        playerYellow.piece2.mount.forEach(element => {
          if (element == 'piece1') {
            playerYellow.piece1.box = 0;
            playerYellow.piece1.x = spawnYellow.piece1.x;
            playerYellow.piece1.y = spawnYellow.piece1.y;
            playerYellow.piece1.round = false;
            playerYellow.piece1.mount = [];
          }
          else if (element == 'piece3') {
            playerYellow.piece3.box = 0;
            playerYellow.piece3.x = spawnYellow.piece3.x;
            playerYellow.piece3.y = spawnYellow.piece3.y;
            playerYellow.piece3.round = false;
            playerYellow.piece3.mount = [];
          }
          else if (element == 'piece4') {
            playerYellow.piece4.box = 0;
            playerYellow.piece4.x = spawnYellow.piece4.x;
            playerYellow.piece4.y = spawnYellow.piece4.y;
            playerYellow.piece4.round = false;
            playerYellow.piece4.mount = [];
          }
        });
        playerYellow.piece2.box = 0;
        playerYellow.piece2.x = spawnYellow.piece2.x;
        playerYellow.piece2.y = spawnYellow.piece2.y;
        playerYellow.piece2.round = false;
        playerYellow.piece2.mount = [];

        return 0;
      }
      else if (piece == 'piece3') {
        playerYellow.piece3.mount.forEach(element => {
          if (element == 'piece1') {
            playerYellow.piece1.box = 0;
            playerYellow.piece1.x = spawnYellow.piece1.x;
            playerYellow.piece1.y = spawnYellow.piece1.y;
            playerYellow.piece1.round = false;
            playerYellow.piece1.mount = [];
          }
          else if (element == 'piece2') {
            playerYellow.piece2.box = 0;
            playerYellow.piece2.x = spawnYellow.piece2.x;
            playerYellow.piece2.y = spawnYellow.piece2.y;
            playerYellow.piece2.round = false;
            playerYellow.piece2.mount = [];
          }
          else if (element == 'piece4') {
            playerYellow.piece4.box = 0;
            playerYellow.piece4.x = spawnYellow.piece4.x;
            playerYellow.piece4.y = spawnYellow.piece4.y;
            playerYellow.piece4.round = false;
            playerYellow.piece4.mount = [];
          }
        });
        playerYellow.piece3.box = 0;
        playerYellow.piece3.x = spawnYellow.piece3.x;
        playerYellow.piece3.y = spawnYellow.piece3.y;
        playerYellow.piece3.round = false;
        playerYellow.piece3.mount = [];

        return 0;
      }
      else if (piece == 'piece4') {
        playerYellow.piece4.mount.forEach(element => {
          if (element == 'piece1') {
            playerYellow.piece1.box = 0;
            playerYellow.piece1.x = spawnYellow.piece1.x;
            playerYellow.piece1.y = spawnYellow.piece1.y;
            playerYellow.piece1.round = false;
            playerYellow.piece1.mount = [];
          }
          else if (element == 'piece2') {
            playerYellow.piece2.box = 0;
            playerYellow.piece2.x = spawnYellow.piece2.x;
            playerYellow.piece2.y = spawnYellow.piece2.y;
            playerYellow.piece2.round = false;
            playerYellow.piece2.mount = [];
          }
          else if (element == 'piece3') {
            playerYellow.piece3.box = 0;
            playerYellow.piece3.x = spawnYellow.piece3.x;
            playerYellow.piece3.y = spawnYellow.piece3.y;
            playerYellow.piece3.round = false;
            playerYellow.piece3.mount = [];
          }
        });
        playerYellow.piece4.box = 0;
        playerYellow.piece4.x = spawnYellow.piece4.x;
        playerYellow.piece4.y = spawnYellow.piece4.y;
        playerYellow.piece4.round = false;
        playerYellow.piece4.mount = [];

        return 0;
      }
    }
  }
  if (playerBlue != '') {
    if (playerBlue.color == color) {
      if (piece == 'piece1') {
        playerBlue.piece1.mount.forEach(element => {
          if (element == 'piece2') {
            playerBlue.piece2.box = 0;
            playerBlue.piece2.x = spawnBlue.piece2.x;
            playerBlue.piece2.y = spawnBlue.piece2.y;
            playerBlue.piece2.round = false;
            playerBlue.piece2.mount = [];
          }
          else if (element == 'piece3') {
            playerBlue.piece3.box = 0;
            playerBlue.piece3.x = spawnBlue.piece3.x;
            playerBlue.piece3.y = spawnBlue.piece3.y;
            playerBlue.piece3.round = false;
            playerBlue.piece3.mount = [];
          }
          else if (element == 'piece4') {
            playerBlue.piece4.box = 0;
            playerBlue.piece4.x = spawnBlue.piece4.x;
            playerBlue.piece4.y = spawnBlue.piece4.y;
            playerBlue.piece4.round = false;
            playerBlue.piece4.mount = [];
          }
        });
        playerBlue.piece1.box = 0;
        playerBlue.piece1.x = spawnBlue.piece1.x;
        playerBlue.piece1.y = spawnBlue.piece1.y;
        playerBlue.piece1.round = false;
        playerBlue.piece1.mount = [];

        return 0;
      }
      else if (piece == 'piece2') {
        playerBlue.piece2.mount.forEach(element => {
          if (element == 'piece1') {
            playerBlue.piece1.box = 0;
            playerBlue.piece1.x = spawnBlue.piece1.x;
            playerBlue.piece1.y = spawnBlue.piece1.y;
            playerBlue.piece1.round = false;
            playerBlue.piece1.mount = [];
          }
          else if (element == 'piece3') {
            playerBlue.piece3.box = 0;
            playerBlue.piece3.x = spawnBlue.piece3.x;
            playerBlue.piece3.y = spawnBlue.piece3.y;
            playerBlue.piece3.round = false;
            playerBlue.piece3.mount = [];
          }
          else if (element == 'piece4') {
            playerBlue.piece4.box = 0;
            playerBlue.piece4.x = spawnBlue.piece4.x;
            playerBlue.piece4.y = spawnBlue.piece4.y;
            playerBlue.piece4.round = false;
            playerBlue.piece4.mount = [];
          }
        });
        playerBlue.piece2.box = 0;
        playerBlue.piece2.x = spawnBlue.piece2.x;
        playerBlue.piece2.y = spawnBlue.piece2.y;
        playerBlue.piece2.round = false;
        playerBlue.piece2.mount = [];

        return 0;
      }
      else if (piece == 'piece3') {
        playerBlue.piece3.mount.forEach(element => {
          if (element == 'piece1') {
            playerBlue.piece1.box = 0;
            playerBlue.piece1.x = spawnBlue.piece1.x;
            playerBlue.piece1.y = spawnBlue.piece1.y;
            playerBlue.piece1.round = false;
            playerBlue.piece1.mount = [];
          }
          else if (element == 'piece2') {
            playerBlue.piece2.box = 0;
            playerBlue.piece2.x = spawnBlue.piece2.x;
            playerBlue.piece2.y = spawnBlue.piece2.y;
            playerBlue.piece2.round = false;
            playerBlue.piece2.mount = [];
          }
          else if (element == 'piece4') {
            playerBlue.piece4.box = 0;
            playerBlue.piece4.x = spawnBlue.piece4.x;
            playerBlue.piece4.y = spawnBlue.piece4.y;
            playerBlue.piece4.round = false;
            playerBlue.piece4.mount = [];
          }
        });
        playerBlue.piece3.box = 0;
        playerBlue.piece3.x = spawnBlue.piece3.x;
        playerBlue.piece3.y = spawnBlue.piece3.y;
        playerBlue.piece3.round = false;
        playerBlue.piece3.mount = [];

        return 0;
      }
      else if (piece == 'piece4') {
        playerBlue.piece4.mount.forEach(element => {
          if (element == 'piece1') {
            playerBlue.piece1.box = 0;
            playerBlue.piece1.x = spawnBlue.piece1.x;
            playerBlue.piece1.y = spawnBlue.piece1.y;
            playerBlue.piece1.round = false;
            playerBlue.piece1.mount = [];
          }
          else if (element == 'piece2') {
            playerBlue.piece2.box = 0;
            playerBlue.piece2.x = spawnBlue.piece2.x;
            playerBlue.piece2.y = spawnBlue.piece2.y;
            playerBlue.piece2.round = false;
            playerBlue.piece2.mount = [];
          }
          else if (element == 'piece3') {
            playerBlue.piece3.box = 0;
            playerBlue.piece3.x = spawnBlue.piece3.x;
            playerBlue.piece3.y = spawnBlue.piece3.y;
            playerBlue.piece3.round = false;
            playerBlue.piece3.mount = [];
          }
        });
        playerBlue.piece4.box = 0;
        playerBlue.piece4.x = spawnBlue.piece4.x;
        playerBlue.piece4.y = spawnBlue.piece4.y;
        playerBlue.piece4.round = false;
        playerBlue.piece4.mount = [];

        return 0;
      }
    }
  }
  if (playerRed != '') {
    if (playerRed.color == color) {
      if (piece == 'piece1') {
        playerRed.piece1.mount.forEach(element => {
          if (element == 'piece2') {
            playerRed.piece2.box = 0;
            playerRed.piece2.x = spawnRed.piece2.x;
            playerRed.piece2.y = spawnRed.piece2.y;
            playerRed.piece2.round = false;
            playerRed.piece2.mount = [];
          }
          else if (element == 'piece3') {
            playerRed.piece3.box = 0;
            playerRed.piece3.x = spawnRed.piece3.x;
            playerRed.piece3.y = spawnRed.piece3.y;
            playerRed.piece3.round = false;
            playerRed.piece3.mount = [];
          }
          else if (element == 'piece4') {
            playerRed.piece4.box = 0;
            playerRed.piece4.x = spawnRed.piece4.x;
            playerRed.piece4.y = spawnRed.piece4.y;
            playerRed.piece4.round = false;
            playerRed.piece4.mount = [];
          }
        });
        playerRed.piece1.box = 0;
        playerRed.piece1.x = spawnRed.piece1.x;
        playerRed.piece1.y = spawnRed.piece1.y;
        playerRed.piece1.round = false;
        playerRed.piece1.mount = [];

        return 0;
      }
      else if (piece == 'piece2') {
        playerRed.piece2.mount.forEach(element => {
          if (element == 'piece1') {
            playerRed.piece1.box = 0;
            playerRed.piece1.x = spawnRed.piece1.x;
            playerRed.piece1.y = spawnRed.piece1.y;
            playerRed.piece1.round = false;
            playerRed.piece1.mount = [];
          }
          else if (element == 'piece3') {
            playerRed.piece3.box = 0;
            playerRed.piece3.x = spawnRed.piece3.x;
            playerRed.piece3.y = spawnRed.piece3.y;
            playerRed.piece3.round = false;
            playerRed.piece3.mount = [];
          }
          else if (element == 'piece4') {
            playerRed.piece4.box = 0;
            playerRed.piece4.x = spawnRed.piece4.x;
            playerRed.piece4.y = spawnRed.piece4.y;
            playerRed.piece4.round = false;
            playerRed.piece4.mount = [];
          }
        });
        playerRed.piece2.box = 0;
        playerRed.piece2.x = spawnRed.piece2.x;
        playerRed.piece2.y = spawnRed.piece2.y;
        playerRed.piece2.round = false;
        playerRed.piece2.mount = [];

        return 0;
      }
      else if (piece == 'piece3') {
        playerRed.piece3.mount.forEach(element => {
          if (element == 'piece1') {
            playerRed.piece1.box = 0;
            playerRed.piece1.x = spawnRed.piece1.x;
            playerRed.piece1.y = spawnRed.piece1.y;
            playerRed.piece1.round = false;
            playerRed.piece1.mount = [];
          }
          else if (element == 'piece2') {
            playerRed.piece2.box = 0;
            playerRed.piece2.x = spawnRed.piece2.x;
            playerRed.piece2.y = spawnRed.piece2.y;
            playerRed.piece2.round = false;
            playerRed.piece2.mount = [];
          }
          else if (element == 'piece4') {
            playerRed.piece4.box = 0;
            playerRed.piece4.x = spawnRed.piece4.x;
            playerRed.piece4.y = spawnRed.piece4.y;
            playerRed.piece4.round = false;
            playerRed.piece4.mount = [];
          }
        });
        playerRed.piece3.box = 0;
        playerRed.piece3.x = spawnRed.piece3.x;
        playerRed.piece3.y = spawnRed.piece3.y;
        playerRed.piece3.round = false;
        playerRed.piece3.mount = [];

        return 0;
      }
      else if (piece == 'piece4') {
        playerRed.piece4.mount.forEach(element => {
          if (element == 'piece1') {
            playerRed.piece1.box = 0;
            playerRed.piece1.x = spawnRed.piece1.x;
            playerRed.piece1.y = spawnRed.piece1.y;
            playerRed.piece1.round = false;
            playerRed.piece1.mount = [];
          }
          else if (element == 'piece2') {
            playerRed.piece2.box = 0;
            playerRed.piece2.x = spawnRed.piece2.x;
            playerRed.piece2.y = spawnRed.piece2.y;
            playerRed.piece2.round = false;
            playerRed.piece2.mount = [];
          }
          else if (element == 'piece3') {
            playerRed.piece3.box = 0;
            playerRed.piece3.x = spawnRed.piece3.x;
            playerRed.piece3.y = spawnRed.piece3.y;
            playerRed.piece3.round = false;
            playerRed.piece3.mount = [];
          }
        });
        playerRed.piece4.box = 0;
        playerRed.piece4.x = spawnRed.piece4.x;
        playerRed.piece4.y = spawnRed.piece4.y;
        playerRed.piece4.round = false;
        playerRed.piece4.mount = [];

        return 0;
      }
    }
  }
}

function mountPiece(color, piece, pieceSelected) {
  if (playerGreen != '') {
    if (playerGreen.color == color) {
      if (pieceSelected == 'piece1') {
        if (piece == 'piece2') {
          playerGreen.piece2.box = 1000;
          playerGreen.piece2.x = '';
          playerGreen.piece2.y = '';
          playerGreen.piece2.mount.forEach(element => {
            if (element == 'piece3') {
              playerGreen.piece3.box = 1000;
              playerGreen.piece3.x = '';
              playerGreen.piece3.y = '';
              playerGreen.piece3.mount = [];
              playerGreen.piece1.mount.push('piece3');
            }
            else if (element == 'piece4') {
              playerGreen.piece4.box = 1000;
              playerGreen.piece4.x = '';
              playerGreen.piece4.y = '';
              playerGreen.piece4.mount = [];
              playerGreen.piece1.mount.push('piece4');
            }
          });
          playerGreen.piece1.mount.push(piece);
        }
        else if (piece == 'piece3') {
          playerGreen.piece3.box = 1000;
          playerGreen.piece3.x = '';
          playerGreen.piece3.y = '';
          playerGreen.piece3.mount.forEach(element => {
            if (element == 'piece2') {
              playerGreen.piece2.box = 1000;
              playerGreen.piece2.x = '';
              playerGreen.piece2.y = '';
              playerGreen.piece2.mount = [];
              playerGreen.piece1.mount.push('piece2');
            }
            else if (element == 'piece4') {
              playerGreen.piece4.box = 1000;
              playerGreen.piece4.x = '';
              playerGreen.piece4.y = '';
              playerGreen.piece4.mount = [];
              playerGreen.piece1.mount.push('piece4');
            }
          });
          playerGreen.piece1.mount.push(piece);
        }
        else if (piece == 'piece4') {
          playerGreen.piece4.box = 1000;
          playerGreen.piece4.x = '';
          playerGreen.piece4.y = '';
          playerGreen.piece4.mount.forEach(element => {
            if (element == 'piece2') {
              playerGreen.piece2.box = 1000;
              playerGreen.piece2.x = '';
              playerGreen.piece2.y = '';
              playerGreen.piece2.mount = [];
              playerGreen.piece1.mount.push('piece2');
            }
            else if (element == 'piece3') {
              playerGreen.piece3.box = 1000;
              playerGreen.piece3.x = '';
              playerGreen.piece3.y = '';
              playerGreen.piece3.mount = [];
              playerGreen.piece1.mount.push('piece3');
            }
          });
          playerGreen.piece1.mount.push(piece);
        }

        return 0;
      }
      else if (pieceSelected == 'piece2') {
        if (piece == 'piece1') {
          playerGreen.piece1.box = 1000;
          playerGreen.piece1.x = '';
          playerGreen.piece1.y = '';
          playerGreen.piece1.mount.forEach(element => {
            if (element == 'piece3') {
              playerGreen.piece3.box = 1000;
              playerGreen.piece3.x = '';
              playerGreen.piece3.y = '';
              playerGreen.piece3.mount = [];
              playerGreen.piece2.mount.push('piece3');
            }
            else if (element == 'piece4') {
              playerGreen.piece4.box = 1000;
              playerGreen.piece4.x = '';
              playerGreen.piece4.y = '';
              playerGreen.piece4.mount = [];
              playerGreen.piece2.mount.push('piece4');
            }
          });
          playerGreen.piece2.mount.push(piece);
        }
        else if (piece == 'piece3') {
          playerGreen.piece3.box = 1000;
          playerGreen.piece3.x = '';
          playerGreen.piece3.y = '';
          playerGreen.piece3.mount.forEach(element => {
            if (element == 'piece1') {
              playerGreen.piece1.box = 1000;
              playerGreen.piece1.x = '';
              playerGreen.piece1.y = '';
              playerGreen.piece1.mount = [];
              playerGreen.piece2.mount.push('piece1');
            }
            else if (element == 'piece4') {
              playerGreen.piece4.box = 1000;
              playerGreen.piece4.x = '';
              playerGreen.piece4.y = '';
              playerGreen.piece4.mount = [];
              playerGreen.piece2.mount.push('piece4');
            }
          });
          playerGreen.piece2.mount.push(piece);
        }
        else if (piece == 'piece4') {
          playerGreen.piece4.box = 1000;
          playerGreen.piece4.x = '';
          playerGreen.piece4.y = '';
          playerGreen.piece4.mount.forEach(element => {
            if (element == 'piece1') {
              playerGreen.piece1.box = 1000;
              playerGreen.piece1.x = '';
              playerGreen.piece1.y = '';
              playerGreen.piece1.mount = [];
              playerGreen.piece2.mount.push('piece1');
            }
            else if (element == 'piece3') {
              playerGreen.piece3.box = 1000;
              playerGreen.piece3.x = '';
              playerGreen.piece3.y = '';
              playerGreen.piece3.mount = [];
              playerGreen.piece2.mount.push('piece3');
            }
          });
          playerGreen.piece2.mount.push(piece);
        }

        return 0;
      }
      else if (pieceSelected == 'piece3') {
        if (piece == 'piece1') {
          playerGreen.piece1.box = 1000;
          playerGreen.piece1.x = '';
          playerGreen.piece1.y = '';
          playerGreen.piece1.mount.forEach(element => {
            if (element == 'piece2') {
              playerGreen.piece2.box = 1000;
              playerGreen.piece2.x = '';
              playerGreen.piece2.y = '';
              playerGreen.piece2.mount = [];
              playerGreen.piece3.mount.push('piece2');
            }
            else if (element == 'piece4') {
              playerGreen.piece4.box = 1000;
              playerGreen.piece4.x = '';
              playerGreen.piece4.y = '';
              playerGreen.piece4.mount = [];
              playerGreen.piece3.mount.push('piece4');
            }
          });
          playerGreen.piece3.mount.push(piece);
        }
        else if (piece == 'piece2') {
          playerGreen.piece2.box = 1000;
          playerGreen.piece2.x = '';
          playerGreen.piece2.y = '';
          playerGreen.piece2.mount.forEach(element => {
            if (element == 'piece1') {
              playerGreen.piece1.box = 1000;
              playerGreen.piece1.x = '';
              playerGreen.piece1.y = '';
              playerGreen.piece1.mount = [];
              playerGreen.piece3.mount.push('piece1');
            }
            else if (element == 'piece4') {
              playerGreen.piece4.box = 1000;
              playerGreen.piece4.x = '';
              playerGreen.piece4.y = '';
              playerGreen.piece4.mount = [];
              playerGreen.piece3.mount.push('piece4');
            }
          });
          playerGreen.piece3.mount.push(piece);
        }
        else if (piece == 'piece4') {
          playerGreen.piece4.box = 1000;
          playerGreen.piece4.x = '';
          playerGreen.piece4.y = '';
          playerGreen.piece4.mount.forEach(element => {
            if (element == 'piece1') {
              playerGreen.piece1.box = 1000;
              playerGreen.piece1.x = '';
              playerGreen.piece1.y = '';
              playerGreen.piece1.mount = [];
              playerGreen.piece3.mount.push('piece1');
            }
            else if (element == 'piece2') {
              playerGreen.piece2.box = 1000;
              playerGreen.piece2.x = '';
              playerGreen.piece2.y = '';
              playerGreen.piece2.mount = [];
              playerGreen.piece3.mount.push('piece2');
            }
          });
          playerGreen.piece3.mount.push(piece);
        }

        return 0;
      }
      else if (pieceSelected == 'piece4') {
        if (piece == 'piece1') {
          playerGreen.piece1.box = 1000;
          playerGreen.piece1.x = '';
          playerGreen.piece1.y = '';
          playerGreen.piece1.mount.forEach(element => {
            if (element == 'piece3') {
              playerGreen.piece3.box = 1000;
              playerGreen.piece3.x = '';
              playerGreen.piece3.y = '';
              playerGreen.piece3.mount = [];
              playerGreen.piece4.mount.push('piece3');
            }
            else if (element == 'piece2') {
              playerGreen.piece2.box = 1000;
              playerGreen.piece2.x = '';
              playerGreen.piece2.y = '';
              playerGreen.piece2.mount = [];
              playerGreen.piece4.mount.push('piece2');
            }
          });
          playerGreen.piece4.mount.push(piece);
        }
        else if (piece == 'piece2') {
          playerGreen.piece2.box = 1000;
          playerGreen.piece2.x = '';
          playerGreen.piece2.y = '';
          playerGreen.piece2.mount.forEach(element => {
            if (element == 'piece3') {
              playerGreen.piece3.box = 1000;
              playerGreen.piece3.x = '';
              playerGreen.piece3.y = '';
              playerGreen.piece3.mount = [];
              playerGreen.piece4.mount.push('piece3');
            }
            else if (element == 'piece1') {
              playerGreen.piece1.box = 1000;
              playerGreen.piece1.x = '';
              playerGreen.piece1.y = '';
              playerGreen.piece1.mount = [];
              playerGreen.piece4.mount.push('piece1');
            }
          });
          playerGreen.piece4.mount.push(piece);
        }
        else if (piece == 'piece3') {
          playerGreen.piece3.box = 1000;
          playerGreen.piece3.x = '';
          playerGreen.piece3.y = '';
          playerGreen.piece3.mount.forEach(element => {
            if (element == 'piece2') {
              playerGreen.piece2.box = 1000;
              playerGreen.piece2.x = '';
              playerGreen.piece2.y = '';
              playerGreen.piece2.mount = [];
              playerGreen.piece4.mount.push('piece2');
            }
            else if (element == 'piece1') {
              playerGreen.piece1.box = 1000;
              playerGreen.piece1.x = '';
              playerGreen.piece1.y = '';
              playerGreen.piece1.mount = [];
              playerGreen.piece4.mount.push('piece1');
            }
          });
          playerGreen.piece4.mount.push(piece);
        }

        return 0;
      }
    }
  }
  if (playerYellow != '') {
    if (playerYellow.color == color) {
      if (pieceSelected == 'piece1') {
        if (piece == 'piece2') {
          playerYellow.piece2.box = 1000;
          playerYellow.piece2.x = '';
          playerYellow.piece2.y = '';
          playerYellow.piece2.mount.forEach(element => {
            if (element == 'piece3') {
              playerYellow.piece3.box = 1000;
              playerYellow.piece3.x = '';
              playerYellow.piece3.y = '';
              playerYellow.piece3.mount = [];
              playerYellow.piece1.mount.push('piece3');
            }
            else if (element == 'piece4') {
              playerYellow.piece4.box = 1000;
              playerYellow.piece4.x = '';
              playerYellow.piece4.y = '';
              playerYellow.piece4.mount = [];
              playerYellow.piece1.mount.push('piece4');
            }
          });
          playerYellow.piece1.mount.push(piece);
        }
        else if (piece == 'piece3') {
          playerYellow.piece3.box = 1000;
          playerYellow.piece3.x = '';
          playerYellow.piece3.y = '';
          playerYellow.piece3.mount.forEach(element => {
            if (element == 'piece2') {
              playerYellow.piece2.box = 1000;
              playerYellow.piece2.x = '';
              playerYellow.piece2.y = '';
              playerYellow.piece2.mount = [];
              playerYellow.piece1.mount.push('piece2');
            }
            else if (element == 'piece4') {
              playerYellow.piece4.box = 1000;
              playerYellow.piece4.x = '';
              playerYellow.piece4.y = '';
              playerYellow.piece4.mount = [];
              playerYellow.piece1.mount.push('piece4');
            }
          });
          playerYellow.piece1.mount.push(piece);
        }
        else if (piece == 'piece4') {
          playerYellow.piece4.box = 1000;
          playerYellow.piece4.x = '';
          playerYellow.piece4.y = '';
          playerYellow.piece4.mount.forEach(element => {
            if (element == 'piece2') {
              playerYellow.piece2.box = 1000;
              playerYellow.piece2.x = '';
              playerYellow.piece2.y = '';
              playerYellow.piece2.mount = [];
              playerYellow.piece1.mount.push('piece2');
            }
            else if (element == 'piece3') {
              playerYellow.piece3.box = 1000;
              playerYellow.piece3.x = '';
              playerYellow.piece3.y = '';
              playerYellow.piece3.mount = [];
              playerYellow.piece1.mount.push('piece3');
            }
          });
          playerYellow.piece1.mount.push(piece);
        }

        return 0;
      }
      else if (pieceSelected == 'piece2') {
        if (piece == 'piece1') {
          playerYellow.piece1.box = 1000;
          playerYellow.piece1.x = '';
          playerYellow.piece1.y = '';
          playerYellow.piece1.mount.forEach(element => {
            if (element == 'piece3') {
              playerYellow.piece3.box = 1000;
              playerYellow.piece3.x = '';
              playerYellow.piece3.y = '';
              playerYellow.piece3.mount = [];
              playerYellow.piece2.mount.push('piece3');
            }
            else if (element == 'piece4') {
              playerYellow.piece4.box = 1000;
              playerYellow.piece4.x = '';
              playerYellow.piece4.y = '';
              playerYellow.piece4.mount = [];
              playerYellow.piece2.mount.push('piece4');
            }
          });
          playerYellow.piece2.mount.push(piece);
        }
        else if (piece == 'piece3') {
          playerYellow.piece3.box = 1000;
          playerYellow.piece3.x = '';
          playerYellow.piece3.y = '';
          playerYellow.piece3.mount.forEach(element => {
            if (element == 'piece1') {
              playerYellow.piece1.box = 1000;
              playerYellow.piece1.x = '';
              playerYellow.piece1.y = '';
              playerYellow.piece1.mount = [];
              playerYellow.piece2.mount.push('piece1');
            }
            else if (element == 'piece4') {
              playerYellow.piece4.box = 1000;
              playerYellow.piece4.x = '';
              playerYellow.piece4.y = '';
              playerYellow.piece4.mount = [];
              playerYellow.piece2.mount.push('piece4');
            }
          });
          playerYellow.piece2.mount.push(piece);
        }
        else if (piece == 'piece4') {
          playerYellow.piece4.box = 1000;
          playerYellow.piece4.x = '';
          playerYellow.piece4.y = '';
          playerYellow.piece4.mount.forEach(element => {
            if (element == 'piece1') {
              playerYellow.piece1.box = 1000;
              playerYellow.piece1.x = '';
              playerYellow.piece1.y = '';
              playerYellow.piece1.mount = [];
              playerYellow.piece2.mount.push('piece1');
            }
            else if (element == 'piece3') {
              playerYellow.piece3.box = 1000;
              playerYellow.piece3.x = '';
              playerYellow.piece3.y = '';
              playerYellow.piece3.mount = [];
              playerYellow.piece2.mount.push('piece3');
            }
          });
          playerYellow.piece2.mount.push(piece);
        }

        return 0;
      }
      else if (pieceSelected == 'piece3') {
        if (piece == 'piece1') {
          playerYellow.piece1.box = 1000;
          playerYellow.piece1.x = '';
          playerYellow.piece1.y = '';
          playerYellow.piece1.mount.forEach(element => {
            if (element == 'piece2') {
              playerYellow.piece2.box = 1000;
              playerYellow.piece2.x = '';
              playerYellow.piece2.y = '';
              playerYellow.piece2.mount = [];
              playerYellow.piece3.mount.push('piece2');
            }
            else if (element == 'piece4') {
              playerYellow.piece4.box = 1000;
              playerYellow.piece4.x = '';
              playerYellow.piece4.y = '';
              playerYellow.piece4.mount = [];
              playerYellow.piece3.mount.push('piece4');
            }
          });
          playerYellow.piece3.mount.push(piece);
        }
        else if (piece == 'piece2') {
          playerYellow.piece2.box = 1000;
          playerYellow.piece2.x = '';
          playerYellow.piece2.y = '';
          playerYellow.piece2.mount.forEach(element => {
            if (element == 'piece1') {
              playerYellow.piece1.box = 1000;
              playerYellow.piece1.x = '';
              playerYellow.piece1.y = '';
              playerYellow.piece1.mount = [];
              playerYellow.piece3.mount.push('piece1');
            }
            else if (element == 'piece4') {
              playerYellow.piece4.box = 1000;
              playerYellow.piece4.x = '';
              playerYellow.piece4.y = '';
              playerYellow.piece4.mount = [];
              playerYellow.piece3.mount.push('piece4');
            }
          });
          playerYellow.piece3.mount.push(piece);
        }
        else if (piece == 'piece4') {
          playerYellow.piece4.box = 1000;
          playerYellow.piece4.x = '';
          playerYellow.piece4.y = '';
          playerYellow.piece4.mount.forEach(element => {
            if (element == 'piece1') {
              playerYellow.piece1.box = 1000;
              playerYellow.piece1.x = '';
              playerYellow.piece1.y = '';
              playerYellow.piece1.mount = [];
              playerYellow.piece3.mount.push('piece1');
            }
            else if (element == 'piece2') {
              playerYellow.piece2.box = 1000;
              playerYellow.piece2.x = '';
              playerYellow.piece2.y = '';
              playerYellow.piece2.mount = [];
              playerYellow.piece3.mount.push('piece2');
            }
          });
          playerYellow.piece3.mount.push(piece);
        }

        return 0;
      }
      else if (pieceSelected == 'piece4') {
        if (piece == 'piece1') {
          playerYellow.piece1.box = 1000;
          playerYellow.piece1.x = '';
          playerYellow.piece1.y = '';
          playerYellow.piece1.mount.forEach(element => {
            if (element == 'piece3') {
              playerYellow.piece3.box = 1000;
              playerYellow.piece3.x = '';
              playerYellow.piece3.y = '';
              playerYellow.piece3.mount = [];
              playerYellow.piece4.mount.push('piece3');
            }
            else if (element == 'piece2') {
              playerYellow.piece2.box = 1000;
              playerYellow.piece2.x = '';
              playerYellow.piece2.y = '';
              playerYellow.piece2.mount = [];
              playerYellow.piece4.mount.push('piece2');
            }
          });
          playerYellow.piece4.mount.push(piece);
        }
        else if (piece == 'piece2') {
          playerYellow.piece2.box = 1000;
          playerYellow.piece2.x = '';
          playerYellow.piece2.y = '';
          playerYellow.piece2.mount.forEach(element => {
            if (element == 'piece3') {
              playerYellow.piece3.box = 1000;
              playerYellow.piece3.x = '';
              playerYellow.piece3.y = '';
              playerYellow.piece3.mount = [];
              playerYellow.piece4.mount.push('piece3');
            }
            else if (element == 'piece1') {
              playerYellow.piece1.box = 1000;
              playerYellow.piece1.x = '';
              playerYellow.piece1.y = '';
              playerYellow.piece1.mount = [];
              playerYellow.piece4.mount.push('piece1');
            }
          });
          playerYellow.piece4.mount.push(piece);
        }
        else if (piece == 'piece3') {
          playerYellow.piece3.box = 1000;
          playerYellow.piece3.x = '';
          playerYellow.piece3.y = '';
          playerYellow.piece3.mount.forEach(element => {
            if (element == 'piece2') {
              playerYellow.piece2.box = 1000;
              playerYellow.piece2.x = '';
              playerYellow.piece2.y = '';
              playerYellow.piece2.mount = [];
              playerYellow.piece4.mount.push('piece2');
            }
            else if (element == 'piece1') {
              playerYellow.piece1.box = 1000;
              playerYellow.piece1.x = '';
              playerYellow.piece1.y = '';
              playerYellow.piece1.mount = [];
              playerYellow.piece4.mount.push('piece1');
            }
          });
          playerYellow.piece4.mount.push(piece);
        }

        return 0;
      }
    }
  }
  if (playerBlue != '') {
    if (playerBlue.color == color) {
      if (pieceSelected == 'piece1') {
        if (piece == 'piece2') {
          playerBlue.piece2.box = 1000;
          playerBlue.piece2.x = '';
          playerBlue.piece2.y = '';
          playerBlue.piece2.mount.forEach(element => {
            if (element == 'piece3') {
              playerBlue.piece3.box = 1000;
              playerBlue.piece3.x = '';
              playerBlue.piece3.y = '';
              playerBlue.piece3.mount = [];
              playerBlue.piece1.mount.push('piece3');
            }
            else if (element == 'piece4') {
              playerBlue.piece4.box = 1000;
              playerBlue.piece4.x = '';
              playerBlue.piece4.y = '';
              playerBlue.piece4.mount = [];
              playerBlue.piece1.mount.push('piece4');
            }
          });
          playerBlue.piece1.mount.push(piece);
        }
        else if (piece == 'piece3') {
          playerBlue.piece3.box = 1000;
          playerBlue.piece3.x = '';
          playerBlue.piece3.y = '';
          playerBlue.piece3.mount.forEach(element => {
            if (element == 'piece2') {
              playerBlue.piece2.box = 1000;
              playerBlue.piece2.x = '';
              playerBlue.piece2.y = '';
              playerBlue.piece2.mount = [];
              playerBlue.piece1.mount.push('piece2');
            }
            else if (element == 'piece4') {
              playerBlue.piece4.box = 1000;
              playerBlue.piece4.x = '';
              playerBlue.piece4.y = '';
              playerBlue.piece4.mount = [];
              playerBlue.piece1.mount.push('piece4');
            }
          });
          playerBlue.piece1.mount.push(piece);
        }
        else if (piece == 'piece4') {
          playerBlue.piece4.box = 1000;
          playerBlue.piece4.x = '';
          playerBlue.piece4.y = '';
          playerBlue.piece4.mount.forEach(element => {
            if (element == 'piece2') {
              playerBlue.piece2.box = 1000;
              playerBlue.piece2.x = '';
              playerBlue.piece2.y = '';
              playerBlue.piece2.mount = [];
              playerBlue.piece1.mount.push('piece2');
            }
            else if (element == 'piece3') {
              playerBlue.piece3.box = 1000;
              playerBlue.piece3.x = '';
              playerBlue.piece3.y = '';
              playerBlue.piece3.mount = [];
              playerBlue.piece1.mount.push('piece3');
            }
          });
          playerBlue.piece1.mount.push(piece);
        }

        return 0;
      }
      else if (pieceSelected == 'piece2') {
        if (piece == 'piece1') {
          playerBlue.piece1.box = 1000;
          playerBlue.piece1.x = '';
          playerBlue.piece1.y = '';
          playerBlue.piece1.mount.forEach(element => {
            if (element == 'piece3') {
              playerBlue.piece3.box = 1000;
              playerBlue.piece3.x = '';
              playerBlue.piece3.y = '';
              playerBlue.piece3.mount = [];
              playerBlue.piece2.mount.push('piece3');
            }
            else if (element == 'piece4') {
              playerBlue.piece4.box = 1000;
              playerBlue.piece4.x = '';
              playerBlue.piece4.y = '';
              playerBlue.piece4.mount = [];
              playerBlue.piece2.mount.push('piece4');
            }
          });
          playerBlue.piece2.mount.push(piece);
        }
        else if (piece == 'piece3') {
          playerBlue.piece3.box = 1000;
          playerBlue.piece3.x = '';
          playerBlue.piece3.y = '';
          playerBlue.piece3.mount.forEach(element => {
            if (element == 'piece1') {
              playerBlue.piece1.box = 1000;
              playerBlue.piece1.x = '';
              playerBlue.piece1.y = '';
              playerBlue.piece1.mount = [];
              playerBlue.piece2.mount.push('piece1');
            }
            else if (element == 'piece4') {
              playerBlue.piece4.box = 1000;
              playerBlue.piece4.x = '';
              playerBlue.piece4.y = '';
              playerBlue.piece4.mount = [];
              playerBlue.piece2.mount.push('piece4');
            }
          });
          playerBlue.piece2.mount.push(piece);
        }
        else if (piece == 'piece4') {
          playerBlue.piece4.box = 1000;
          playerBlue.piece4.x = '';
          playerBlue.piece4.y = '';
          playerBlue.piece4.mount.forEach(element => {
            if (element == 'piece1') {
              playerBlue.piece1.box = 1000;
              playerBlue.piece1.x = '';
              playerBlue.piece1.y = '';
              playerBlue.piece1.mount = [];
              playerBlue.piece2.mount.push('piece1');
            }
            else if (element == 'piece3') {
              playerBlue.piece3.box = 1000;
              playerBlue.piece3.x = '';
              playerBlue.piece3.y = '';
              playerBlue.piece3.mount = [];
              playerBlue.piece2.mount.push('piece3');
            }
          });
          playerBlue.piece2.mount.push(piece);
        }

        return 0;
      }
      else if (pieceSelected == 'piece3') {
        if (piece == 'piece1') {
          playerBlue.piece1.box = 1000;
          playerBlue.piece1.x = '';
          playerBlue.piece1.y = '';
          playerBlue.piece1.mount.forEach(element => {
            if (element == 'piece2') {
              playerBlue.piece2.box = 1000;
              playerBlue.piece2.x = '';
              playerBlue.piece2.y = '';
              playerBlue.piece2.mount = [];
              playerBlue.piece3.mount.push('piece2');
            }
            else if (element == 'piece4') {
              playerBlue.piece4.box = 1000;
              playerBlue.piece4.x = '';
              playerBlue.piece4.y = '';
              playerBlue.piece4.mount = [];
              playerBlue.piece3.mount.push('piece4');
            }
          });
          playerBlue.piece3.mount.push(piece);
        }
        else if (piece == 'piece2') {
          playerBlue.piece2.box = 1000;
          playerBlue.piece2.x = '';
          playerBlue.piece2.y = '';
          playerBlue.piece2.mount.forEach(element => {
            if (element == 'piece1') {
              playerBlue.piece1.box = 1000;
              playerBlue.piece1.x = '';
              playerBlue.piece1.y = '';
              playerBlue.piece1.mount = [];
              playerBlue.piece3.mount.push('piece1');
            }
            else if (element == 'piece4') {
              playerBlue.piece4.box = 1000;
              playerBlue.piece4.x = '';
              playerBlue.piece4.y = '';
              playerBlue.piece4.mount = [];
              playerBlue.piece3.mount.push('piece4');
            }
          });
          playerBlue.piece3.mount.push(piece);
        }
        else if (piece == 'piece4') {
          playerBlue.piece4.box = 1000;
          playerBlue.piece4.x = '';
          playerBlue.piece4.y = '';
          playerBlue.piece4.mount.forEach(element => {
            if (element == 'piece1') {
              playerBlue.piece1.box = 1000;
              playerBlue.piece1.x = '';
              playerBlue.piece1.y = '';
              playerBlue.piece1.mount = [];
              playerBlue.piece3.mount.push('piece1');
            }
            else if (element == 'piece2') {
              playerBlue.piece2.box = 1000;
              playerBlue.piece2.x = '';
              playerBlue.piece2.y = '';
              playerBlue.piece2.mount = [];
              playerBlue.piece3.mount.push('piece2');
            }
          });
          playerBlue.piece3.mount.push(piece);
        }

        return 0;
      }
      else if (pieceSelected == 'piece4') {
        if (piece == 'piece1') {
          playerBlue.piece1.box = 1000;
          playerBlue.piece1.x = '';
          playerBlue.piece1.y = '';
          playerBlue.piece1.mount.forEach(element => {
            if (element == 'piece3') {
              playerBlue.piece3.box = 1000;
              playerBlue.piece3.x = '';
              playerBlue.piece3.y = '';
              playerBlue.piece3.mount = [];
              playerBlue.piece4.mount.push('piece3');
            }
            else if (element == 'piece2') {
              playerBlue.piece2.box = 1000;
              playerBlue.piece2.x = '';
              playerBlue.piece2.y = '';
              playerBlue.piece2.mount = [];
              playerBlue.piece4.mount.push('piece2');
            }
          });
          playerBlue.piece4.mount.push(piece);
        }
        else if (piece == 'piece2') {
          playerBlue.piece2.box = 1000;
          playerBlue.piece2.x = '';
          playerBlue.piece2.y = '';
          playerBlue.piece2.mount.forEach(element => {
            if (element == 'piece3') {
              playerBlue.piece3.box = 1000;
              playerBlue.piece3.x = '';
              playerBlue.piece3.y = '';
              playerBlue.piece3.mount = [];
              playerBlue.piece4.mount.push('piece3');
            }
            else if (element == 'piece1') {
              playerBlue.piece1.box = 1000;
              playerBlue.piece1.x = '';
              playerBlue.piece1.y = '';
              playerBlue.piece1.mount = [];
              playerBlue.piece4.mount.push('piece1');
            }
          });
          playerBlue.piece4.mount.push(piece);
        }
        else if (piece == 'piece3') {
          playerBlue.piece3.box = 1000;
          playerBlue.piece3.x = '';
          playerBlue.piece3.y = '';
          playerBlue.piece3.mount.forEach(element => {
            if (element == 'piece2') {
              playerBlue.piece2.box = 1000;
              playerBlue.piece2.x = '';
              playerBlue.piece2.y = '';
              playerBlue.piece2.mount = [];
              playerBlue.piece4.mount.push('piece2');
            }
            else if (element == 'piece1') {
              playerBlue.piece1.box = 1000;
              playerBlue.piece1.x = '';
              playerBlue.piece1.y = '';
              playerBlue.piece1.mount = [];
              playerBlue.piece4.mount.push('piece1');
            }
          });
          playerBlue.piece4.mount.push(piece);
        }

        return 0;
      }
    }
  }
  if (playerRed != '') {
    if (playerRed.color == color) {
      if (pieceSelected == 'piece1') {
        if (piece == 'piece2') {
          playerRed.piece2.box = 1000;
          playerRed.piece2.x = '';
          playerRed.piece2.y = '';
          playerRed.piece2.mount.forEach(element => {
            if (element == 'piece3') {
              playerRed.piece3.box = 1000;
              playerRed.piece3.x = '';
              playerRed.piece3.y = '';
              playerRed.piece3.mount = [];
              playerRed.piece1.mount.push('piece3');
            }
            else if (element == 'piece4') {
              playerRed.piece4.box = 1000;
              playerRed.piece4.x = '';
              playerRed.piece4.y = '';
              playerRed.piece4.mount = [];
              playerRed.piece1.mount.push('piece4');
            }
          });
          playerRed.piece1.mount.push(piece);
        }
        else if (piece == 'piece3') {
          playerRed.piece3.box = 1000;
          playerRed.piece3.x = '';
          playerRed.piece3.y = '';
          playerRed.piece3.mount.forEach(element => {
            if (element == 'piece2') {
              playerRed.piece2.box = 1000;
              playerRed.piece2.x = '';
              playerRed.piece2.y = '';
              playerRed.piece2.mount = [];
              playerRed.piece1.mount.push('piece2');
            }
            else if (element == 'piece4') {
              playerRed.piece4.box = 1000;
              playerRed.piece4.x = '';
              playerRed.piece4.y = '';
              playerRed.piece4.mount = [];
              playerRed.piece1.mount.push('piece4');
            }
          });
          playerRed.piece1.mount.push(piece);
        }
        else if (piece == 'piece4') {
          playerRed.piece4.box = 1000;
          playerRed.piece4.x = '';
          playerRed.piece4.y = '';
          playerRed.piece4.mount.forEach(element => {
            if (element == 'piece2') {
              playerRed.piece2.box = 1000;
              playerRed.piece2.x = '';
              playerRed.piece2.y = '';
              playerRed.piece2.mount = [];
              playerRed.piece1.mount.push('piece2');
            }
            else if (element == 'piece3') {
              playerRed.piece3.box = 1000;
              playerRed.piece3.x = '';
              playerRed.piece3.y = '';
              playerRed.piece3.mount = [];
              playerRed.piece1.mount.push('piece3');
            }
          });
          playerRed.piece1.mount.push(piece);
        }

        return 0;
      }
      else if (pieceSelected == 'piece2') {
        if (piece == 'piece1') {
          playerRed.piece1.box = 1000;
          playerRed.piece1.x = '';
          playerRed.piece1.y = '';
          playerRed.piece1.mount.forEach(element => {
            if (element == 'piece3') {
              playerRed.piece3.box = 1000;
              playerRed.piece3.x = '';
              playerRed.piece3.y = '';
              playerRed.piece3.mount = [];
              playerRed.piece2.mount.push('piece3');
            }
            else if (element == 'piece4') {
              playerRed.piece4.box = 1000;
              playerRed.piece4.x = '';
              playerRed.piece4.y = '';
              playerRed.piece4.mount = [];
              playerRed.piece2.mount.push('piece4');
            }
          });
          playerRed.piece2.mount.push(piece);
        }
        else if (piece == 'piece3') {
          playerRed.piece3.box = 1000;
          playerRed.piece3.x = '';
          playerRed.piece3.y = '';
          playerRed.piece3.mount.forEach(element => {
            if (element == 'piece1') {
              playerRed.piece1.box = 1000;
              playerRed.piece1.x = '';
              playerRed.piece1.y = '';
              playerRed.piece1.mount = [];
              playerRed.piece2.mount.push('piece1');
            }
            else if (element == 'piece4') {
              playerRed.piece4.box = 1000;
              playerRed.piece4.x = '';
              playerRed.piece4.y = '';
              playerRed.piece4.mount = [];
              playerRed.piece2.mount.push('piece4');
            }
          });
          playerRed.piece2.mount.push(piece);
        }
        else if (piece == 'piece4') {
          playerRed.piece4.box = 1000;
          playerRed.piece4.x = '';
          playerRed.piece4.y = '';
          playerRed.piece4.mount.forEach(element => {
            if (element == 'piece1') {
              playerRed.piece1.box = 1000;
              playerRed.piece1.x = '';
              playerRed.piece1.y = '';
              playerRed.piece1.mount = [];
              playerRed.piece2.mount.push('piece1');
            }
            else if (element == 'piece3') {
              playerRed.piece3.box = 1000;
              playerRed.piece3.x = '';
              playerRed.piece3.y = '';
              playerRed.piece3.mount = [];
              playerRed.piece2.mount.push('piece3');
            }
          });
          playerRed.piece2.mount.push(piece);
        }

        return 0;
      }
      else if (pieceSelected == 'piece3') {
        if (piece == 'piece1') {
          playerRed.piece1.box = 1000;
          playerRed.piece1.x = '';
          playerRed.piece1.y = '';
          playerRed.piece1.mount.forEach(element => {
            if (element == 'piece2') {
              playerRed.piece2.box = 1000;
              playerRed.piece2.x = '';
              playerRed.piece2.y = '';
              playerRed.piece2.mount = [];
              playerRed.piece3.mount.push('piece2');
            }
            else if (element == 'piece4') {
              playerRed.piece4.box = 1000;
              playerRed.piece4.x = '';
              playerRed.piece4.y = '';
              playerRed.piece4.mount = [];
              playerRed.piece3.mount.push('piece4');
            }
          });
          playerRed.piece3.mount.push(piece);
        }
        else if (piece == 'piece2') {
          playerRed.piece2.box = 1000;
          playerRed.piece2.x = '';
          playerRed.piece2.y = '';
          playerRed.piece2.mount.forEach(element => {
            if (element == 'piece1') {
              playerRed.piece1.box = 1000;
              playerRed.piece1.x = '';
              playerRed.piece1.y = '';
              playerRed.piece1.mount = [];
              playerRed.piece3.mount.push('piece1');
            }
            else if (element == 'piece4') {
              playerRed.piece4.box = 1000;
              playerRed.piece4.x = '';
              playerRed.piece4.y = '';
              playerRed.piece4.mount = [];
              playerRed.piece3.mount.push('piece4');
            }
          });
          playerRed.piece3.mount.push(piece);
        }
        else if (piece == 'piece4') {
          playerRed.piece4.box = 1000;
          playerRed.piece4.x = '';
          playerRed.piece4.y = '';
          playerRed.piece4.mount.forEach(element => {
            if (element == 'piece1') {
              playerRed.piece1.box = 1000;
              playerRed.piece1.x = '';
              playerRed.piece1.y = '';
              playerRed.piece1.mount = [];
              playerRed.piece3.mount.push('piece1');
            }
            else if (element == 'piece2') {
              playerRed.piece2.box = 1000;
              playerRed.piece2.x = '';
              playerRed.piece2.y = '';
              playerRed.piece2.mount = [];
              playerRed.piece3.mount.push('piece2');
            }
          });
          playerRed.piece3.mount.push(piece);
        }

        return 0;
      }
      else if (pieceSelected == 'piece4') {
        if (piece == 'piece1') {
          playerRed.piece1.box = 1000;
          playerRed.piece1.x = '';
          playerRed.piece1.y = '';
          playerRed.piece1.mount.forEach(element => {
            if (element == 'piece3') {
              playerRed.piece3.box = 1000;
              playerRed.piece3.x = '';
              playerRed.piece3.y = '';
              playerRed.piece3.mount = [];
              playerRed.piece4.mount.push('piece3');
            }
            else if (element == 'piece2') {
              playerRed.piece2.box = 1000;
              playerRed.piece2.x = '';
              playerRed.piece2.y = '';
              playerRed.piece2.mount = [];
              playerRed.piece4.mount.push('piece2');
            }
          });
          playerRed.piece4.mount.push(piece);
        }
        else if (piece == 'piece2') {
          playerRed.piece2.box = 1000;
          playerRed.piece2.x = '';
          playerRed.piece2.y = '';
          playerRed.piece2.mount.forEach(element => {
            if (element == 'piece3') {
              playerRed.piece3.box = 1000;
              playerRed.piece3.x = '';
              playerRed.piece3.y = '';
              playerRed.piece3.mount = [];
              playerRed.piece4.mount.push('piece3');
            }
            else if (element == 'piece1') {
              playerRed.piece1.box = 1000;
              playerRed.piece1.x = '';
              playerRed.piece1.y = '';
              playerRed.piece1.mount = [];
              playerRed.piece4.mount.push('piece1');
            }
          });
          playerRed.piece4.mount.push(piece);
        }
        else if (piece == 'piece3') {
          playerRed.piece3.box = 1000;
          playerRed.piece3.x = '';
          playerRed.piece3.y = '';
          playerRed.piece3.mount.forEach(element => {
            if (element == 'piece2') {
              playerRed.piece2.box = 1000;
              playerRed.piece2.x = '';
              playerRed.piece2.y = '';
              playerRed.piece2.mount = [];
              playerRed.piece4.mount.push('piece2');
            }
            else if (element == 'piece1') {
              playerRed.piece1.box = 1000;
              playerRed.piece1.x = '';
              playerRed.piece1.y = '';
              playerRed.piece1.mount = [];
              playerRed.piece4.mount.push('piece1');
            }
          });
          playerRed.piece4.mount.push(piece);
        }

        return 0;
      }
    }
  }
}

function movePiece (turn, piece, box, pos) {
  let players = [];
  if (playerGreen != '') {
    if (playerGreen.turn == turn) {
      if (piece == 'piece1') {
        if (!playerGreen.piece1.win) {
          playerGreen.piece1.box = pos;
          playerGreen.piece1.x = box.x;
          playerGreen.piece1.y = box.y;
        }
        else {
          playerGreen.piece1.box = 1000;
          playerGreen.piece1.x = '';
          playerGreen.piece1.y = '';
        }
      }
      else if (piece == 'piece2') {
        if (!playerGreen.piece2.win) {
          playerGreen.piece2.box = pos;
          playerGreen.piece2.x = box.x;
          playerGreen.piece2.y = box.y;
        } 
        else {
          playerGreen.piece2.box = 1000;
          playerGreen.piece2.x = '';
          playerGreen.piece2.y = '';
        }
      }
      else if (piece == 'piece3') {
        if (!playerGreen.piece3.win) {
          playerGreen.piece3.box = pos;
          playerGreen.piece3.x = box.x;
          playerGreen.piece3.y = box.y;
        }
        else {
          playerGreen.piece3.box = 1000;
          playerGreen.piece3.x = '';
          playerGreen.piece3.y = '';
        }
      }
      else if (piece == 'piece4') {
        if (!playerGreen.piece4.win) {
          playerGreen.piece4.box = pos;
          playerGreen.piece4.x = box.x;
          playerGreen.piece4.y = box.y;
        }
        else {
          playerGreen.piece4.box = 1000;
          playerGreen.piece4.x = '';
          playerGreen.piece4.y = '';
        }
      }
    }
    players.push(playerGreen);
  }
  if (playerYellow != '') {
    if (playerYellow.turn == turn) {
      if (piece == 'piece1') {
        if (!playerYellow.piece1.win) {
          playerYellow.piece1.box = pos;
          playerYellow.piece1.x = box.x;
          playerYellow.piece1.y = box.y;
        }
        else {
          playerYellow.piece1.box = 1000;
          playerYellow.piece1.x = '';
          playerYellow.piece1.y = '';
        }
      }
      else if (piece == 'piece2') {
        if (!playerYellow.piece2.win) {
          playerYellow.piece2.box = pos;
          playerYellow.piece2.x = box.x;
          playerYellow.piece2.y = box.y;
        }
        else {
          playerYellow.piece2.box = 1000;
          playerYellow.piece2.x = '';
          playerYellow.piece2.y = '';
        }
      }
      else if (piece == 'piece3') {
        if (!playerYellow.piece3.win) {
          playerYellow.piece3.box = pos;
          playerYellow.piece3.x = box.x;
          playerYellow.piece3.y = box.y;
        }
        else {
          playerYellow.piece3.box = 1000;
          playerYellow.piece3.x = '';
          playerYellow.piece3.y = '';
        }
      }
      else if (piece == 'piece4') {
        if (!playerYellow.piece4.win) {
          playerYellow.piece4.box = pos;
          playerYellow.piece4.x = box.x;
          playerYellow.piece4.y = box.y;
        }
        else {
          playerYellow.piece4.box = 1000;
          playerYellow.piece4.x = '';
          playerYellow.piece4.y = '';
        }
      }
    }
    players.push(playerYellow);
  }
  if (playerBlue != '') {
    if (playerBlue.turn == turn) {
      if (piece == 'piece1') {
        if (!playerBlue.piece1.win) {
          playerBlue.piece1.box = pos;
          playerBlue.piece1.x = box.x;
          playerBlue.piece1.y = box.y;
        }
        else {
          playerBlue.piece1.box = 1000;
          playerBlue.piece1.x = '';
          playerBlue.piece1.y = '';
        }
      }
      else if (piece == 'piece2') {
        if (!playerBlue.piece2.win) {
          playerBlue.piece2.box = pos;
          playerBlue.piece2.x = box.x;
          playerBlue.piece2.y = box.y;
        }
        else {
          playerBlue.piece2.box = 1000;
          playerBlue.piece2.x = '';
          playerBlue.piece2.y = '';
        }
      }
      else if (piece == 'piece3') {
        if (!playerBlue.piece3.win) {
          playerBlue.piece3.box = pos;
          playerBlue.piece3.x = box.x;
          playerBlue.piece3.y = box.y;
        }
        else {
          playerBlue.piece3.box = 1000;
          playerBlue.piece3.x = '';
          playerBlue.piece3.y = '';
        }
      }
      else if (piece == 'piece4') {
        if (!playerBlue.piece4.win) {
          playerBlue.piece4.box = pos;
          playerBlue.piece4.x = box.x;
          playerBlue.piece4.y = box.y;
        }
        else {
          playerBlue.piece4.box = 1000;
          playerBlue.piece4.x = '';
          playerBlue.piece4.y = '';
        }
      }
    }
    players.push(playerBlue);
  }
  if (playerRed != '') {
    if (playerRed.turn == turn) {
      if (piece == 'piece1') {
        if (!playerRed.piece1.win) {
          playerRed.piece1.box = pos;
          playerRed.piece1.x = box.x;
          playerRed.piece1.y = box.y;
        }
        else {
          playerRed.piece1.box = 1000;
          playerRed.piece1.x = '';
          playerRed.piece1.y = '';
        }
      }
      else if (piece == 'piece2') {
        if (!playerRed.piece2.win) {
          playerRed.piece2.box = pos;
          playerRed.piece2.x = box.x;
          playerRed.piece2.y = box.y;
        }
        else {
          playerRed.piece2.box = 1000;
          playerRed.piece2.x = '';
          playerRed.piece2.y = '';
        }
      }
      else if (piece == 'piece3') {
        if (!playerRed.piece3.win) {
          playerRed.piece3.box = pos;
          playerRed.piece3.x = box.x;
          playerRed.piece3.y = box.y;
        }
        else {
          playerRed.piece3.box = 1000;
          playerRed.piece3.x = '';
          playerRed.piece3.y = '';
        }
      }
      else if (piece == 'piece4') {
        if (!playerRed.piece4.win) {
          playerRed.piece4.box = pos;
          playerRed.piece4.x = box.x;
          playerRed.piece4.y = box.y;
        }
        else {
          playerRed.piece4.box = 1000;
          playerRed.piece4.x = '';
          playerRed.piece4.y = '';
        }
      }
    }
    players.push(playerRed);
  }
  return players;
}

module.exports = {
  createPlayer,
  resetGame,
  allPlayers,
  sameTurn,
  currentTurn,
  passTurn,
	setSpawnPlayers,
	pieceOutSpawn,
  searchBox,
  verifyMove,
  mountPiece,
  killToEnemy,
  verifyBox,
  movePiece,
  newPos,
  verifyWinner,
  searchPlayer
}