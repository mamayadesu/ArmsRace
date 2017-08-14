'use strict';

var log = require("../log.js");
var StateBase = require("./StateBase");

class LocationVote extends StateBase {
    constructor(StateHandler) {
        this.StateHandler = StateHandler;
    }
    
    displayForAll() {
        // To Do
    }
    
    displayFor(player) {
        // To Do
    }
    
    OnJoin(player) {
        jcmp.events.CallRemote("armsrace/PlayerCreated", player);
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
    
    GetName() {
        return "Unamed state";
    }
    
    GetTime() {
        // To Do
    }
    
    handler() {
        
    }
    
    OnRespawn(player) {
        
    }
    
    destruct() {
        
    }
}

module.exports = LocationVote;