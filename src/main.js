import { k } from "./kaplayCtx.js";
import intro from "./scenes/intro.js";

k.loadFont("ubuntu", "../assets/Ubuntu.ttf");
k.loadSprite("profile", "../assets/me.png");
k.loadSprite("asset_player", "../assets/player.png", {
    sliceX: 4,
    sliceY: 3,
    anims: {
        "idle-down": 0,
        "walk-down": { from: 0, to: 3, loop: true, speed: 8},
        "idle-side": 4,
        "walk-side": { from: 4, to: 7, loop: true, speed: 8},
        "idle-up": 8,
        "walk-up": { from: 8, to: 11, loop: true, speed: 8}
    }
});

k.loadSprite("assets", "../assets/intro.png", {
    sliceX: 6,
    sliceY: 6
});

const scenes = {
    intro
};

for (const sceneName in scenes) {
    k.scene(sceneName, () => scenes[sceneName](k));
}

k.go("intro");
