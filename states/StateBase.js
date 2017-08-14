'use strict';

class StateBase {
    constructor(StateHandler) {
        
    }
    
    OnJoin(player) {
        jcmp.events.CallRemote("armsrace/PlayerCreated", player);
        setTimeout(function() {
            var state = armsrace.GetStateHandler().GetActiveState();
            jcmp.events.CallRemote("armsrace/state", player, state.GetName(), state.GetTime());
        }, 500, player);
        console.log(player.name+" joined");
    }
    
    OnQuit(player) {
        console.log(player.name+" left");
    }
    
    OnDeath(player) {
        console.log(player.name+" dead.");
        player.RemoveWeapon(0);
        player.RemoveWeapon(1);
        player.RemoveWeapon(2);
        player.RemoveWeapon(3);
        /*player.respawnPosition = player.position;
        setTimeout(function() {
            player.Respawn();
        }, 3000, player);*/
    }
    
    OnRespawn(player) {
        console.log(player.name+" respawned.");
    }
    
    OnOutFromArea(player) {
        console.log(player.name+" out from area.");
        player.health = 0;
    }
    
    OnReturnToArea(player) {
        console.log(player.name+" returned to area.");
    }
    
    GetName() {
        return "Unamed state";
    }
    
    GetTime() {
        return 0;
    }
    
    handler(me) {
        
    }
    
    destruct() {
        
    }
}

module.exports = StateBase;