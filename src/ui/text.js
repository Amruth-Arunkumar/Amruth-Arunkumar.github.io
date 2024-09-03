export function showText(k, content, pos, size, r, g, b) {
    return [
        k.text(content, {
            font: "ubuntu",
            width: 700,
            size: size
        }),
        k.color(r, g, b),
        k.pos(pos)
    ];
}