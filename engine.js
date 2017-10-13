//A simple particle engine using html5 web canvas

canvas = null;

context = null;

particles = [];

REFRESH_RATE_MILLIS = 20;

NUM_OF_PARTICLES = 5000;

RANDOM_SIZES = false;

INITIAL_PARTICLE_SIZE_X = 4;

INITIAL_PARTICLE_SIZE_Y = 4;

mousePosition = {x:0, y:0};

particleColor = "215,27,226";

//Populates the particle array with particles

function populateParticleArray(count){

for(x=0; x<count; x++){

particles.push({

x:40, 

y:50, 

xSize:INITIAL_PARTICLE_SIZE_X, 

ySize:INITIAL_PARTICLE_SIZE_Y, 

xVel:5,

yVel:1,

opacity:1,

fadeRate:0,

color: particleColor

});

}

}

//Gets and sets the canvas and drawing context

function initCanvas(){

canvas = document.getElementById("myCanvas");

context = canvas.getContext("2d");

}

//Draws a rectangle on the canvas

function drawParticle(x, y, sizeX, sizeY, alpha, color){

context.fillStyle = "rgba(" + color + "," + alpha + ")";

context.fillRect(x,y,sizeX,sizeY);

}

//Clears the contents of the canvas

function clearCanvas(){

context.clearRect(0, 0, canvas.width, canvas.height);

}

//Sets the x and y variables of the mousePosition object

function mouseMoveEventHandler(event){

mousePosition.x = event.clientX - 10;

mousePosition.y = event.clientY - 10;

}

function colorPickerChanged(event){

particleColor = convertHex(event.srcElement.value);

}

function convertHex(hex){

hex = hex.replace('#','');

r = parseInt(hex.substring(0,2), 16);

g = parseInt(hex.substring(2,4), 16);

b = parseInt(hex.substring(4,6), 16);

result = r+','+g+','+b;

return result;

}

//Starts the rendering loop

function startRenderLoop(refreshRateMillis){

//Render loop

setInterval(function(){

//Clear the canvas for the next draw cycle

clearCanvas(); 

//Loop through the particle array and draw them

for(x=0;x<particles.length;x++){

var particle = particles[x];

//Updates the particle location

updateParticleLocation(particle);

//Updates the opacity of the particle based on its fade rate

updateParticleOpacity(particle)

//Checks to see if the particle is outside of the canvas. If it is, it is re-spawned

respawnParticleOutsideOfCanvas(particle);

respawnInvisibleParticles(particle);

//Gravity

particle.yVel += 0.0;

//Draw the rectangle on the canvas

drawParticle(particle.x, particle.y, particle.xSize, particle.ySize, particle.opacity, particle.color);

//drawParticle(particle.x, particle.y, particle.xSize, particle.ySize, particle.opacity, randomColor());

}

}, refreshRateMillis);

}

//Move the particle based on its X and Y velocities

function updateParticleLocation(particle){

particle.x += particle.xVel;

particle.y += particle.yVel;

}

//Respawn the particle if it is outside of the canvas

function respawnParticleOutsideOfCanvas(particle){

if(isParticleOutsideOfCanvas(particle)){

respawnParticle(particle);

}

}

//Respawn the particle if it is not visible anymore

function respawnInvisibleParticles(particle){

if(!isParticleVisible(particle)){

respawnParticle(particle);

}

}

//Respawns the provided particle

function respawnParticle(particle){

particle.x = mousePosition.x;

particle.y = mousePosition.y;

particle.xVel = (Math.random() * -5) + 2.5;

particle.yVel = Math.random() * 2.5;

resetParticleOpacity(particle);

//particle.color = particleColor;

particle.color = randomColor();

//particle.xSize = Math.floor(Math.random() * 25);

//particle.ySize = Math.floor(Math.random() * 25);

}

function randomColor(){

var newColor = "";

var r, b, g;

r = Math.floor(Math.random() * 255);

g = Math.floor(Math.random() * 255);

b = Math.floor(Math.random() * 255);

newColor = r + "," + g + "," + b;

return newColor;

}

//Checks to see if the particle is outside of the drawing area

function isParticleOutsideOfCanvas(particle){

if((particle.x > canvas.width || particle.y > canvas.height) || (particle.x < 0 || particle.y < 0)){

return true;

}

else{

return false;

}

}

//Checks to see if the particle is transparent

function isParticleVisible(particle){

if(particle.opacity <= 0){

return false;

}

else{

return true;

}

}

//Updates the particle's opacity based on its fade rate. Used in the render loop

function updateParticleOpacity(particle){

particle.opacity -= particle.fadeRate * 0.01;

}

//Makes the particle visible again

function resetParticleOpacity(particle){

particle.opacity = 1;

}

//Start of program

initCanvas();

populateParticleArray(NUM_OF_PARTICLES);

startRenderLoop(REFRESH_RATE_MILLIS);

