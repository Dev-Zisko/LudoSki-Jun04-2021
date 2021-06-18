'use strict';
try{

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const ChatController = require('./controller/ChatController');
const GameController = require('./controller/GameController');

var isPlaying = false;

io.on('connection', (socket) => {

  socket.emit('Bienvenida');

  socket.on('nuevo_mensaje', (message) => {
    // Validamos si la persona quiere entrar y no hablar
    if (message.content == '/enter') {
      let [playerGreen, playerYellow, playerBlue, playerRed] = GameController.allPlayers();
      // Validamos si la persona ya tiene un color en la partida
      if (message.name != playerGreen.name && message.name != playerYellow.name &&
          message.name != playerBlue.name && message.name != playerRed.name) {
        // Validamos que color queda disponible para agregarlo a la persona
        message.content = GameController.createPlayer(message.name);
      } 
      else {
        message.content = message.name + ' ya tienes un color elegido.';
        let players = [ playerGreen, playerYellow, playerBlue, playerRed ];
        let turnNow = GameController.currentTurn();
        let status = {
          players,
          turnNow
        }
        if (isPlaying) {
          io.sockets.emit('start_game', status);
          io.sockets.emit('refresh_turn', turnNow);
        }
      }
      message.name = 'SERVIDOR';
    }
    else if (message.content == '/reset') {
      isPlaying = false;
      GameController.resetGame();
      message.content = message.name + ' ha reiniciado la partida, todos los jugadores están en blanco.';
      message.name = 'SERVIDOR';
      io.sockets.emit('reset_game', 'Reset');
    }
    else if (message.content == '/start') {
      isPlaying = true;
      let players = GameController.setSpawnPlayers();
      let turnNow = GameController.currentTurn();
      message.content = message.name + ' ha empezado el juego, las fichas han aparecido.';
      message.name = 'SERVIDOR';
      let status = {
          players,
          turnNow
        }
      // Difundimos los objetos de los jugadores
      io.sockets.emit('start_game', status);
      io.sockets.emit('refresh_turn', turnNow);
    }

    message.content = ChatController.firstLetterCap(message.content);
    // Difundimos el mensaje a todos los conectados
    io.sockets.emit('difundir_mensaje', message);
  });

  socket.on('roll_dice', (message) => {
    let [validate, nickname] = GameController.verifyMove(message.turn, message.content, '');
    message.content = message.name + ' ha sacado un ' + message.content + ' en el dado.'; 
    message.name = 'SERVIDOR';
    io.sockets.emit('difundir_mensaje', message);
    if (validate == 0) { // Si no puede mover ninguna pieza
      message.content = nickname + ' no puedes mover ninguna pieza.';
      io.sockets.emit('difundir_mensaje', message);
      let [turnNow, newName] = GameController.passTurn(message.turn);
      io.sockets.emit('refresh_turn', turnNow);
      message.content = 'Es el turno de ' + newName + '.';
      io.sockets.emit('difundir_mensaje', message);
    }
  });

  socket.on('move_piece', (message) => {
    let pieceSelected = message.content;
    let [validate, nickname] = GameController.verifyMove(message.turn, '', pieceSelected);
    if (validate == 0) { // Pieza en el spawn y el dado no es ni 1 ni 6 (No puede moverla)
      message.content = message.name + ' selecciona otra pieza, esa no puede moverse.'; 
      message.name = 'SERVIDOR';
      io.sockets.emit('on_pieces_action', 'Acciones de las piezas habilitadas.')
      io.sockets.emit('difundir_mensaje', message);
    }
    else {
      let nextPos = GameController.newPos(message.turn, message.content);
      let box = GameController.searchBox(nextPos);
      let [status, color, piece] = GameController.verifyBox(nextPos, message.turn);

      if (status == 'enemy') {
        GameController.killToEnemy(color, piece);
        message.content = nickname + ' ha comido la pieza del jugador de color ' + color + '.'; 
        message.name = 'SERVIDOR';
        io.sockets.emit('difundir_mensaje', message);
      }
      else if (status == 'friendly') {
        GameController.mountPiece(color, piece, message.content);
        message.content = nickname + ' ha montado sus fichas.'; 
        message.name = 'SERVIDOR';
        io.sockets.emit('difundir_mensaje', message);
      }
      let players = GameController.movePiece(message.turn, pieceSelected, box, nextPos);
      io.sockets.emit('refresh_game', players);
      message.content = nickname + ' ha movido su pieza.'; 
      message.name = 'SERVIDOR';
      io.sockets.emit('difundir_mensaje', message);
      let validateSameTurn = GameController.sameTurn(message.turn);
      if (validateSameTurn) {
        message.content = 'Sigue siendo el turno de ' + nickname + '.';
        io.sockets.emit('difundir_mensaje', message);
        let turnNow = GameController.currentTurn();
        io.sockets.emit('refresh_turn', turnNow);
      }
      else {
        GameController.verifyWinner();
        let [turnNow, newName] = GameController.passTurn(message.turn); 
        message.content = 'Es el turno de ' + newName + '.';
        io.sockets.emit('difundir_mensaje', message);
        io.sockets.emit('refresh_turn', turnNow);
      }

      let playersWinner = GameController.verifyWinner();
      playersWinner.forEach(element => { 
        message.name = 'SERVIDOR';
        message.content = 'Felicidades ' + element.name + ' has ganado la partida.';
        io.sockets.emit('difundir_mensaje', message);
      });
      
    }
  });

});

app.use(express.static(__dirname + '/public'));

var server = http.listen(process.env.PORT || 8000, () => {
  console.log("Servidor listo en http://127.0.0.1:" + server.address().port);
});

} catch (error) {
  console.log(error);
}
