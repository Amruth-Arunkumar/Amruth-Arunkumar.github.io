import { areAnyOfTheseKeysDown, playAnimIfNotPlaying } from "../utils";

export function generatePlayerComponents(k, pos) {
    return [
        k.sprite("asset_player", {anim: "idle-down"}),
        k.area({
            shape: new k.Rect(k.vec2(0, 8), 20, 16),
        }),
        k.body(),
        k.anchor("center"),
        k.pos(pos),
        {
            speed: 150,
            direction: "down",
            isInDialogue: false
        },
        "player"
    ];
}



export function setPlayerMovement(k, player) {
    k.onMouseDown((mouseBtn) => {
        if (mouseBtn !== "left" || player.isInDialogue) return;

        const worldMousePos = k.toWorld(k.mousePos());
        player.moveTo(worldMousePos, player.speed);

        const mouseAngle = player.pos.angle(worldMousePos);

        const lowerBound = 45;
        const upperBound = 135;

        if (mouseAngle > lowerBound && mouseAngle < upperBound && ((player.getCurAnim() && player.getCurAnim().name !== "walk-up") || (!player.getCurAnim()))) {
            player.play("walk-up");
            player.direction = "up";
            return;
        } 

        if (mouseAngle < -lowerBound && mouseAngle > -upperBound && ((player.getCurAnim() && player.getCurAnim().name !== "walk-down") || (!player.getCurAnim()))) {
            player.play("walk-down");
            player.direction = "down";
            return;
        }

        if (Math.abs(mouseAngle) > upperBound) {
            player.flipX = false;
            if ((player.getCurAnim() && player.getCurAnim().name !== "walk-side") || (!player.getCurAnim())) {
                player.play("walk-side");
                player.direction = "right";
                return;
            }
        }

        if (Math.abs(mouseAngle) < lowerBound) {
            player.flipX = true;
            if ((player.getCurAnim() && player.getCurAnim().name !== "walk-side") || (!player.getCurAnim())) {
                player.play("walk-side");
                player.direction = "left";
                return;
            }
        }
    });

    k.onMouseRelease(() => {
        document.getElementById("textbox-container").inert = false;
        if (player.direction === "down") {
            player.play("idle-down");
            return;
        }
        if (player.direction === "up") {
            player.play("idle-up");
            return;
        }
    
        player.play("idle-side");
    });

    k.onKeyDown((key) => {
        if (player.isInDialogue) return;
        if (key === "left" && !areAnyOfTheseKeysDown(k, ["up", "down"])) {
            player.flipX = true;
            playAnimIfNotPlaying(player, "walk-side");
            player.move(-player.speed, 0);
            player.direction = "left";
            return;
        } if (key === "right" && !areAnyOfTheseKeysDown(k, ["up", "down"])) {
            player.flipX = false;
            playAnimIfNotPlaying(player, "walk-side");
            player.move(player.speed, 0);
            player.direction = "right";
            return;
        } if (key === "up") {
            playAnimIfNotPlaying(player, "walk-up");
            player.move(0, -player.speed);
            player.direction = "up";
            return;
        } if (key === "down") {
            playAnimIfNotPlaying(player, "walk-down");
            player.move(0, player.speed);
            player.direction = "down";
            return;
        }
    });

    k.onKeyRelease(() => {
        if (player.direction === "down") {
            player.play("idle-down");
            return;
        }
        if (player.direction === "up") {
            player.play("idle-up");
            return;
        }
    
        player.play("idle-side");
    });
}