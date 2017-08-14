'use strict';

var log = require("../log.js");
var StateBase = require("./StateBase");
var StateHandler = require("./StateHandler.js");
var Freewalk = require("./Freewalk.js");

class WaitingForPlayers extends StateBase {
    constructor(StateHandler) {
        super(StateHandler);
        this.StateHandler = StateHandler;
        this.main = this.StateHandler.main;
        log("Waiting for players...");
    }
    
    OnJoin(player) {
        armsrace.StateHandler.SetState(new Freewalk(armsrace.StateHandler));
        super.OnJoin(player);
        log("One player joined the game!");
        log("But one more player needed...");
        setTimeout(function() {
            var randomWeapon = armsrace.GetLocations().GetRandomWeapon();
            AR.UpdatePlayerWeapon(player, randomWeapon);
        }, 250, player, log);
        player.position = armsrace.GetLocations().GetRandomRespawnPosition();
    }
    
    OnQuit(player) {
        // I think it will never happen
    }
    
    GetName() {
        return "WaitingForPlayers";
    }
    
    handler() {
        
    }
    
    destruct() {
        // To Do
    }
}

module.exports = WaitingForPlayers;