var WIDTH = 1920, HEIGHT = 1080, STAR_COUNT = 1500, CONSTELLATION_COUNT = 5;
var MIN_CONSTELLATION_WIDTH = WIDTH * 0.1, MIN_CONSTELLATION_HEIGHT = HEIGHT * 0.2;
var MAX_CONSTELLATION_WIDTH = WIDTH * 0.2, MAX_CONSTELLATION_HEIGHT = HEIGHT * 0.3;
var MAG_BASE = 1, MAG_MULT = 0.15;
var COLORS = {
  sky: "rgb(0,0,100)",
  star: "rgb(255,255,255)"
};

// [0, max)
function makeRandom(min, max) {
  if(max == undefined) {
    max = min;
    min = 0;
  }
  return Math.floor(Math.random() * (max - min)) + min;
}

function createCanvas() {
  var canvas = document.createElement('canvas');
  canvas.setAttribute("height", HEIGHT + "px");
  canvas.setAttribute("width", WIDTH + "px");
  document.body.appendChild(canvas);
  return canvas.getContext('2d');
}

function Star() {
  this.x = makeRandom(WIDTH);
  this.y = makeRandom(HEIGHT);
  this.mag = makeRandom(10);
}

Star.prototype.getColor = function() {
  return COLORS.star;
}

Star.prototype.getSize = function() {
  return this.mag * MAG_MULT + MAG_BASE;
}

Star.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.fillStyle = this.getColor();
  var size = this.getSize();
  ctx.ellipse(this.x, this.y, size, size, 0, 0, 2 * Math.PI);
  ctx.fill();
}

function Constellation() {
  this.x = makeRandom(WIDTH);
  this.y = makeRandom(HEIGHT);
  this.w = makeRandom(MIN_CONSTELLATION_WIDTH, MAX_CONSTELLATION_WIDTH);
  this.h = makeRandom(MIN_CONSTELLATION_HEIGHT, MAX_CONSTELLATION_HEIGHT);
}

Constellation.prototype.draw = function(ctx) {
  ctx.strokeStyle = "rgb(255, 255, 255)";
  ctx.setLineDash([10, 10]);
  ctx.beginPath();
  ctx.rect(this.x, this.y, this.w, this.h);
  ctx.stroke();
}

function drawSky(ctx) {
  ctx.fillStyle = COLORS.sky;
  ctx.fillRect (0, 0, WIDTH, HEIGHT);
}

function makeStars(count) {
  var result = [];
  while(result.length < count) {
    result.push(new Star());
  }

  return result;
}

function makeConstellations(count) {
  var result = [];
  while(result.length < count) {
    result.push(new Constellation());
  }

  return result;
}

//function makeConstellations

function render(ctx, stars, constellations) {
  drawSky(ctx);
  for(var i = 0; i < stars.length; i++) {
    stars[i].draw(ctx);
  }
  for(var i = 0; i < constellations.length; i++) {
    constellations[i].draw(ctx);
  }
}

function run() {
  var ctx = createCanvas();
  var stars = makeStars(STAR_COUNT);
  var constellations = makeConstellations(CONSTELLATION_COUNT, stars);
  render(ctx, stars, constellations);
}

run();
