const canvasElement = document.querySelector('canvas');
const context = canvasElement.getContext('2d');
const height = canvasElement.height;
const width = canvasElement.width;
//this is a global store of compiled web assembly modules
let modules = [];
//this is a global store of instantiated modules
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
    move(x, y) {
        this.x += x;
        this.y += y;
    }
};

class Colour {
    constructor(r, g, b, a = 255) {
        this.red = r;
        this.green = g;
        this.blue = b;
        this.alpha = a;
    }
    getCSSString() {
        return "rgba(" + this.red + "," + this.green + "," + this.blue + "," + this.alpha + ")";
    }
    toInteger() {
        return this.red + (this.green*256) + (this.blue*256*256) + (this.alpha*265*256*256);
    }
}

class PaintBot {
    constructor(name, position, colour, commander) {
        //TO DO: bot can be renamed later
        this.name = name;
        this.position = position;
        this.colour = colour;
        this.commander = commander;
        this.heading = 0;
        if(this.commander.exports.init) {
            console.log(colour.toInteger());
            this.commander.exports.init(position.x, position.y, width, height);
        }
    }
    update(time) {
        let direction = this.commander.exports.update(time,
             this.position.x, this.position.y);
        let vector = vectorMovements[direction];
        this.move(vector[0], vector[1]);
        this.render();
    }
    move(x, y) {
        this.position.move(x, y);
    }
    render() {
        context.fillStyle = this.colour.getCSSString();
        const botLength = 15;
        const botWidth = 10;
        context.fillRect(this.position.x-10, this.position.y-10, 20, 20);
    }
};

// TO DO maybe an application class

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getRandomColour() {
    return new Colour(getRandomInt(256), getRandomInt(256), getRandomInt(256), 255);
}

async function getBotRoster(rosterUrl) {
    const response = await fetch(rosterUrl);
    return await response.json();
}

const importObject = {
    env : {
        consoleLog(value) {
            console.log(value);
        }
    }
};

async function spawnBots(botUrls) {
    let bots = [];
    for (const [idx, url] of botUrls.entries()) {
        const fetchPromise = fetch(url);
        try {
            const { module, instance } = await WebAssembly.instantiateStreaming(fetchPromise, importObject);
            let spawnPoint = new Location(getRandomInt(width), getRandomInt(height));
            let bot = new PaintBot(url, spawnPoint, getRandomColour(), instance);
            bots.push(bot);
        }
        catch(error) {
            console.error("Problem with ", url, error);
        }
    }
    return bots;
}

const vectorMovements = [
    [0,0],[0,-1],[1,-1],[1,0],[1,1],
    [0,1],[-1,1],[-1,0],[-1,-1]
];

function update(time) {
    context.clearRect(0, 0, width, height);
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
