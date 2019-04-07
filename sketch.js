var x = 0;
var y = 0;

var tx = 0;
var ty = 0;

var r = 255;
var b = 100;

var tr = 255;
var tb = 100;

var MAX_SIZE = 1000;
var TARGET_MAX_SIZE = 1000;

var acc = 10;

var trailLength = 500;
var trail = [];

var cooldown = 0;

var ellipseMode = true;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	document.body.style.cursor = 'crosshair';
}

function draw() {
	background(0);
	
	var gamepads = navigator.getGamepads();
	
	if (gamepads[0]) {
		
	let input = new ControllerInput(gamepads);
	
	var yInput = input.getAxes()[1];
	var xInput = input.getAxes()[0];
		
	tx += (xInput * acc);
	ty += (yInput * acc);
	
	if (input.AisPressed && cooldown < 0) {
		newColour();
		cooldown = 11
	}
	
		if (input.LisPressed) {
			TARGET_MAX_SIZE += 10;
		}
		
		if (input.RisPressed) {
			TARGET_MAX_SIZE -= 10;
		}
		
		if (input.RisPressed && input.LisPressed) {
			TARGET_MAX_SIZE = 1000;
		}
		
		if (input.ZisPressed) {
			tx = width / 2;
			ty = height / 2
			acc = 10;
			TARGET_MAX_SIZE = 1000;
			ellipseMode = true;
		}
		
		if (input.YisPressed) {
			ellipseMode = false
		}
		
		if (input.XisPressed) {
			ellipseMode = true;
		}
		
		if (input.BisPressed) {
            acc--;
            if (acc < 2) {
                acc = 2;
            }
		}
		
		if (input.CisPressed) {
            acc++;
            if (acc > 100) {
                acc = 100;
            }
		}
		
		cooldown--;
	} else {
        tx = mouseX;
        ty = mouseY;
    }
	
	
	x = lerp(x, tx, 0.01);
    y = lerp(y, ty, 0.01);
    
    r = lerp(r, tr, 0.01);
    b = lerp(b, tb, 0.01);
	
	MAX_SIZE = lerp(MAX_SIZE, TARGET_MAX_SIZE, 0.01)
	
	trail.push(createVector(x, y));
	
	if (trail.length > trailLength) {
			trail.splice(0, 1)
	}
	
	for (var i = 0; i < trail.length; i++) {
		drawPoint(trail[i].x, trail[i].y, i)
	}
	
}

function drawPoint(xpos, ypos, i) {
		noFill();
		let c = map(i, 0, trailLength, 0, 255)
		let o = map(i, 0, trailLength, 0, 75)
		let d = map(i, 0, trailLength, MAX_SIZE, 1)
		stroke(r, c, b, o)
	if (ellipseMode) {
		ellipse(xpos, ypos, d, d)
	} else {
		rectMode(CENTER)
		rect(xpos, ypos, d, d)
	}
}

function newColour(){
	tr = random(255)
    tb = random(255)
}

class ControllerInput {
	constructor(gamepads) {
		this.gamepad = gamepads[0];
		this.buttons = this.gamepad.buttons;
		this.axes = this.gamepad.axes;
	}
	
	getAxes(){
		let x = this.axes[0];
		let y = this.axes[1];
		return [x, y]
	}
	
	getButtonCount(){
		let count = this.buttons.filter(b => b.pressed == true).length;
		console.log(count);
		return count;
	}
	
	get AisPressed(){
			return this.buttons[0].pressed;
	}
	
	get LisPressed(){
			return this.buttons[6].pressed;
	}
	
	get RisPressed(){
			return this.buttons[7].pressed;
	}
	
	get ZisPressed(){
			return this.buttons[5].pressed;
	}
	
	get YisPressed(){
			return this.buttons[4].pressed;
	}
	
	get XisPressed(){
			return this.buttons[3].pressed;
	}
	
	get CisPressed(){
		return this.buttons[2].pressed;
	}
	
	get BisPressed(){
		return this.buttons[1].pressed;
	}
	
	get 
}

window.addEventListener("gamepadconnected", (event) => {
  console.log("A gamepad connected:");
  console.log(event.gamepad);
});

window.addEventListener("gamepaddisconnected", (event) => {
  console.log("A gamepad disconnected:");
  console.log(event.gamepad);
});

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }




