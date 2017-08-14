'use strict';

var waitingForPlayers = require("./waitingForPlayers");
var race = require("./race");

class stateHandler {
    constructor(main) {
        this.main = main;
        this.ActiveState = {};
        this.SetState(new waitingForPlayers(this));
        setInterval(function() {
            main.GetStateHandler().GetActiveState().handler();
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
        
    }
    
    OnLeft(player) {
        
    }
    
    OnDeath(player) {
        
    }
    
    OnRespawn(player) {
        
    }
    
    handler() {
        console.log("hi");
    }
}

module.exports = stateHandler;