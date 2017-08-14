'use strict';

var WaitingForPlayers = require("./WaitingForPlayers.js");
var Race = require("./Race");
var NoLocations = require("./NoLocations");
var LocationVote = require("./LocationVote");
var Freewalk = require("./Freewalk");

class StateHandler {
    constructor(main) {
        this.main = main;
        this.ActiveState = {};
        this.SetState(new WaitingForPlayers(this));
        setInterval(function() {
            var state = main.GetStateHandler().GetActiveState();
            state.handler(state);
        }, 50, main);
        /*this.states = {
            "waitingForPlayers": require("./waitingForPlayers"),
            "race": require("./race")
        };*/
        
    }
    
    SetState(state) {
        var e = this.ActiveState.destruct;
        if(typeof e == "function") {
            e();
        }
        this.ActiveState = state;
    }
    
    GetActiveState() {
        return this.ActiveState;
    }
    
    OnJoin(player) {
        jcmp.events.CallRemote("armsrace/PlayerCreated", player);
    }
    
    OnQuit(player) {
        
    }
    
    OnDeath(player) {
        
    }
    
    OnRespawn(player) {
        
    }
    
    handler() {
        console.log("hi");
    }
}

module.exports = StateHandler;