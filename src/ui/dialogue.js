async function displayLine(textContainer, line) {
    for (const char of line) {
        // textContainer.text += char;
        await new Promise((resolve) => {
            setTimeout(() => {
                textContainer.text += char;
                resolve();
            }, 10);
        });
    }
}

export async function dialogue(k, map, x, y, pos, content) {
    map.add([k.rect(x+2, y+2), k.pos(pos), k.anchor("center"), k.color(220, 220, 220), "border"]);
    const dialogueBox = map.add([k.rect(x, y), k.pos(pos), k.anchor("center"), k.color(27, 29, 52), "tag"]);
    dialogueBox.add([
        k.text(content, {
            font: "ubuntu",
            size: 4
        }),
        k.color(220, 220, 220),
        k.anchor("center"),
    ]);
}

export async function dialogueGold(k, map, x, y, pos, content) {
    map.add([k.rect(x+2, y+2), k.pos(pos), k.anchor("center"), k.color(201, 176, 55), "border"]);
    const dialogueBox = map.add([k.rect(x, y), k.pos(pos), k.anchor("center"), k.color(27, 29, 52), "tag"]);
    dialogueBox.add([
        k.text(content, {
            font: "ubuntu",
            size: 4
        }),
        k.color(220, 220, 220),
        k.anchor("center"),
    ]);
}

export async function dialogueSilver(k, map, x, y, pos, content) {
    map.add([k.rect(x+2, y+2), k.pos(pos), k.anchor("center"), k.color(180, 180, 180), "border"]);
    const dialogueBox = map.add([k.rect(x, y), k.pos(pos), k.anchor("center"), k.color(27, 29, 52), "tag"]);
    dialogueBox.add([
        k.text(content, {
            font: "ubuntu",
            size: 4
        }),
        k.color(220, 220, 220),
        k.anchor("center"),
    ]);
}

export async function dialogueBronze(k, map, x, y, pos, content) {
    map.add([k.rect(x+2, y+2), k.pos(pos), k.anchor("center"), k.color(173, 138, 86), "border"]);
    const dialogueBox = map.add([k.rect(x, y), k.pos(pos), k.anchor("center"), k.color(27, 29, 52), "tag"]);
    dialogueBox.add([
        k.text(content, {
            font: "ubuntu",
            size: 4
        }),
        k.color(220, 220, 220),
        k.anchor("center"),
    ]);
}