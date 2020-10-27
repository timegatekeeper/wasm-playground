const canvasElement = document.querySelector('canvas');
const context = canvasElement.getContext('2d');
const height = canvasElement.height;
const width = canvasElement.width;
const fileSelectorElement = document.querySelector("input");
fileSelectorElement.addEventListener("change", handleFiles, false);
async function loadModule(moduleBinary) {
    console.log(moduleBinary);
}

function handleFiles() {
    loadModule(this.files[0]);
}
let imageData = new ImageData(width, height);
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
    moveHeadingDistance(heading, distance) {
        this.x = this.x + Math.round(distance * Math.sin(heading));
        this.y = this.y - Math.round(distance * Math.cos(heading));
    }
};

function cssColourFromInteger(intColour) {
    let mask = "#000000";
    let css = intColour.toString(16);
    return mask.substr(0, mask.length - css.length) + css;
}

function toRadians(degrees) {
    return degrees*(Math.PI/180);
}

class PaintBot {
    constructor(name, position, colour, commander) {
        this.state = {
            position: position,
            lastPosition: position,
            heading: 0, // heading is stored in radians
            colour: colour,
            penDown: true,
        }
        this.name = name; //TO DO: bot can be renamed later
        this.wasmExports = commander.exports;   // Exports from Wasm module

        if(this.wasmExports.init) { // check there is an init function
            this.wasmExports.init(
                this.state.position.x, 
                this.state.position.y,
                this.state.colour, 
                width, 
                height
            );
        }
    }
    update(time) {
        this.wasmExports.update(time, this.state.position.x, this.state.position.y);
        this.state.heading = toRadians(this.wasmExports.getHeading());
        this.state.colour = this.wasmExports.getColour();
        this.state.penDown =  this.wasmExports.isPenDown();
        this.state.lineWidth = this.wasmExports.getLineWidth();
        this.state.lastPosition = new Location(this.state.position.x, this.state.position.y);
        if (this.wasmExports.isBotMoving())
        {
            this.state.position.moveHeadingDistance(this.state.heading, 5);
        }
    }
    renderBot() {
        context.save();
        context.translate(this.state.position.x, this.state.position.y);
        context.rotate(this.state.heading);
        //TO DO: allow appearance override
        context.fillStyle = cssColourFromInteger(this.state.colour);
        context.beginPath();
        context.moveTo(0, -10);
        context.lineTo(10,10);
        context.lineTo(-10,10);
        context.fill();
        context.restore();
    }
    renderTrail() {
        if (this.state.penDown)
        {
            context.beginPath();
            context.strokeStyle = cssColourFromInteger(this.state.colour);
            context.lineWidth = this.state.lineWidth;
            context.moveTo(this.state.lastPosition.x, this.state.lastPosition.y);
            context.lineTo(this.state.position.x, this.state.position.y);
            context.stroke();
        }
    }
};

// TO DO maybe an application class

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getRandomColour() {
    return getRandomInt(256*256*256);
    //return new Colour(getRandomInt(256), getRandomInt(256), getRandomInt(256), 255);
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
            // the imports object should be set here, because 
            const { module, instance } = await WebAssembly.instantiateStreaming(fetchPromise);
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

const angleMovements = [0, 0, 45, 90, 135, 180, 225, 280, 315]; 

function update(time) {
    // Clear the context
    context.clearRect(0, 0, width, height);

    // Put the last frame
    context.putImageData(imageData, 0, 0);

    // Update the state and render the trails for each bot
    for(const [idx, bot] of bots.entries()) {
        bot.update(time);
        bot.renderTrail();
    }

    // Take a snaphot of the trail
    imageData = context.getImageData(0, 0, width, height);

    // render the bot
    for(const [idx, bot] of bots.entries()) {
        bot.renderBot();
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
