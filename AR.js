'use strict';

var StateHandler = require("./states/StateHandler.js");
var Locations = require("./Locations.js");
var EventListener = require("./EventListener.js");
var log = require("./log.js");

class AR {
    constructor() {
        this.loc = new Locations(this);
        this.StateHandler = new StateHandler(this);
        this.EventListener = new EventListener;
        
        setInterval(function() {
            var players = jcmp.players;
            var player;
            var area = armsrace.GetLocations().GetLocation().area;
            var x1 = area.x1,
                x2 = area.x2,
                z1 = area.z1,
                z2 = area.z2;
            for(var k in players) {
                player = players[k];
                var isInArea = (x1 > player.position.x && player.position.x > x2) && (z1 < player.position.z && player.position.z < z2);
                if(! isInArea && ! player.outFromArea) {
                    armsrace.GetStateHandler().GetActiveState().OnOutFromArea(player);
                    player.outFromArea = true;
                    player.outFromAreaChecks = 0;
                } else if(isInArea && player.outFromArea) {
                    armsrace.GetStateHandler().GetActiveState().OnReturnToArea(player);
                    player.outFromArea = false;
                    player.outFromAreaChecks = 0;
                }
            }
        }, 500);
    }
    
    GetLocations() {
        return this.loc;
    }
    
    GetStateHandler() {
        return this.StateHandler;
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
        min = parseInt(min, 10);
        max = parseInt(max, 10);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    static UpdatePlayerWeapon(player, weapon) {
        player.GiveWeapon(weapon.modelHash, weapon.magazineAmmo + weapon.reserveAmmo, true);
        for(var k in player.weapons) {
            if(player.weapons[k].modelHash != weapon.modelHash) {
                player.RemoveWeapon(player.weapons[k].modelHash);
                continue;
            }
            player.weapons[k].magazineAmmo = weapon.magazineAmmo;
            player.weapons[k].reserveAmmo = weapon.reserveAmmo;
        }
    }
}

module.exports = AR;