'use strict';

var log = require("../log.js");

class waitingForPlayers {
    constructor(stateHandler) {
        this.stateHandler = stateHandler;
        log("Waiting for players...");
    }
    
    OnJoin(player) {
        log("Someone joined the game!");
        log("Starting arms race...");
        this.stateHandler.SetState(new race);
    }
    
    OnLeft(player) {
        // I think it will never happen
    }
    
    handler() {
        
    }
    
    destruct() {
        // To Do
    }
}

module.exports = waitingForPlayers;