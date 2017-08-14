'use strict';

var log = require("./log.js");
var noLocations = require("./states/noLocations.js");
var stateHandler = require("./states/stateHandler.js");

module.exports = class Locations {
    constructor(main) {
        this.main = main;
        this.locations = new Array();
        this.locationsKeys = new Array();
        this.LoadLocations();
        if(this.GetAllLocations().length == 0) {
            setTimeout(function() {
                var sh = main.GetStateHandler();
                sh.SetState(new noLocations(sh));
            }, 250, main);
            return;
        }
        this.SetRandomLocation();
        log("Random location ('"+this.GetLocation().name+"') selected");
    }
    
    static GetDir() {
        return "./packages/armsrace/locations/";
    }
    
    GetLocation() {
        return this.ActiveLocation;
    }
    
    GetLocationByName(name) {
        return this.locations[this.locationsKey.indexOf(name)];
    }
    
    GetAllLocations() {
        return this.locations;
    }
    
    SetLocation(location) {
        this.ActiveLocation = location;
    }
    
    SetLocationByName(name) {
        var idx = this.locationsKeys.indexOf(name);
        if(idx == -1) {
            log("SetLocationByName: Location '"+name+"' doesn't added.");
            return;
        }
        this.SetLocation(this.locations[idx]);
        
    }
    
    SetRandomLocation() {
        this.SetLocation(this.locations[AR.rand(0, AR.arrLength(this.locations) - 1)]);
    }
    
    LoadLocations() {
        var fs = require('fs');
        var filename, loc, extension;
        var splittedFilename, location, respawn, weapon;
        var content;
        var somethingWrong = false;
        var x, y, z;
        var rd = fs.readdirSync(Locations.GetDir());
        var totalKills = 0;
        for(var k in rd) {
            filename = rd[k];
            somethingWrong = false;
            
            splittedFilename = filename.split(".");
            extension = splittedFilename[splittedFilename.length - 1].toLowerCase();
            if(extension != "json") {
                continue;
            }
            splittedFilename = AR.DeleteElement(splittedFilename, splittedFilename.length - 2);
            loc = splittedFilename.join(".");
            
            content = fs.readFileSync(Locations.GetDir()+filename);
            
            try {
                location = JSON.parse(content);
            } catch(e) {
                log("*** AN ERROR OCCURED WHILE PARSING "+filename);
                console.log(e);
                location = null;
                somethingWrong = true;
            }
            
            if(location == null) {
                continue;
            }
            
            if(typeof location.name != "string" && typeof location.name != "number") {
                log("Wrong name in "+filename);
                somethingWrong = true;
            } else if(typeof location.area != "object") {
                log("Wrong area data");
                somethingWrong = true;
            } else if(typeof location.respawns != "object") {
                log("Wrong respawns data");
                somethingWrong = true;
            } else if(typeof location.weapons != "object") {
                log("Wrong weapons data");
                somethingWrong = true;
            }
            
            if(somethingWrong) {
                log("Skipping "+filename+"...");
                continue;
            }
            
            if(typeof location.area.x1 == "undefined" ||
               typeof location.area.z1 == "undefined" ||
               typeof location.area.x2 == "undefined" ||
               typeof location.area.z2 == "undefined") {
                log("'area' must has x1, z1, x2, z2 (in "+filename+")");
                somethingWrong = true;
            }
            
            if(location.respawns.length == 0) {
                log("'respawns' must has at least one respawn (in "+filename+")");
                somethingWrong = true;
            }
            
            if(location.weapons.length == 0) {
                log("'weapons' must has at least one weapon (in "+filename+")");
                somethingWrong = true;
            }
            
            if(somethingWrong) {
                log("Skipping "+filename+"...");
                continue;
            }
            
            for(let k in location.respawns) {
                respawn = location.respawns[k];
                if(typeof respawn.x == "undefined") {
                    log("'x' position not found on respawn #"+(k + 1));
                    somethingWrong = true;
                }
                if(typeof respawn.y == "undefined") {
                    log("'y' position not found on respawn #"+(k + 1));
                    somethingWrong = true;
                }
                if(typeof respawn.z == "undefined") {
                    log("'z' position not found on respawn #"+(k + 1));
                    somethingWrong = true;
                }
                
                if(somethingWrong) {
                    break;
                }
                
                if(typeof respawn.x != "number") {
                    log("'x' position is not number on respawn #"+(k + 1));
                    somethingWrong = true;
                }
                if(typeof respawn.y != "number") {
                    log("'y' position is not number on respawn #"+(k + 1));
                    somethingWrong = true;
                }
                if(typeof respawn.z != "number") {
                    log("'z' position is not number on respawn #"+(k + 1));
                    somethingWrong = true;
                }
                
                if(somethingWrong) {
                    break;
                }
            }
            
            if(somethingWrong) {
                log("Skipping "+filename+"...");
                continue;
            }
            
            for(let k in location.respawns) {
                x = location.respawns[k].x;
                y = location.respawns[k].y;
                z = location.respawns[k].z;
                
                location.respawns[k] = new Vector3f(x, y, z);
            }
            
            for(let k in location.weapons) {
                weapon = location.weapons[k];
                if(typeof weapon.modelHash == "undefined") {
                    log("'modelHash' not found on weapon #"+(k + 1));
                    somethingWrong = true;
                }
                if(typeof weapon.kills == "undefined") {
                    log("'kills' not found on weapon #"+(k + 1));
                    somethingWrong = true;
                }
                
                if(somethingWrong) {
                    break;
                }
                
                if(typeof weapon.modelHash != "number") {
                    log("'modelHash' is not number on weapon #"+(k + 1));
                    somethingWrong = true;
                }
                if(typeof weapon.kills != "number") {
                    log("'kills' is not number on weapon #"+(k + 1));
                    somethingWrong = true;
                }
                
                if(somethingWrong) {
                    break;
                }
                
                totalKills += weapon.kills;
            }
            if(somethingWrong) {
                log("Skipping "+filename+"...");
                continue;
            }
            
            this.locations.push(location);
            this.locationsKeys.push(location.name);
            
            log("Location '"+location.name+"' added ("+location.respawns.length+" respawns, "+location.weapons.length+" weapons and "+totalKills+" frags to victory)");
        }
    }
}