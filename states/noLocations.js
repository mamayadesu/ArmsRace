'use strict';

var log = require("../log.js");

class noLocations {
    constructor(stateHandler) {
        this.warning();
    }
    
    OnJoin(player) {
        this.warning();
    }
    
    OnLeft(player) {
        
    }
    
    OnDeath(player) {
        
    }
    
    OnRespawn(player) {
        
    }
    
    handler() {
        
    }
    
    warning() {
        log("*********** !!! WARNING !!! ***********");
        log("Game cannot be started, because no one location hasn't been found or loaded.");
        log("You have to restart the server and add or fix at least one location.");
    }
    
    handler() {
        
    }
    
    destruct() {
        
    }
}

module.exports = noLocations;