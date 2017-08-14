'use strict';

var log = require("../log.js");

class locationVote {
    constructor(stateHandler) {
        this.stateHandler = stateHandler;
    }
    
    displayForAll() {
        // To Do
    }
    
    displayFor(player) {
        // To Do
    }
    
    OnJoin(player) {
        // To Do
        // display vote window
        // and safe
    }
    
    OnQuit(player) {
        
    }
    
    OnDeath(player) {
        // To Do
        // fast respawn
    }
    
    handler() {
        
    }
    
    OnRespawn(player) {
        
    }
    
    destruct() {
        
    }
}

module.exports = locationVote;