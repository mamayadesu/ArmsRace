'use strict';

var log = require("../log.js");
var StateBase = require("./StateBase");

class Race extends StateBase {
    constructor(StateHandler) {
        super();
        this.StateHandler = StateHandler;
        this.scores = {};
        
        var players = jcmp.players;
        var player;
        for(var k in players) {
            player = players[k];
            
            jcmp.events.CallRemote("armsrace/state", player, "Race", this.StateHandler.main.GetLocations.GetLocation().time);
        }
    }
    
    OnJoin(player) {
        super.
        this.scores[player.networkId] = 0;
        this.weapons[player.networkId] = {
            "modelHash": this.StateHandler.main.GetLocations().GetLocation().weapons[0].modelHash || 0xf0d3387a,
            "kills": 0
        };
    }
    
    OnQuit(player) {
        super.OnQuit(player);
        setTimeout(function() {
            if(jcmp.players.length == 0) {
                log("The server is empty. Waiting for players...");
                var WaitingForPlayers = require("./WaitingForPlayers");
                this.StateHandler.SetState(new WaitingForPlayers(armsrace.GetStateHandler()));
            } else if(jcmp.players.length) {
                log("One or more players needed...");
                var Freewalk = require("./Freewalk");
                this.StateHandler.SetState(new Freewalk(armsrace.GetStateHandler()));
            }
        }, 1000);
        this.scores = AR.DeleteElement(this.scores, player.networkId);
        this.weapons = AR.DeleteElement(this.weapons, player.networkId);
    }
    
    OnDeath(player) {
        this.scores[player.networkId]--;
        
        // To Do
    }
    
    GetName() {
        return "Race";
    }
    
    GetTime() {
        // To Do
    }
    
    handler() {
        // To Do
    }
    
    destruct() {
        this.scores = undefined;
        this.weapons = undefined;
        
        // To Do
    }
}

module.exports = Race;