'use strict';

var log = require("../log.js");
var StateBase = require("./StateBase");
var WaitingForPlayers = require("./WaitingForPlayers");
var Race = require("./Race");

class Freewalk extends StateBase {
    constructor(StateHandler) {
        super(StateHandler);
        this.StateHandler = StateHandler;
        log("Waiting for one more player...");
        
        var players = jcmp.players;
        var player;
        for(var k in players) {
            player = players[k];
            
            jcmp.events.CallRemote("armsrace/state", player, "Freewalk");
        }
    }
    
    OnJoin(player) {
        armsrace.StateHandler.SetState(new Race(armsrace.StateHandler));
        super.OnJoin(player);
        log("One more player joined the game!");
        log("Starting race...");
    }
    
    OnQuit(player) {
        super.OnQuit(player);
        var WaitingForPlayers = require("./WaitingForPlayers");
        armsrace.StateHandler.SetState(new WaitingForPlayers(armsrace.GetStateHandler()));
    }
    
    OnDeath(player) {
        super.OnDeath(player);
        setTimeout(function() {
            player.respawnPosition = armsrace.GetLocations().GetRandomRespawnPosition();
            player.Respawn();
            AR.UpdatePlayerWeapon(player, armsrace.GetLocations().GetRandomWeapon());
        }, 3000, player);
    }
    
    OnRespawn(player) {
        super.OnRespawn(player);
    }
    
    OnOutFromArea(player) {
        player.outFromAreaInterval = setInterval(function() {
            if(player.outFromAreaChecks == 10) {
                player.invulnerable = false;
                player.health = 0;
                jcmp.events.CallRemote("armsrace/ReturnedToArea", player);
                clearInterval(player.outFromAreaInterval);
                player.outFromAreaInterval = null;
                player.outFromAreaChecks = 0;
            }
            player.outFromAreaChecks++;
        }, 1000, player);
        jcmp.events.CallRemote("armsrace/OutFromArea", player);
    }
    
    OnReturnToArea(player) {
        clearInterval(player.outFromAreaInterval);
        player.outFromAreaInterval = null;
        player.outFromAreaChecks = 0;
        jcmp.events.CallRemote("armsrace/ReturnedToArea", player);
    }
    
    GetName() {
        return "Freewalk";
    }
    
    GetTime() {
        return 0;
    }
    
    handler(me) {
        super.handler(me);
        var players = jcmp.players;
        var c = 0;
        for(var k in players) {
            c++;
        }
        var Race = require("./Race");
        var WaitingForPlayers = require("./WaitingForPlayers");
        if(c > 2) {
            armsrace.StateHandler.SetState(new Race(armsrace.StateHandler));
        } else if(c < 1) {
            armsrace.StateHandler.SetState(new WaitingForPlayers(armsrace.StateHandler));
        }
    }
    
    destruct() {
        // To Do
    }
}

module.exports = Freewalk;