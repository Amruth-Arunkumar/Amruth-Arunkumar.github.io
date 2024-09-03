import { dialogueData, instructions, name, program, scaleFactor, tilesize } from "../constants.js";
import { generatePlayerComponents, setPlayerMovement } from "../entities/player.js";
import { dialogue } from "../ui/dialogue.js";
import { showText } from "../ui/text.js";
import { displayDialogue, setCamScale, fetchMapData, drawBoundaries, drawTiles, drawImage } from "../utils.js";

export default async function intro(k) {
    k.setBackground(k.Color.fromHex("#1b1d34"));
    const mapData = await fetchMapData("./assets/maps/intro.json");

    const map = k.add([k.pos(0, 0)]);

    const entities = {
        player: null,
        profile: null
    };

    const text = {
        name: null
    }

    const layers = mapData.layers;

    for (const layer of layers) {
        if (layer.name === "Boundaries") {
            drawBoundaries(k, map, layer);
            continue;
        } if (layer.name === "SpawnPoints") {
            for (const object of layer.objects) {
                if (object.name === "player") {
                    entities.player = map.add(generatePlayerComponents(k, k.vec2(object.x, object.y+tilesize)));
                    continue;
                }
            }
            continue;
        } if (layer.name === "ObjectPoints") {
            for (const object of layer.objects) {
                if (object.name === "profile") {
                    entities.profile = map.add(drawImage(k, k.vec2(object.x, object.y + tilesize), 0.27));
                    continue;
                } if (object.name === "name") {
                    text.name = map.add(showText(k, name, k.vec2(object.x, object.y + tilesize), 11, 220, 220, 220));
                    continue;
                } if (object.name === "program") {
                    text.name = map.add(showText(k, program, k.vec2(object.x, object.y + tilesize), 8, 220, 220, 220));
                    continue;
                } if (object.name === "instructions") {
                    text.name = map.add(showText(k, instructions, k.vec2(object.x, object.y + tilesize), 7, 220, 220, 220));
                    continue;
                }
            }
            continue;
        }
        drawTiles(k, map, layer, mapData.tileheight, mapData.tilewidth);
    }

    setCamScale(k);
    k.camPos(entities.player.worldPos().x, entities.player.worldPos().y-40);

    k.onUpdate(() => {
        if (entities.player.pos.dist(k.camPos())) {
            k.tween(
                k.camPos(),
                k.vec2(k.camPos(entities.player.worldPos().x, entities.player.worldPos().y-40)),
                0.15,
                (newPos) => {
                    k.camPos(newPos);
                },
                k.easings.linear
            );
        }
    });

    k.onResize(() => {
        setCamScale(k);
    });

    setPlayerMovement(k, entities.player);

    entities.player.onCollide("resume", () => {
        entities.player.isInDialogue = true;
        displayDialogue(k, dialogueData.resume, () => (entities.player.isInDialogue = false));
    });

    entities.player.onCollide("cert", () => {
        entities.player.isInDialogue = true;
        displayDialogue(k, dialogueData.certs, () => (entities.player.isInDialogue = false));
    });

    entities.player.onCollide("music", () => {
        entities.player.isInDialogue = true;
        displayDialogue(k, dialogueData.music, () => (entities.player.isInDialogue = false));
    });

    entities.player.onCollide("canvas", () => {
        entities.player.isInDialogue = true;
        displayDialogue(k, dialogueData.art, () => (entities.player.isInDialogue = false));
    });

    entities.player.onCollide("tv", () => {
        entities.player.isInDialogue = true;
        displayDialogue(k, dialogueData.tv, () => (entities.player.isInDialogue = false));
    });

    entities.player.onCollide("exit-f1", () => {
        entities.player.isInDialogue = true;
        displayDialogue(k, dialogueData["exit-f1"], () => (entities.player.isInDialogue = false));
    });
}