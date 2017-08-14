'use strict';

global.AR = require("./AR.js");
global.armsrace = new AR;

jcmp.events.Add("PlayerReady", armsrace.EventListener.OnJoin);

jcmp.events.Add("PlayerDestroyed", armsrace.EventListener.OnQuit);

jcmp.events.Add("PlayerDeath", armsrace.EventListener.OnDeath);

jcmp.events.Add("PlayerRespawn", armsrace.EventListener.OnRespawn);