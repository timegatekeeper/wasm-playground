const canvasElement = document.querySelector('canvas');
const context = canvasElement.getContext('2d');
const height = 500;
const width = 500;
//let imageData = context.createImageData(width, height);
let modules = [];
let instances = [];
let bots = [];
let position = {
    x: 0,
    y: 0
};

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

// TO DO maybe an application class

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

async function getBotRoster(rosterUrl) {
    const response = await fetch(rosterUrl);
    return await response.json();
}

async function spawnBots(botUrls) {
    let bots = [];
    for (const [idx, url] of botUrls.entries()) {
        const fetchPromise = fetch(url);
        const { module, instance } = await WebAssembly.instantiateStreaming(fetchPromise);
        let spawnPoint = new Location(getRandomInt(width), getRandomInt(height));
        let bot = new PaintBot(spawnPoint, palette[idx], instance);
        bots.push(bot);
    }
    return bots;
}

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

async function run() {
    let rosterUrl = "bots.json";
    let botRoster = await getBotRoster(rosterUrl);
    //TO DO: change to return modules and instances
    bots = await spawnBots(botRoster);
    requestAnimationFrame(update);
}

run();
