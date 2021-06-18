'use strict'; // Para programar cumpliendo las normas

var socket = io(); // Abrimos el socket
var nickname = ''; // Guardamos el nombre de usuario
var turnNow = 0; // Turno actual de la partida. Igual a 0 = no hay partida
var myTurn = 0; // Turno del usuario. Igual a 0 = no hay partida
var diceValidate = 0; // Validar si se tiro el dado o no. Igual a 0 = no se ha tirado
var piece1 = "piece1"; // Pieza 1 del usuario
var piece2 = "piece2"; // Pieza 2 del usuario
var piece3 = "piece3"; // Pieza 3 del usuario
var piece4 = "piece4"; // Pieza 4 del usuario
var validateSeconds = false;

// FUNCIONALIDAD DEL JUEGO

function hideElements (state) { // Oculta o muestra los elementos dependiendo del estado
	const turnNowHTML = document.getElementById('turn-now'); // Titulo del turno actual HTML
	const myTurnHTML = document.getElementById('my-turn'); // Titulo del turno del usuario HTML
	const diceHTML = document.getElementById('dice'); // Imagen del dado HTML

	turnNowHTML.hidden = state;
	myTurnHTML.hidden = state;
	
	if (turnNow == myTurn) { // Cuando no ha empezado la partida se ocultan, si ya empezo se muestran
		diceHTML.hidden = state;
	}
}

socket.on('reset_game', function (message) { // Recibimos la señal de resetear la partida
	$('#pieces-zone').empty(); // Borramos las fichas del tablero

	const turnNow = document.getElementById('turn-now'); // Titulo del turno actual HTML
	turnNow.innerHTML = "";
    turnNow.innerHTML = "Turno actual: ?";

	const myTurn = document.getElementById('my-turn'); // Titulo del turno del usuario HTML
	myTurn.innerHTML = "";
	myTurn.innerHTML = "Tu turno es: ?";

	turnNow = 0; // Reseteamos el turno actual
	myTurn = 0; // Reseteamos el turno del usuario
});

socket.on('refresh_turn', function (newTurn) { // Recibimos la señal de que el turno ha cambiado
	const turnNowHTML = document.getElementById('turn-now');
    turnNowHTML.innerHTML = "";
    turnNowHTML.innerHTML = "Turno actual: " + newTurn;
    turnNow = newTurn;
    if (turnNow == myTurn) {
    	const diceHTML = document.getElementById('dice'); // Imagen del dado HTML
    	const pieces = document.getElementById('pieces-zone'); // Zona de fichas HTML
		pieces.style.pointerEvents = "auto"; // Colocamos los eventos de click a las fichas
		diceHTML.style.pointerEvents = "auto"; // Colocamos los eventos de click al dado
    	diceHTML.hidden = false;
    } else {
    	const diceHTML = document.getElementById('dice'); // Imagen del dado HTML
    	const pieces = document.getElementById('pieces-zone'); // Zona de fichas HTML
		pieces.style.pointerEvents = "none"; // Quitamos los eventos de click a las fichas
    	diceHTML.hidden = true;
    }
});

socket.on('start_game', function (status) { // Recibimos la señal de empezar partida y añadimos las piezas
	$('#pieces-zone').empty(); // Borramos el tablero actual, para actualizarlo
	let players = status.players;
	let mount = 0;
	players.forEach(player => { // Por cada usuario en la partida colocamos sus fichas
		if (player['name'] == nickname) { // Si el usuario es el usuario
			const myTurnHTML = document.getElementById('my-turn'); // Titulo del turno del usuario HTML
	    	myTurnHTML.innerHTML = "";
	    	myTurnHTML.innerHTML = "Tu turno es: " + player['turn']; // Actualizamos en la vista el turno del usuario
	    	myTurn = player['turn']; // Asignamos el turno asignado al usuario
	    	turnNow = status.turnNow; // Como esta empezando la partida el turno actual es 1
	    	hideElements(false); // Ocultamos los elementos a los usuarios correspondientes

	    	// Colocamos en el tablero las piezas del usuario con los eventos de click correspondientes
	    	if (player['piece1'].x != '') {
	    		mount = player['piece1'].mount.length;
	    		$('#pieces-zone').append('<div id="'+player['color']+'-piece1" class="pawns" onclick="movePiece('+player['turn']+','+piece1+')" style="background-color: '+player['color']+'; top: '+player['piece1']['x']+'px; left: '+player['piece1']['y']+'px; border: 2px solid #282828;">'+mount+'</div>');
	    	}
	    	if (player['piece2'].x != '') {
	    		mount = player['piece2'].mount.length;
	    		$('#pieces-zone').append('<div id="'+player['color']+'-piece2" class="pawns" onclick="movePiece('+player['turn']+','+piece2+')" style="background-color: '+player['color']+'; top: '+player['piece2']['x']+'px; left: '+player['piece2']['y']+'px; border: 2px solid #282828;">'+mount+'</div>');
	    	}
	    	if (player['piece3'].x != '') {
	    		mount = player['piece3'].mount.length;
	    		$('#pieces-zone').append('<div id="'+player['color']+'-piece3" class="pawns" onclick="movePiece('+player['turn']+','+piece3+')" style="background-color: '+player['color']+'; top: '+player['piece3']['x']+'px; left: '+player['piece3']['y']+'px; border: 2px solid #282828;">'+mount+'</div>');
	    	}
	    	if (player['piece4'].x != '') {
	    		mount = player['piece4'].mount.length;
	    		$('#pieces-zone').append('<div id="'+player['color']+'-piece4" class="pawns" onclick="movePiece('+player['turn']+','+piece4+')" style="background-color: '+player['color']+'; top: '+player['piece4']['x']+'px; left: '+player['piece4']['y']+'px; border: 2px solid #282828;">'+mount+'</div>');
	    	}	
		} else { // Los demás usuarios
			// Colocamos en el tablero las piezas de los demás usuarios sin evento de click
			if (player['piece1'].x != '') {
				mount = player['piece1'].mount.length;
				$('#pieces-zone').append('<div id="'+player['color']+'-piece1" class="pawns" style="background-color: '+player['color']+'; top: '+player['piece1']['x']+'px; left: '+player['piece1']['y']+'px; border: 2px solid #282828;">'+mount+'</div>');
			}
			if (player['piece2'].x != '') {
				mount = player['piece2'].mount.length;
				$('#pieces-zone').append('<div id="'+player['color']+'-piece2" class="pawns" style="background-color: '+player['color']+'; top: '+player['piece2']['x']+'px; left: '+player['piece2']['y']+'px; border: 2px solid #282828;">'+mount+'</div>');
			}
			if (player['piece3'].x != '') {
				mount = player['piece3'].mount.length;
				$('#pieces-zone').append('<div id="'+player['color']+'-piece3" class="pawns" style="background-color: '+player['color']+'; top: '+player['piece3']['x']+'px; left: '+player['piece3']['y']+'px; border: 2px solid #282828;">'+mount+'</div>');
			}
			if (player['piece4'].x != '') {
				mount = player['piece4'].mount.length;
				$('#pieces-zone').append('<div id="'+player['color']+'-piece4" class="pawns" style="background-color: '+player['color']+'; top: '+player['piece4']['x']+'px; left: '+player['piece4']['y']+'px; border: 2px solid #282828;">'+mount+'</div>');
			}
		}

	    if (myTurn != turnNow) { // Si el turno del usuario no es el actual de la partida
			const pieces = document.getElementById('pieces-zone'); // Zona de fichas HTML
			pieces.style.pointerEvents = "none"; // Quitamos los eventos de click a las fichas
	    }
	});
});

socket.on('refresh_game', function (players) { // Recibimos la señal de empezar partida y añadimos las piezas
	$('#pieces-zone').empty(); // Borramos el tablero actual, para actualizarlo

	let mount = 0;
	players.forEach(player => { // Por cada usuario en la partida colocamos sus fichas
		if (player['name'] == nickname) { // Si el usuario es el usuario
	    	// Colocamos en el tablero las piezas del usuario con los eventos de click correspondientes
	    	if (player['piece1'].x != '') {
	    		mount = player['piece1'].mount.length;
	    		$('#pieces-zone').append('<div id="'+player['color']+'-piece1" class="pawns" onclick="movePiece('+player['turn']+','+piece1+')" style="background-color: '+player['color']+'; top: '+player['piece1']['x']+'px; left: '+player['piece1']['y']+'px; border: 2px solid #282828;">'+mount+'</div>');
	    	}
	    	if (player['piece2'].x != '') {
	    		mount = player['piece2'].mount.length;
	    		$('#pieces-zone').append('<div id="'+player['color']+'-piece2" class="pawns" onclick="movePiece('+player['turn']+','+piece2+')" style="background-color: '+player['color']+'; top: '+player['piece2']['x']+'px; left: '+player['piece2']['y']+'px; border: 2px solid #282828;">'+mount+'</div>');
	    	}
	    	if (player['piece3'].x != '') {
	    		mount = player['piece3'].mount.length;
	    		$('#pieces-zone').append('<div id="'+player['color']+'-piece3" class="pawns" onclick="movePiece('+player['turn']+','+piece3+')" style="background-color: '+player['color']+'; top: '+player['piece3']['x']+'px; left: '+player['piece3']['y']+'px; border: 2px solid #282828;">'+mount+'</div>');
	    	}
	    	if (player['piece4'].x != '') {
	    		mount = player['piece4'].mount.length;
	    		$('#pieces-zone').append('<div id="'+player['color']+'-piece4" class="pawns" onclick="movePiece('+player['turn']+','+piece4+')" style="background-color: '+player['color']+'; top: '+player['piece4']['x']+'px; left: '+player['piece4']['y']+'px; border: 2px solid #282828;">'+mount+'</div>');
	    	}	
		} else { // Los demás usuarios
			// Colocamos en el tablero las piezas de los demás usuarios sin evento de click
			if (player['piece1'].x != '') {
				mount = player['piece1'].mount.length;
				$('#pieces-zone').append('<div id="'+player['color']+'-piece1" class="pawns" style="background-color: '+player['color']+'; top: '+player['piece1']['x']+'px; left: '+player['piece1']['y']+'px; border: 2px solid #282828;">'+mount+'</div>');
			}
			if (player['piece2'].x != '') {
				mount = player['piece2'].mount.length;
				$('#pieces-zone').append('<div id="'+player['color']+'-piece2" class="pawns" style="background-color: '+player['color']+'; top: '+player['piece2']['x']+'px; left: '+player['piece2']['y']+'px; border: 2px solid #282828;">'+mount+'</div>');
			}
			if (player['piece3'].x != '') {
				mount = player['piece3'].mount.length;
				$('#pieces-zone').append('<div id="'+player['color']+'-piece3" class="pawns" style="background-color: '+player['color']+'; top: '+player['piece3']['x']+'px; left: '+player['piece3']['y']+'px; border: 2px solid #282828;">'+mount+'</div>');
			}
			if (player['piece4'].x != '') {
				mount = player['piece4'].mount.length;
				$('#pieces-zone').append('<div id="'+player['color']+'-piece4" class="pawns" style="background-color: '+player['color']+'; top: '+player['piece4']['x']+'px; left: '+player['piece4']['y']+'px; border: 2px solid #282828;">'+mount+'</div>');
			}	
		}
	});
});

function rollDice () {
    const diceHTML = document.getElementById('dice');
    diceHTML.style.pointerEvents = "none"; // Quitamos los eventos de click del dado
    let numberDice = Math.floor(Math.random() * 6) + 1;
    diceHTML.style.backgroundImage = "url(assets/images/" + numberDice + ".jpg)";
    setTimeout('changeDice()', 1000);
	diceValidate = numberDice;
}

function changeDice () {
    const diceHTML = document.getElementById('dice');
    diceHTML.style.backgroundImage = "url(assets/images/dado.gif)";
    diceHTML.hidden = true;
    let message = {
    	name: nickname,
	  	turn: myTurn,
	  	content: diceValidate
	}
	socket.emit("roll_dice", message);  // Lo emitimos
	validateSeconds = true;
}

socket.on('on_pieces_action', function(message) { // Recibimos la señal de habilitar boton de pasar turno
	const pieces = document.getElementById('pieces-zone'); // Zona de fichas HTML
	pieces.style.pointerEvents = "auto"; // Quitamos las acciones de click en las fichas
	diceValidate = 1;
});

function movePiece (playerTurn, piece) {
	if (validateSeconds) {
		if (myTurn == turnNow) {
			if (myTurn == playerTurn) {
				if (diceValidate != 0) {
					const pieces = document.getElementById('pieces-zone'); // Zona de fichas HTML
					pieces.style.pointerEvents = "none"; // Quitamos los eventos de click a las fichas
					diceValidate = 0;
					let message = {
						name: nickname,
					  	turn: playerTurn,
					  	content: piece
					}
					socket.emit("move_piece", message);  // Lo emitimos
					validateSeconds = false;
				} else {
					alert('Tira el dado antes de mover la ficha.');
				}
				
			} else {
				alert('Esa pieza no es tuya, no puedes moverla.');
			}
		} else {
			alert('No es tu turno, no puedes moverte aún.');
		}	
	} else {
		alert('Espera que aparezca tu número del dado en el chat, para moverte.');
	}
}

// FUNCIONALIDAD DEL CHAT

$(function () { // Cuando jQuery ya cargo
	socket.on("Bienvenida", function () { // Recibimos la señal de bienvenida y saludamos al usuario
	  $("#chat")
	    .empty()
	    .append("<h3>Bienvenido a Ludoski. Diviertete!</h3>")
	    .append(`<b>${special("SERVIDOR")}: </b>${special("Coloca tu nombre y saluda a tus amigos.")}<br>`)
		.append(`<b>${special("COMANDO")}: </b>${special("/enter para entrar o reconectarte a la partida.")}<br>`)
		.append(`<b>${special("COMANDO")}: </b>${special("/start para empezar la partida.")}<br>`)
		.append(`<b>${special("COMANDO")}: </b>${special("/reset para reiniciar la partida.")}<br>`);
	});

	hideElements(true); // Ocultamos los demás elementos de la partida
});

var form = $("form").on("submit", function(e) { // Capturamos el click en el botón de enviar
	e.preventDefault(); // Desactivamos el formulario para enviarlo con JS
	
	let message = { // Creamos un objeto con el mensaje
	  	name: $("#username").val().trim(), 
	  	content: $("#content").val().trim()
	}
	
	if (message.name.length > 0 && message.content.length > 0) { // Lo emitimos al servidor si cumple las condiciones
	  	socket.emit("nuevo_mensaje", message);  // Lo emitimos
	  	$("#username").attr("disabled","disabled"); // Desactivamos el nombre
	  	nickname = message.name; // Asignamos el nombre colocado al usuario
	  	$("#content").val("").focus();  // Borramos el mensaje y lo seleccionamos
	}
});

socket.on('difundir_mensaje', function(message) { // Recibimos la señal con el mensaje y lo añadimos al HTML
	$("#chat").append(`<b>${special(message.name)}: </b>${special(message.content)}<br>`);
	$("#chat").animate({ scrollTop: $('#chat').prop("scrollHeight")}, 1000); // Hacemos que el chat baje cada vez que se escriba
});

function special (str) { // Función para prevenir inyección de tags
	// gi => Reemplazo global case-insensitive
	str = str.replace(/</gi, '&lt;'); // importante usar comillas simples
	str = str.replace(/>/gi, '&gt;'); // en las expresiones regulares
	return str;
}