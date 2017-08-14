const ui = new WebUIWindow("armsrace_ui", "package://armsrace/ui/index.html", new Vector2(jcmp.viewportSize.x, jcmp.viewportSize.y));
ui.autoResize = true;

jcmp.events.AddRemoteCallable("armsrace/PlayerCreated", () => {
    // Grappling and wingsuit disabled
    // but not parachute
    jcmp.localPlayer.SetAbilityEnabled(0xCB836D80, false); // Disable grappling
    jcmp.localPlayer.SetAbilityEnabled(0xE060F641, false); // Disable wingsuit
});

jcmp.events.AddRemoteCallable("armsrace/OutFromArea", () => {
    jcmp.ui.CallEvent('armsrace/OutFromAreaWarning');
});

jcmp.events.AddRemoteCallable("armsrace/ReturnedToArea", () => {
    jcmp.ui.CallEvent('armsrace/OutFromAreaWarning', false);
});

jcmp.events.AddRemoteCallable("armsrace/state", (state, time) => {
    jcmp.ui.CallEvent('armsrace/stateInfo', state, time);
});