// TODO: Save burnSpeed, ticks, time, dayName

var width = 800;
var height = 350;

var FPS = 60;

var ticks = 0;
var time = 0;
var days = ['Day of New Beginnings'];
var weekprog = 0;
var dayName = 'Day of New Beginnings';

var burnSpeed = 350;
var burnedBushes = 0;

var thoughtOccurences = 800;

var hourLength = 64;
var dayLength = 12;

var bushes = [];
var bricks = [];
var doors = [];

var canvas = document.createElement('canvas');
canvas.width = width;
canvas.height = height;

var ctx = canvas.getContext('2d');

var FALL_SPEED = 10;

var mode = 'default';

// BUILD PAGE ELEMENTS:
document.body.style.background = 'black';
document.body.style.paddingTop = '25px';
document.body.style.paddingLeft = '25px';
document.body.style.color = 'white';
document.body.style.fontFamily = 'Courier New';
document.body.style.fontWeight = 'light';
document.body.style.fontSize = '12px';

var title = document.createElement('p');
title.innerText = 'Bush Game. Don\'t press [k] if you don\'t know what it does.';
document.body.appendChild(title);

document.body.appendChild(canvas);

var saveButton = document.createElement('button');
saveButton.style.display = 'block';
saveButton.innerText = 'Save';
saveButton.onclick = function() {
  saveOutput.value = JSON.stringify(bushes) + '__' +
                     JSON.stringify(bricks) + '__' +
                     JSON.stringify(doors);
}
document.body.appendChild(saveButton);

var loadButton = document.createElement('button');
loadButton.innerText = 'Load';
loadButton.onclick = function() {
  var data = saveOutput.value.split('__');
  var bushesData = data[0];
  var bricksData = data[1];
  var doorsData  = data[2];

  bushes = JSON.parse(bushesData);
  bricks = JSON.parse(bricksData);
  doors = JSON.parse(doorsData);
}
document.body.appendChild(loadButton);

// bushes planted: X
var bushCountTextContainer = document.createElement('p');
bushCountTextContainer.innerText = 'Bushes planted: ';
var bushCountText = document.createElement('span');
bushCountText.innerText = '0';
bushCountTextContainer.appendChild(bushCountText);
document.body.appendChild(bushCountTextContainer);

// time: X
var clockTextContainer = document.createElement('p');
clockTextContainer.innerText = 'Time: ';
var clockText = document.createElement('span');
clockText.innerText = time;
clockTextContainer.appendChild(clockText);
document.body.appendChild(clockTextContainer);

var thoughtText = document.createElement('p');
thoughtText.style.display = 'block';
thoughtText.innerText = 'You notice you are alone in the world.';
document.body.appendChild(thoughtText);

var instructionText = document.createElement('p');
instructionText.style.display = 'none';
document.body.appendChild(instructionText);

var saveOutput = document.createElement('textarea');
document.body.appendChild(saveOutput);
// END BUILDING PAGE ELEMENTS

var DefaultBush = {
  width: 10,
  height: 10,
  isBurning: false,
};

var openDoorHeight = 5;
var closedDoorHeight = 10;
var DefaultDoor = {
  open: false,
  width: 10,
  height: closedDoorHeight,
}

var Player = {
  width: 10,
  height: 10,
  x: width / 2,
  y: height - 10,
  color: '#591e51'
};

// ===== DRAW FUNCTIONS =====
// These draw____() functions should never be called
// outside of the 'master' draw() function, since the
// master is always being called and therefore manages
// all the graphic work.
function drawSky() {
  ctx.fillStyle = '#98def5';
  ctx.fillRect(0, 0, width, height);
}

function drawPlayer() {
  ctx.fillStyle = Player.color;
  ctx.fillRect(Player.x, Player.y, Player.width, Player.height);
}

function drawBushes() {
  for (var i = 0; i < bushes.length; i++) {
    var bush = bushes[i];
    if (bush.isBurning) {
      ctx.fillStyle = 'red';
    } else {
      ctx.fillStyle = 'forestgreen';
    }
    ctx.fillRect(bush.x, bush.y, bush.width, bush.height);
  }
}

function drawBricks() {
  for (var i = 0; i < bricks.length; i++) {
    var brick = bricks[i];
    ctx.fillStyle = '#E0D0B6';
    ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
  }
}

function drawDoors() {
  for (var i = 0; i < doors.length; i++) {
    var door = doors[i];
    ctx.fillStyle = '#d49090';
    ctx.fillRect(door.x, door.y, door.width, door.height);
  }
}

function draw() {
  drawSky();
  drawBricks();
  drawBushes();
  drawDoors();
  drawPlayer();
}

// ===== BUSH POSITIONING FUNCTIONS =====
function bushPresent(customX, customY) {
  var maybeExistantBush = DefaultBush;
  maybeExistantBush.x = customX || Player.x;
  maybeExistantBush.y = customY || Player.y;

  for (var i = 0; i < bushes.length; i++) {
    var bush = bushes[i];
    if (bush.x === maybeExistantBush.x &&
        bush.y === maybeExistantBush.y) {
      return true;
    }
  }

  return false;
}

function doorPresent(customX, customY) {
  var maybeExistantDoor = DefaultDoor;
  maybeExistantDoor.x = customX || Player.x;
  maybeExistantDoor.y = customY || Player.y;

  for (var i = 0; i < doors.length; i++) {
    var door = doors[i];
    if (door.x === maybeExistantDoor.x &&
        door.y === maybeExistantDoor.y) {
      return true;
    }
  }

  return false;
}

function playerIsAboveBush() {
  return bushPresent(Player.x, Player.y + DefaultBush.height);
}

function climbBush() {
  if (bushPresent()) {
    Player.y -= Player.height;
  }
}

function bushNextToPlayer(direction, isUpward) {
  isUpward = isUpward || false;

  var maybeExistantBush = DefaultBush;
  maybeExistantBush.y = Player.y;

  if (isUpward) {
    maybeExistantBush.y = Player.y - Player.height;
  }

  if (direction === 'right') {
    maybeExistantBush.x = Player.x + DefaultBush.width;
  }

  else if (direction === 'left') {
    maybeExistantBush.x = Player.x - DefaultBush.width;
  }

  for (var i = 0; i < bushes.length; i++) {
    if (JSON.stringify(bushes[i]) == JSON.stringify(maybeExistantBush)) {
      return true;
    }
  }

  return false;
}

function closedDoorNextToPlayer(direction) {
  var x;
  if (direction === 'right') {
    var x = Player.x + Player.width;
  } else if (direction === 'left') {
    var x = Player.x - Player.width;
  }

  var y = Player.y;
  for (var i = 0; i < doors.length; i++) {
    var door = doors[i];
    if (door.x === x && door.y === y && !door.open) {
      return true;
    }
  }

  return false;
}

function playerIsGrounded() {
  if (bushPresent() ||
      playerIsAboveBush() ||
      Player.y === height - Player.height) {
    return true;
  }

  return false;
}

function bushDiagonallyUpwards(direction) {
  return bushNextToPlayer(direction, true);
}

function getBushIndex(x, y) {
  var maybeExistantBush = DefaultBush;
  maybeExistantBush.x = x;
  maybeExistantBush.y = y;

  for (var i = 0; i < bushes.length; i++) {
    if (JSON.stringify(bushes[i]) == JSON.stringify(maybeExistantBush)) {
      return i;
    }
  }

  return -1;
}

// ===== PLANTING / BUILDING FUNCTIONS =====
function placeBush(customX, customY) {
  var bushX = customX || Player.x;
  var bushY = customY || Player.y;

  if (!bushPresent(customX, customY)) {
    bushes.push({
      width: 10,
      height: 10,
      isBurning: false,
      x: bushX,
      y: bushY
    });
  } else {
    thoughtText.innerText = 'You tried to plant a bush, ' +
      'but there was already one there.';
  }

  Player.y -= Player.height;
}

function placeBrick() {
  bricks.push({
    width: 10,
    height: 10,
    x: Player.x,
    y: Player.y
  });
}

function placeDoor() {
  if (!doorPresent(Player.x, Player.y)) {
    doors.push({
      open: DefaultDoor.open,
      width: DefaultDoor.width,
      height: DefaultDoor.height,
      x: Player.x,
      y: Player.y
    });
  } else {
    thoughtText.innerText = 'You tried to make a door, ' +
      'but there was already one there.';
  }
}

function burnBush(index) {
  bushes[index].isBurning = true;
  setTimeout(function() {
    bushes.splice(index, 1);
  }, burnSpeed);
  burnedBushes++;
  if (burnedBushes % 7 === 0) {
    thoughtText.innerText = 'You noticed that your burning ability increased.';
    burnSpeed -= 50;
  }
}

function startPlantDownMode() {
  mode = 'plantDown';
  instructionText.innerText = 'Choose planting direction [ leftright ]';
  instructionText.style.display = 'block';
}

function stopPlantDownMode(success) {
  if (success) {
    mode = 'default';
    instructionText.style.display = 'none';
  } else {
    mode = 'default';
    instructionText.innerText =
      'Invalid key. Leaving downward planting mode...';
    setTimeout(function() {
      instructionText.style.display = 'none';
    }, 1500);
  }
}

function startBurnMode() {
  mode = 'burn';
  instructionText.innerText = 'Choose burning direction [ updownleftright ]';
  instructionText.style.display = 'block';
}

function stopBurnMode(success) {
  if (success) {
    mode = 'default';
    instructionText.style.display = 'none';
  } else {
    mode = 'default';
    instructionText.innerText =
      'Invalid key. Leaving burning mode...';
    setTimeout(function() {
      instructionText.style.display = 'none';
    }, 1500);
  }
}

// ===== PLAYER FUNCTIONS =====
function walkPlayer(direction) {
  if (closedDoorNextToPlayer(direction)) {
    return;
  }

  if (direction === 'right') {
    if (!bushNextToPlayer('right')) {
      if (Player.x < width - Player.width) Player.x += Player.width;
    } else if (!bushDiagonallyUpwards('right')) {
      Player.x += Player.width;
      Player.y -= Player.height;
    }
  } else if (direction === 'left') {
    if (!bushNextToPlayer('left') && !closedDoorNextToPlayer('left')) {
      if (Player.x > 0) Player.x -= Player.width;
    } else if (!bushDiagonallyUpwards('left')) {
      Player.x -= Player.width;
      Player.y -= Player.height;
    }
  }
}

function randomThought() {
  var options = [
    'You think about your past lives.',
    'You notice that the sky is always blue.',
    'You think about pessimism and optimism.',
    'You look at your creations and think about evolution.',
    'You wish you had art in your life.',
    'You notice you have no friends.',
    'You notice that you are your own companion.',
    'You look at your creations and think about intelligence.',
    'You pray.',
    'You pray, but you do not know who you are praying to.',
    'You notice that things look very similar this close-up.',
    'You look for your hands, but you can\'t find them.',
    'You look at your creations and think about immutability.',
    'You look at your creations and think about true love.',
    'You think about jokes.',
    'You laugh, but you don\'t know what you\'re laughing at.',
  ];

  var index = Math.floor(Math.random() * (options.length - 1));
  thoughtText.innerText = options[index];
}

// ===== GAME LOGIC FUNCTIONS =====
function update() {
  if (!playerIsGrounded()) {
    Player.y += FALL_SPEED;
  }

  ticks++;
  if (ticks % hourLength === 0) {
    time++;
    if (time === dayLength+1) {
      time = 0;
      weekprog=(weekprog+1)%7;
      console.log(days.length);
      if (days.length < 7) {
        dayName = 'Day of ' + generateDayName();
        days.push(dayName);
      }else{
        dayName = days[weekprog];
      }
      
    }
  }
  if (ticks % thoughtOccurences == 0) {
    randomThought();
  }

  bushCountText.innerText = bushes.length;
  clockText.innerText = time + ', ' + dayName;
}

function handleModifiedKey(keyCode) {
  if (mode === 'plantDown') {
    switch (keyCode) {
      case 37: // left
        placeBush(Player.x - Player.width, Player.y + Player.height);
        stopPlantDownMode(true);
        break;
      case 39: // right
        placeBush(Player.x + Player.width, Player.y + Player.height);
        stopPlantDownMode(true);
        break;
      default:
        stopPlantDownMode(false);
        break;
    }
  }

  if (mode === 'burn') {
    var bushIndex;

    switch (keyCode) {
      case 37: // left
        bushIndex = getBushIndex(Player.x - Player.width, Player.y);
        burnBush(bushIndex);
        stopBurnMode(true);
        break;
      case 39: // right
        bushIndex = getBushIndex(Player.x + Player.width, Player.y);
        burnBush(bushIndex);
        stopBurnMode(true);
        break;
      case 38: // up
        bushIndex = getBushIndex(Player.x, Player.y - Player.height);
        burnBush(bushIndex);
        stopBurnMode(true);
        break;
      case 40: // down
        bushIndex = getBushIndex(Player.x, Player.y + Player.height);
        burnBush(bushIndex);
        stopBurnMode(true);
        break;
      default:
        stopBurnMode(false);
        break;
    }
  }
}

function keydown(event) {
  if (mode === 'default') {
    if (event.keyCode === 37) { // left
      walkPlayer('left');
    } else if (event.keyCode === 39) { // right
      walkPlayer('right');
    } else if (event.keyCode === 32) { // spacebar
      placeBush();
    } else if (event.keyCode === 66) { // b
      placeBrick();
    } else if (event.keyCode === 90) { // z
      placeDoor();
    } else if (event.keyCode === 38) { // up
      if (bushPresent()) {
        climbBush();
      } else {
        Player.y -= Player.height * 4;
      }
    } else if (event.keyCode === 75) { // k
      bushes = [];
      bricks = [];
    } else if (event.keyCode === 81) { // q
      openDoor();
    } else if (event.keyCode === 40) { // down
      startPlantDownMode();
    } else if (event.keyCode === 88) { // x
      startBurnMode();
    } else {
      console.log('unsupported key: ' + event.keyCode);
    }
  } else /* if not defaultMode */ {
    handleModifiedKey(event.keyCode);
  }
}

window.addEventListener('keydown', keydown);

setInterval(function () {
  update();
  draw();
}, 1000 / FPS);

// ===== MISCELLANEOUS FUNCTIONS =====
function getDoorIndexFromPosition(x, y) {
  for (var i = 0; i < doors.length; i++) {
    var door = doors[i];
    if (door.x === x && door.y === y) {
      return i;
    }
  }

  return -1;
}

function openDoor() {
  var i = getDoorIndexFromPosition(Player.x + Player.width, Player.y);

  if (i === -1) {
    i = getDoorIndexFromPosition(Player.x - Player.width, Player.y);
  }

  if (i === -1) {
    return;
  }

  if (doors[i].open) {
    doors[i].open = false;
    doors[i].height = closedDoorHeight;
  } else {
    doors[i].open = true;
    doors[i].height = openDoorHeight;
  }
}

function generateDayName() {
  var capitals = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var lowercase = 'abcdefghijklmnopqrstuvwxyz';

  var name = ''
  var length = Math.floor(Math.random() * (15 - 8)) + 7;
  var accentIndex = Math.floor(Math.random() * (6 - 5)) + 4;

  var j = Math.floor(Math.random() * (lowercase.length - 1));
  name += capitals[j];

  for (var i = 0; i < length; i++) {
    j = Math.floor(Math.random() * (lowercase.length - 1));

    if (i === accentIndex) {
      name += '\'';
    } else {
      name += lowercase[j];
    }
  }

  return name;
}
