gameRun();

// playing music when speaker icon clicked
const speaker = document.getElementById("speakerIcon");
var music = document.getElementById("music");
var isPlaying = false;

function togglePlay() {
  isPlaying ? music.pause() : music.play();
};

music.onplaying = function() {
  isPlaying = true;
};
music.onpause = function() {
  isPlaying = false;
};

// change speaker icon between on and off (NOT WORKING)
//function speakerChange(){
    //if (speaker.src === "./assets/speakerOn") {
        //speaker.src = "./assets/speakerOff";
    //}
    //else {
        //speaker.src = "./assets/speakerOn"
    //}
//}

function timer(){
    var over = document.getElementById("gameover");
    var timeup = document.getElementById("timeup");
    var replay = document.getElementById("replay");
    var tomenu = document.getElementById("tomenu");
    var sec = 10;
    var timer = setInterval(function(){
        document.getElementById('timerDisplay').innerHTML='00:'+sec;
        sec--;
        if (sec < 0) {
            clearInterval(timer);
            if (over.style.display === "block" || timeup.style.display === "block" || replay.style.display === "block" || tomenu.style.display === "block") {
                over.style.display = "none", timeup.style.display = "none", replay.style.display = "none", tomenu.style.display = "none";
            } else {
                over.style.display = "block", timeup.style.display = "block", replay.style.display = "block", tomenu.style.display = "block";
            }
        }
    }, 1000);
}

function playbutton() {
    var title = document.getElementById("title")
    var play = document.getElementById("play")
    var info = document.getElementById("info")
    var bg = document.getElementById("menuBackground");
    if (title.style.display === "none" || play.style.display === "none"|| info.style.display === "none"|| bg.style.display === "none") {
        title.style.display = "block", play.style.display = "block", info.style.display = "block", bg.style.display = "block";
    } else {
        title.style.display = "none", play.style.display = "none", info.style.display = "none", bg.style.display = "none";
    }
  } 

function infobutton() {
    var back = document.getElementById("back");
    var txt = document.getElementById("infotxt");
    var bg = document.getElementById("infoBackground");
    var paper = document.getElementById("paper");
    var charAni = document.getElementById("charAni");
    paper.play();
    if (bg.style.display === "block" || back.style.display === "block" || txt.style.display === "block" || charAni.style.display === "block" || digAni.style.display === "block") {
      bg.style.display = "none", back.style.display = "none", txt.style.display = "none", charAni.style.display = "none", digAni.style.display = "none";
    } else {
      bg.style.display = "block", back.style.display = "block", txt.style.display = "block", charAni.style.display = "block", digAni.style.display = "block";
    }
  }

function hideend() {
    var over = document.getElementById("gameover");
    var timeup = document.getElementById("timeup");
    var replay = document.getElementById("replay");
    var tomenu = document.getElementById("tomenu");
    if (over.style.display === "none" || timeup.style.display === "none" || replay.style.display === "none" || tomenu.style.display === "none") {
        over.style.display = "block", timeup.style.display = "block", replay.style.display = "block", tomenu.style.display = "block";
    } else {
        over.style.display = "none", timeup.style.display = "none", replay.style.display = "none", tomenu.style.display = "none";
    }
}

function gameRun() {
    // Character Sprite sheet image
    const characterSpriteSheet = new Image();
    characterSpriteSheet.src = "./assets/spritesheet.png";
    characterSpriteSheet.onload = load;

    // Background image
    const backgroundImage = new Image();
    backgroundImage.src = "./assets/desert.jpg";
    backgroundImage.onload = load;

    // set this to the number of elements you want to load before initalising
    const awaitLoadCount = 3;
    let loadCount = 0;

    // time tracking
    let lastTimeStamp = 0;
    let tick = 0;

    // canvas and context, not const as we don't set the value until document ready
    let canvas;
    let ctx;

    // game objects
    let character;

    // run when the website has finished loading
    $('document').ready(function () {
        console.log("ready");
        load();
    });

    // call this function after each loadable element has finished loading.
    // Once all elements are loaded, loadCount threshold will be met to init.
    function load() {
        loadCount++;
        console.log("load " + loadCount);
        if (loadCount >= awaitLoadCount) {
            init();
        }
    }

    // initialise canvas and game elements
    function init() {
        console.log("init");
        canvas = document.getElementById('gamecanvas');
        ctx = canvas.getContext('2d');

        character = Character(
            characterSpriteSheet,
            [540, 540],

            [ // main character set
                [ // walk up track
                    [4320, 0], [2700, 540], [4320, 0], [2160, 540]
                ],
                [ // walk down track 
                    [3780, 0], [3240, 540], [3780, 0], [3240, 0]
                ],
                [ // walk left track
                    [3780, 540], [0, 540], [3780, 540], [540, 540]
                ],
                [ // walk right track 
                    [4320, 540], [1080, 540], [4320, 540], [1620, 540] 
                ],
                [ // dig track 
                    [0, 0], [2160, 0], [4860, 0], [2700, 0]
                ],
            ],
            0.2 // Sprite scaling factor
        );
        character.init();

        // Event listeners
        document.addEventListener("keydown", doKeyDown);
        document.addEventListener("keyup", doKeyUp);

        window.requestAnimationFrame(run);
    }

    // Game loop function
    function run(timeStamp) {
        tick = (timeStamp - lastTimeStamp);
        lastTimeStamp = timeStamp;

        update(tick);
        draw();

        window.requestAnimationFrame(run);
    }

    function checkCharCollision(character) {
        // right wall collision
        if (position.x + character.scaledWidth >= canvas.clientWidth) {
            position.x = canvas.clientWidth;
        }
        // left wall collision
        else if (position.x <= 0) {
            position.x = 0;
        }

        // bottom wall collision
        if (position.y + character.scaledHeight >= canvas.clientHeight) {
            position.y = canvas.clientHeight;
        }
        // top wall collision
        else if (position.y <= 0) {
            position.y = 0;
        }
    }

    function update() {
        //checkCharCollision();
        character.update(tick);
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, 0, 0, 960, 720);
        character.draw(ctx);
        ctx.beginPath();
        ctx.rect(5, 5, 235, 40)
        ctx.lineWidth=10;
        ctx.stroke();
        ctx.fillStyle='rgb(255,255,255)';
        ctx.fill();
    }

    function doKeyDown(e) {
        e.preventDefault();
        if (character != undefined) { character.doKeyInput(e.key, true); }
    }

    function doKeyUp(e) {
        e.preventDefault();
        if (character != undefined) { character.doKeyInput(e.key, false); }
    }

    // Create and return a new Character object.
    // Param: spritesheet = Image object
    // Param: spriteSize = Array of 2 numbers [width, height]
    // Param: spriteFrames = 3D array[Tracks[Frames[Frame X, Y]]]
    // Param: spriteScale = Number to scale sprite size -> canvas size
    function Character(spritesheet, spriteSize, spriteFrames, spriteScale) {
        return {
            spriteSheet: spritesheet,       // image containing the sprites
            spriteFrameSize: spriteSize,    // dimensions of the sprites in the spritesheet
            spriteFrames: spriteFrames,     // 3d array. X = animation track, Y = animation frame, Z = X & Y of frame
            spriteScale: spriteScale,       // amount to scale sprites by (numbers except 1 will be linearly interpolated)
            spriteCanvasSize: spriteSize,   // Calculated size after scale. temp value set, overwritten in init

            animationTrack: 0,              // current animation frame set to use
            animationFrame: 0,              // current frame in animation to draw
            frameTime: 125,                 // milliseconds to wait between animation frame updates
            timeSinceLastFrame: 0,          // track time since the last frame update was performed
            lastAction: "",                 // Last user input action performed

            position: [480, 360],           // position of the character (X, Y)
            direction: [0, 0],              // X and Y axis movement amount
            velocity: 0.2,                  // rate of position change for each axis

            // Initialise variables that cannot be calculated during
            // object creation.
            init() {
                console.log("init");
                // Apply scale multiplier to sprite frame dimensions
                this.spriteCanvasSize = [
                    this.spriteFrameSize[0] * this.spriteScale,
                    this.spriteFrameSize[1] * this.spriteScale
                ];
            },

            // Handle actions for the character to perform.
            // param: action = string of action name.
            action(action) {
                console.log(`action: ${action}. Animation Frame ${this.animationFrame}`);
                // ignore duplicate actions.
                if (action === this.lastAction) return;

                // handle each action type as cases.
                switch (action) {
                    case "moveLeft":
                        this.animationTrack = 2;
                        this.animationFrame = 0;
                        this.direction[0] = -this.velocity;
                        break;
                    case "moveRight":
                        this.animationTrack = 3;
                        this.animationFrame = 0;
                        this.direction[0] = this.velocity;
                        break;
                    case "moveUp":
                        this.animationTrack = 0;
                        this.animationFrame = 0;
                        this.direction[1] = -this.velocity;
                        break;
                    case "moveDown":
                        this.animationTrack = 1;
                        this.animationFrame = 0;
                        this.direction[1] = this.velocity;
                        break;
                    case "dig":
                        this.animationTrack = 4;
                        this.animationFrame = 0;
                        break;
                    case "noMoveHorizontal":
                        this.direction[0] = 0;
                        this.animationFrame = 0;
                        break;
                    case "noMoveVertical":
                        this.direction[1] = 0;
                        this.animationFrame = 0;
                        break;
                    default:
                        this.direction = [0, 0];
                        break;
                }

                // keep track of last action to avoid reinitialising the current action.
                this.lastAction = action;
            },

            update(tick) {
                // increase time keeper by last update delta
                this.timeSinceLastFrame += tick;
                // check if time since last frame meets threshold for new frame
                if (this.timeSinceLastFrame >= this.frameTime) {
                    // reset frame time keeper
                    this.timeSinceLastFrame = 0;

                    // update frame to next frame on the track. 
                    // Modulo wraps the frames from last frame to first.
                    if (this.direction[0] !== 0 || this.direction[1] !== 0) {
                        this.animationFrame = (this.animationFrame + 1) % this.spriteFrames[this.animationTrack].length;
                    }
                    else if (this.action === "dig") {
                        this.animationFrame = (this.animationFrame + 1) % this.spriteFrames[this.animationTrack].length;
                    }
                }

                // Calculate how much movement to perform based on how long
                // it has been since the last position update.
                this.position[0] += this.direction[0] * tick;
                this.position[1] += this.direction[1] * tick;
            },

            // Draw character elements using the passed context (canvas).
            // Param: context = canvas 2D context.
            draw(context) {
                context.drawImage(
                    this.spriteSheet,
                    this.spriteFrames[this.animationTrack][this.animationFrame][0],
                    this.spriteFrames[this.animationTrack][this.animationFrame][1],
                    this.spriteFrameSize[0],
                    this.spriteFrameSize[1],
                    this.position[0],
                    this.position[1],
                    this.spriteCanvasSize[0],
                    this.spriteCanvasSize[1]
                );
            },

            // Handle input from keyboard for the character.
            // Param: e = event key string.
            // Param: isKeyDown = boolean, true = key pressed, false = key released
            doKeyInput(e, isKeydown = true) {
                switch (e) {
                    case "w":
                        if (isKeydown) this.action("moveUp");
                        else this.action("noMoveVertical");
                        break;
                    case "a":
                        if (isKeydown) this.action("moveLeft");
                        else this.action("noMoveHorizontal");
                        break;
                    case "s":
                        if (isKeydown) this.action("moveDown");
                        else this.action("noMoveVertical");
                        break;
                    case "d":
                        if (isKeydown) this.action("moveRight");
                        else this.action("noMoveHorizontal");
                        break;
                    case " ":
                        if (isKeydown) this.action("dig");
                        break;
                    default:
                        if (!isKeydown) this.action("stop");
                        break;
                }
            }
        };
    }
};

function wormLogic() {
    let canvas = document.getElementById("gamecanvas");
    let context = canvas.getContext('2d');

    let squaresize = 100;
    let squares = new Array();

    window.requestAnimationFrame(gameLoop);

    function update(secondsPassed) {
        checkCollisions();
        for (var i = 0; i < squares.length; i++) {
            (squares[i]).update(secondsPassed);
        }
    }

    function draw() {
        context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

        for (var i = 0; i < squares.length; i++) {
            squares[i].draw(context);
        }

        for (var i = 0; i < circles.length; i++) {
            circles[i].draw(context);
        }
    }

    function doMouseDown(event) {
        console.log(this);
        switch (event.button) {
            case 0:
                squares.push(
                    new Square(
                        null,
                        getX(event),
                        getY(event),
                        getRandomInRange(-50, 50),
                        getRandomInRange(-50, 50),
                        squaresize,
                        squaresize
                    )
                )
                console.log(squares);
                break;

            default:
                circles.push(
                    new Circle(
                        null,
                        getX(event),
                        getY(event),
                        getRandomInRange(-50, 50),
                        getRandomInRange(-50, 50),
                        squaresize / 2
                    )
                )
                break;
        }
    }

    function checkCollisions() {
        for (var i = 0; i < squares.length; i++) {
            // for each square, check the wall overlaps
            checkWallCollisions(squares[i]);
            // for each square, check for overlaps with other squares
            checkObjectCollisions(squares[i], i);
        }

        // for (var i = 0; i < circles.length; i++) {
        //     // for each square, check the wall overlaps
        //     checkWallCollisions(circles[i]);
        //     // for each square, check for overlaps with other squares
        //     checkObjectCollisions(circles[i], i);
        // }

    }

    function checkWallCollisions(object) {
        
        
        // check right and left wall overlap
        if (object.getRight() >= canvas.clientWidth) {
            object.vx = -object.vx;
            object.x = canvas.clientWidth - object.width - 1;
        }
        else if (object.x <= 0) {
            object.vx = -object.vx;
            object.x = 1;
        }

        // check bottom and top wall overlap
        if (object.getBottom() >= canvas.clientHeight) {
            object.vy = -object.vy;
            object.y = canvas.clientHeight - object.height - 1;;
        }
        else if (object.y <= 0) {
            object.vy = -object.vy;
            object.y = 1;
        }
    }

    function checkObjectCollisions(object, index) {
        // check parameter square against all other squares
        for (let i = 0; i < squares.length; i++) {
            if (object !== squares[i]) {
                let isCol = rectIntersect(
                    object.x,
                    object.y,
                    object.width,
                    object.height,
                    squares[i].x,
                    squares[i].y,
                    squares[i].width,
                    squares[i].height
                );
                object.isColliding = isCol;
                if (isCol) {
                    (squares[i]).isColliding = isCol;
                    break;
                }
            }
        }

        // check parameter square against all other squares
        for (let i = 0; i < circles.length; i++) {
            if (object !== circles[i]) {
                let isCol = circleIntersect(
                    object.x,
                    object.y,
                    object.width,
                    squares[i].x,
                    squares[i].y,
                    squares[i].width
                );
                object.isColliding = isCol;
                if (isCol) {
                    (squares[i]).isColliding = isCol;
                    break;
                }
            }
        }
    }

    function rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
        // Check x and y for overlap
        if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2) {
            return false;
        }
        return true;
    }

    function circleIntersect(x1, y1, r1, x2, y2, r2) {
        const distanceX = x1 - x2;
        const distanceY = y1 - y2;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        if (distance < r1 + r2) {
            return true;
        }
        return false;
    }

    function getX(event) {
        var rect = canvas.getBoundingClientRect();
        return event.clientX - rect.left;
    }

    function getY(event) {
        var rect = canvas.getBoundingClientRect();
        return event.clientY - rect.top;
    }

    function getRandomInRange(min, max) {
        return Math.random() * (Math.abs(min) + max) + min;
    }
}

class GameObject
{
    constructor (context, x, y, vx, vy, width, height){
        this.context = context;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.width = width;
        this.height = height;

        this.isColliding = false;

        this.draw = this.draw.bind(this);
        this.update = this.update.bind(this);
        this.getRight = this.getRight.bind(this);
        this.getBottom = this.getBottom.bind(this);
        this.setVelocity = this.setVelocity.bind(this);
        this.offsetVelocity = this.offsetVelocity.bind(this);
    }
    getRight(){
        return (this.x + this.width);
    }

    getBottom(){
        return (this.y + this.height);
    }

    draw(context){};
    update(secondsPassed){};
}

class Square extends GameObject
{
    constructor (context, x, y, vx, vy, width, height){
        super(context, x, y, vx, vy);

        // Set default width and height
        this.width = width;
        this.height = height;

        this.draw = this.draw.bind(this);
        this.update = this.update.bind(this);
        this.setVelocity = this.setVelocity.bind(this);
        this.offsetVelocity = this.offsetVelocity.bind(this);
    }

    draw(ctx){
        super.draw(ctx);
        // Draw a simple square
        ctx.fillStyle = this.isColliding?'#ff8080':'#0099b0';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update(secondsPassed){
        super.update(secondsPassed);
        // Move with set velocity
        this.x += this.vx * secondsPassed;
        this.y += this.vy * secondsPassed;
        //console.log(this.x + ", " + this.y);
    }

    setVelocity(vx, vy){
        this.vx = vx;
        this.vy = vy;
    }

    offsetVelocity(vx, vy){
        this.vx += vx;
        this.vy += vy;
    }
}

class Circle extends GameObject
{
    constructor (context, x, y, vx, vy, radius){
        super(context, x, y, vx, vy);

        // Set default width and height
        this.radius = radius

        this.draw = this.draw.bind(this);
        this.update = this.update.bind(this);
        this.setVelocity = this.setVelocity.bind(this);
        this.offsetVelocity = this.offsetVelocity.bind(this);
    }

    draw(ctx){
        super.draw(ctx);
        // Draw a simple circle
        ctx.fillStyle = this.isColliding?'#ff8080':'#0099b0';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    update(secondsPassed){
        super.update(secondsPassed);
        // Move with set velocity
        this.x += this.vx * secondsPassed;
        this.y += this.vy * secondsPassed;
        //console.log(this.x + ", " + this.y);
    }

    setVelocity(vx, vy){
        this.vx = vx;
        this.vy = vy;
    }

    offsetVelocity(vx, vy){
        this.vx += vx;
        this.vy += vy;
    }
}