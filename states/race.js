'use strict';

var log = require("../log.js");

class race {
    constructor(stateHandler) {
        this.stateHandler = stateHandler;
        this.scores = {};
    }
    
    OnJoin(player) {
        this.scores[player.networkId] = 0;
        this.weapons[player.networkId] = {
            "modelHash": this.stateHandler.main.GetLocations().GetLocation().weapons[0].modelHash || 0xf0d3387a,
            "kills": 0
        };
    }
    
    OnLeft(player) {
        setTimeout(function() {
            if(jcmp.players.length == 0) {
                log("The server is empty. Waiting for players...");
                this.stateHandler.SetState(new waitingForPlayers);
            }
        }, 1000);
        this.scores = AR.DeleteElement(this.scores, player.networkId);
        this.weapons = AR.DeleteElement(this.weapons, player.networkId);
    }
    
    OnDeath(player) {
        this.scores[player.networkId]--;
        
        // To Do
    }
    
    OnRespawn(player) {
        
    }
    
    handler() {
        
    }
    
    destruct() {
        this.scores = undefined;
        this.weapons = undefined;
        
        // To Do
    }
}

module.exports = race;