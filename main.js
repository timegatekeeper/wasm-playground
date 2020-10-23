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
    moveHeadingDistance(heading, distance) {
        this.x = this.x + Math.floor(distance * Math.sin(heading));
        this.y = this.y - Math.floor(distance * Math.cos(heading));
    }
};

/*class Colour {
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
        return this.red + (this.green*256) + (this.blue*256*256);
    }
    fromInteger(intColour) {
        //alpha is fixed
        this.red = intColour % 256;
    }
}*/

function cssColourFromInteger(intColour) {
    let mask = "#000000";
    let css = intColour.toString(16);
    return mask.substr(0, mask.length - css.length) + css;
}

function toRadians(degrees) {
    return degrees*(Math.PI/180);
}

class PaintTrail {
    constructor(startingLocation, colour) {
        this.start = startingLocation;
        this.colour = colour;
        this.points = [];
    }
    add(location) {
        this.points.push(location);
    }
    render()
    {
        context.beginPath();
        context.moveTo(this.start.x, this.start.y);
        context.strokeStyle = cssColourFromInteger(this.colour);
        for(const [idx, point] of this.points.entries()) {
            context.lineTo(point.x, point.y);
            //console.log(point.x,",",point.y);
        }
        context.stroke();
        context.closePath();
    }
}

class PaintBot {
    constructor(name, position, colour, commander) {
        //TO DO: bot can be renamed later
        this.name = name;
        this.position = position;
        this.colour = colour;
        this.commander = commander;
        //heading is stored in radians
        this.heading = 0;
        if(this.commander.exports.init) {
            this.commander.exports.init(position.x, position.y,
                 this.colour, width, height);
        }
        this.paintTrails = [new PaintTrail(new Location(this.position.x, this.position.y), this.colour)];
    }
    update(time) {
        const wasmExports = this.commander.exports; 
        let direction = wasmExports.update(time, this.position.x, this.position.y);
        this.heading = toRadians(angleMovements[direction]);
        let wasmColour = wasmExports.getColour();
        if(this.colour != wasmColour){
            console.log(this.name, "colour change from",
             cssColourFromInteger(this.colour), "to",
             cssColourFromInteger(wasmColour));
            this.colour = wasmColour;
            this.paintTrails.push(new PaintTrail(
                new Location(this.position.x, this.position.y), this.colour));
        }   
        this.forward(5)
        this.render();
    }
    forward(distance) {
        this.position.moveHeadingDistance(this.heading, distance);
        this.paintTrails[this.paintTrails.length-1].add(new Location(this.position.x, this.position.y));
    }
    render() {
        context.save();
        context.translate(this.position.x, this.position.y);
        context.rotate(this.heading);
        //TO DO: allow appearance override
        context.fillStyle = cssColourFromInteger(this.colour);
        context.beginPath();
        context.moveTo(0, -10);
        context.lineTo(10,10);
        context.lineTo(-10,10);
        context.fill();
        context.restore();
        for(const [idx, trail] of this.paintTrails.entries()) {
            trail.render();
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

const angleMovements = [0, 0, 45, 90, 135, 180, 225, 270, 315]; 

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
