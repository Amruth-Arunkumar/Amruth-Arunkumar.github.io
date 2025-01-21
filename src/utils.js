import { tilesize } from "./constants.js";
import { showText } from "./ui/text.js";

export function displayDialogue(k, text, onDisplayEnd) {
    const dialogueUI = document.getElementById("textbox-container");
    const dialogue = document.getElementById("dialogue");
    const link = document.getElementById("link");

    dialogueUI.style.display = "block";
    link.style.display = "none"

    let index = 0;
    let currentText = "";
    const intervalRef = setInterval(() => {
        if (index < text.length) {
            currentText += text[index];
            dialogue.innerHTML = currentText;
            index++;
            return;
        }

        clearInterval(intervalRef);
    }, 5);
    const closeBtn = document.getElementById("close");

    function onCloseBtnClick() {
        document.getElementById("game").focus();
        dialogueUI.inert = true;
        onDisplayEnd();
        dialogueUI.style.display = "none";
        link.style.display = "block"
        dialogue.innerHTML = "";
        clearInterval(intervalRef);
        closeBtn.removeEventListener("click", onCloseBtnClick);
    }

    closeBtn.addEventListener("click", onCloseBtnClick);

    addEventListener("keypress", (key) => {
        if (key.code === "Enter") {
            onCloseBtnClick();
        }
    });
}

export function setCamScale(k) {
    const resizeFactor = k.height()*1.25;
    k.camScale(k.vec2(resizeFactor / 300));
    if (k.width() < k.height()) {
        k.destroyAll("screenLimit");
        const dialogueBox = k.add([k.rect(k.width(), k.height()), k.pos(0), k.fixed(), k.color(27, 29, 52), "screenLimit"]);
        dialogueBox.add([
            k.text("Please use landscape mode", {
                font: "ubuntu",
                lineSpacing: 15,
                size: 18
            }),
            k.color(220, 220, 220),
            k.anchor("center"),
            k.pos(k.center())
        ]);
    } else {
        k.destroyAll("screenLimit");
    }
}

export function playAnimIfNotPlaying(gameObj, animName) {
    if ((gameObj.getCurAnim() && gameObj.getCurAnim().name !== animName) || (!gameObj.getCurAnim())) {gameObj.play(animName)};
}

export function areAnyOfTheseKeysDown(k, keys) {
    for (const key of keys) {
        if (k.isKeyDown(key)) return true;
    }
    return false;
}

export function distance(a, b) {
    return Math.sqrt((a.x-b.x)**2 + (a.y-b.y)**2);
}

export async function fetchMapData(mapPath) {
    return await (await fetch(mapPath)).json();
}

export function drawTiles(k, map, layer, tileheight, tilewidth, spritesheet) {
    let drawnTiles = 0;
    const tilePos = k.vec2(0, 0);
    for (const tile of layer.data) {
        if (drawnTiles % layer.width === 0) {
            tilePos.x = 0;
            tilePos.y += tileheight;
        } else {
            tilePos.x += tilewidth;
        }

        drawnTiles++;
        if (tile === 0) continue;

        map.add([
            k.sprite(spritesheet, {frame: tile-1}),
            k.pos(tilePos),
            k.offscreen()
        ]);
    }
}

export function drawImage(k, pos, scale, image="profile", anchor="topleft") {
    return [
        k.sprite(image),
        k.pos(pos),
        k.scale(scale),
        k.anchor(anchor),
        k.offscreen()
    ];
}

export function generateColliderBoxComponents(k, width, height, pos, tag) {
    return [
        k.area({shape: new k.Rect(k.vec2(0), width, height)}),
        k.pos(pos),
        k.body({isStatic:true}),
        k.offscreen(),
        tag
    ];
}

export function drawBoundaries(k, map, layer) {
    for (const object of layer.objects) {
        map.add(generateColliderBoxComponents(k, object.width, object.height, k.vec2(object.x, object.y + tilesize), object.name));
    }
}

export function skillLevel(skill) {
    const gold = ["Python", "SQL", "C++"];
    const silver = ["C", "JavaScript", "HTML", "Java"]
    const bronze = ["CSS"]
    if (gold.includes(skill)) return "gold";
    else if (silver.includes(skill)) return "silver";
    else return "bronze";
}