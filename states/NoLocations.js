'use strict';

var log = require("../log.js");
var StateBase = require("./StateBase");

class NoLocations extends StateBase {
    constructor(StateHandler) {
        super(StateHandler);
        this.warning();
    }
    
    OnJoin(player) {
        super.OnJoin(player);
        this.warning();
    }
    
    GetName() {
        return "NoLocations";
    }
    
    warning() {
        log("*********** !!! WARNING !!! ***********");
        log("Game cannot be started, because no one location hasn't been found or loaded.");
        log("You have to restart the server and add or fix at least one location.");
    }
}

module.exports = NoLocations;