export function showText(k, content, pos, size, r, g, b, font="ubuntu") {
    return [
        k.text(content, {
            font: font,
            width: 700,
            size: size
        }),
        k.color(r, g, b),
        k.pos(pos),
    ];
}