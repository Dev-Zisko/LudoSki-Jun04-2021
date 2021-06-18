'use strict';

function firstLetterCap (message) {
    message = message.toLowerCase();
    return message.charAt(0).toUpperCase() + message.slice(1);
}

module.exports = {
	firstLetterCap
}