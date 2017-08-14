'use strict';

class EventListener {
    OnJoin(player) {
        armsrace.GetStateHandler().GetActiveState().OnJoin(player);
    }
    
    OnQuit(player) {
        armsrace.GetStateHandler().GetActiveState().OnQuit(player);
    }
    
    OnDeath(player) {
        armsrace.GetStateHandler().GetActiveState().OnDeath(player);
    }
    
    OnRespawn(player) {
        armsrace.GetStateHandler().GetActiveState().OnRespawn(player);
    }
}

module.exports = EventListener;