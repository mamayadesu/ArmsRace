const _ui = new WebUIWindow("armsrace_ui", "package://armsrace/ui/index.html", new Vector2(jcmp.viewportSize.x, jcmp.viewportSize.y));
ui.autoResize = true;

jcmp.events.AddRemoteCallable("armsrace/PlayerCreated", (ct) => {
    // Grappling and wingsuit disabled
    // but not parachute
    jcmp.localPlayer.SetAbilityEnabled(0xCB836D80, false); // Disable grappling
    jcmp.localPlayer.SetAbilityEnabled(0xE060F641, false); // Disable wingsuit
});