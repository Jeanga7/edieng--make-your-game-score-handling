import { img, gravity, world, playerInitialPosition, playerDims, imgStorage } from "./constants.js";
import { gameData } from "./utils.js";
export {
    Character,
    Player,
    Enemy,
    Obstacle,
    Bonus,
    SceneElement
}

class Character {
    constructor(type, pos, dims, mobile = true, speedUp = 1) {
        this.initialPos = {
            x: pos.x,
            y: pos.y
        };
        this.type = type
        this.distance = this.initialPos.x
        this.altitude = this.initialPos.y
        this.velocity = {
            x: 0,
            y: 0
        };
        this.onground = false
        this.mobile = mobile
        this.speedUp = speedUp
        this.width = dims.w;
        this.height = dims.h;
        this.element = {}
        this.element.box = document.createElement('span');
        this.element.skin = document.createElement('span');
        this.element.box.style.zIndex = "999"
        if (type === "player") {
            this.element.box.id = type;
            this.live = 3
            let playerName = document.createElement("span")
            playerName.style.display = "flex"
            playerName.style.flexDirection = "column"
            playerName.style.alignItems = "center"
            playerName.innerHTML = `<span style="font-family:'Arial';font-size:0.8em">${playersInfos[selectedPlayer].name}</span><span>▼</span>`
            this.element.box.appendChild(playerName)
            // console.log("Height before: " + this.height);
        } else {
            this.element.skin.className = type
        }
        this.element.box.appendChild(this.element.skin);
        world.appendChild(this.element.box);
        this.created = false
        this.draw()
    }

    move() {
        this.element.box.style.transform = `translate(${this.distance}px, ${world.clientHeight-this.height-this.altitude}px)`;
    }

    draw() {
        if (!this.created) {
            this.element.box.style.overflow = "hidden"
            this.element.box.style.display = "flex"
            this.element.box.style.flexDirection = "column"
            this.element.box.style.position = "absolute"

            this.element.skin.style.overflow = "hidden"
            this.element.skin.style.position = "relative"
            this.element.skin.style.margin = "auto"
            this.element.skin.style.width = `${this.width}px`
            this.element.skin.style.height = `${this.height}px`

            if (this.type === "player") {
                this.height = this.element.box.getBoundingClientRect().height
            }
            this.move()
            this.created = true
        } else if (this.mobile) {
            this.move()
        }
    }

    update() {
        let changes = {
            x: false,
            y: false
        }
        let movingPlayer = this.type === "player" &&
            (gameData.keys.left.pressed || gameData.keys.right.pressed)

        if (this.type === "enemy" || movingPlayer) {
            this.distance += (this.velocity.x * this.speedUp);
            changes.x = true
        }

        this.altitude += this.velocity.y;
        changes.y = true

        if (this.altitude + this.velocity.y <= world.clientHeight) {
            this.velocity.y += gravity;
        } else {
            this.velocity.y = 0;
        }

        if (changes.x || changes.y) {
            this.draw();
        }
    }
}

class Player extends Character {
    constructor(position) {
        super("player", playerInitialPosition, playerDims)
        this.element.skin.style.backgroundImage = `url('${img[this.type]}')`
        this.element.skin.classList.add("idle")
        this.power = false
    }
}

class Enemy extends Character {
    constructor(pos, mobile, speedUp, skin, dims) {
        dims = dims ?? {
            w: 50,
            h: 60
        }
        super("enemy", pos, dims, mobile, speedUp)

        this.element.skin.style.backgroundImage = `url('${imgStorage+skin}.gif')`
        this.direction = 1
    }

    turn() {
        this.direction = -this.direction
        this.element.skin.style.transform = `scaleX(${this.direction})`;
    }
}

class Obstacle {
    constructor({
        x,
        y
    }, type, dims) {
        this.position = {
            x,
            y
        };
        this.width = dims.w;
        this.height = dims.h;
        this.type = type
        this.element = document.createElement('div');
        this.element.style.backgroundImage = `url(${img[type]})`
        this.element.classList.add('obstacle');
        this.element.style.position = "absolute"
        this.element.style.left = `${x}px`;
        this.element.style.bottom = `${y}px`;
        if (type === "ground" || type === "groundNL") {
            this.element.style.backgroundSize = "auto 100%"
            this.element.style.backgroundRepeat = "repeat-x"
        } else {
            this.element.style.backgroundSize = "cover"
            this.element.style.backgroundPosition = "center center"
            this.element.style.backgroundRepeat = "no-repeat"
        }
        world.appendChild(this.element);
        this.draw()
    }

    draw() {
        this.element.style.left = `${this.position.x}px`;
        this.element.style.bottom = `${this.position.y}px`;
        this.element.style.width = `${this.width}px`
        this.element.style.height = `${this.height}px`
    }
}

class Bonus extends Obstacle {
    constructor(pos, type, dimension) {
        super(pos, type, dimension)
    }
}

class SceneElement {
    constructor({
        x,
        y
    }, dims, ele, p) {
        this.position = {
            x,
            y
        };
        this.element = document.createElement('div');
        this.element.style.backgroundImage = `url(${img[ele]})`
        this.element.className = ele;
        this.element.style.width = dims.w + "px";
        this.element.style.height = dims.h + "px";
        this.element.style.position = p
        this.element.style.left = `${x}px`;
        this.element.style.bottom = `${y}px`;
        this.element.style.backgroundSize = "cover"
        this.element.style.backgroundPosition = "center center"
        this.element.style.backgroundRepeat = "no-repeat"
        world.appendChild(this.element);
    }
}