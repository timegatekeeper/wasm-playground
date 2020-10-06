const canvasElement = document.querySelector('canvas');
const context = canvasElement.getContext('2d');
const botUrls = ['c/leftbot.wasm','c/randombot.wasm','c/sawtooth.wasm'];
const height = 500;
const width = 500;
//let imageData = context.createImageData(width, height);
let modules = [];
let instances = [];
let position = {
    x: 0,
    y: 0
};

let bots = [];

class Location {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
};

let palette = ['red', 'green', 'blue'];

class PaintBot {
    constructor(position, colour, commander) {
        this.position = position;
        this.colour = colour;
        this.commander = commander;
    }
    update(time) {
        //context.beginPath();
        let direction = this.commander.exports.update(time);
        let vector = vectorMovements[direction];
        //context.moveTo(this.position.x, this.position.y);
        this.position.x += vector[0];
        this.position.y += vector[1];
        /*context.lineTo(this.position.x, this.position.y);
        context.closePath();
        context.stroke();*/
        context.fillStyle = this.colour;
        context.fillRect(this.position.x, this.position.y, 1, 1);
    }
};

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

async function spawnBots(botUrls) {
    for (const [idx, url] of botUrls.entries()) {
        const fetchPromise = fetch(url);
        const { module, instance } = await WebAssembly.instantiateStreaming(fetchPromise);
        modules.push(module);
        instances.push(instance);
        let spawnPoint = new Location(getRandomInt(width), getRandomInt(height));
        let bot = new PaintBot(spawnPoint, palette[idx], instance);
        bots.push(bot);
    }
    requestAnimationFrame(update);
}

spawnBots(botUrls);

const vectorMovements = [
    [0,0],[0,-1],[1,-1],[1,0],[1,1],
    [0,1],[-1,1],[-1,0],[-1,-1]
];

function update(time) {
    for(const [idx, bot] of bots.entries()) {
        bot.update(time);
    }
    requestAnimationFrame(update);
}

/*
(async () => {
    const fetchPromise = fetch('bot.wasm');
    const { instance } = await WebAssembly.instantiateStreaming(fetchPromise, {});
    //instance.exports.main();

    function update(time) {
        context.clearRect(0,0,canvasElement.width,canvasElement.height);
        position = instance.exports.update(time);
        context.fillRect(position*5,200,10,10);
        requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
})();*/