'use strict';

var waitingForPlayers = require("./states/waitingForPlayers.js");
var race = require("./states/race.js");
var stateHandler = require("./states/stateHandler.js");
var Locations = require("./Locations.js");
var log = require("./log.js");

module.exports = class AR {
    constructor() {
        this.loc = new Locations(this);
        this.stateHandler = new stateHandler(this);
        jcmp.events.Add("PlayerCreated", (player) => {
            jcmp.events.CallRemote("armsrace/PlayerCreated", player);
            var e = AR.GetStateHandler().GetActiveState().OnJoin;
            if(typeof e == "function") {
                e(player);
            }
        });
        
        jcmp.events.Add("PlayerDestroyed", (player) => {
            var e = AR.GetStateHandler().GetActiveState().OnQuit;
            if(typeof e == "function") {
                e(player);
            }
        });
        
        jcmp.events.Add("PlayerDeath", (player) => {
            var e = AR.GetStateHandler().GetActiveState().OnDeath;
            if(typeof e == "function") {
                e(player);
            }
        });
        
        jcmp.events.Add("PlayerRespawn", (player) => {
            var e = AR.GetStateHandler().GetActiveState().OnRespawn;
            if(typeof e == "function") {
                e(player);
            }
        });
    }
    
    GetLocations() {
        return this.loc;
    }
    
    GetStateHandler() {
        return this.stateHandler;
    }
    
    static DeleteElement(arr, el) {
        var newArr = new Array();
        for(var k in arr) {
            if(k == el) {
                continue;
            }
            newArr[k] = arr[k];
        }
        return newArr;
    }
    
    static arrLength(arr) {
        var c = 0;
        for(var k in arr) {
            c++;
        }
        return c;
    }
    
    static rand(min, max) {
        if(min == undefined || max == undefined) {
            return null;
        }
        min = parseInt(min, 10)
        max = parseInt(max, 10)
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}