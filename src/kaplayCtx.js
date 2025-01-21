import kaplay from "../lib/kaplay.mjs";

export const k = kaplay({
    global: false,
    touchToMouse: true,
    canvas: document.getElementById("game"),
    crisp: true
});
