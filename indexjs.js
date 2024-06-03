gameRun();

// playing/stopping music when speaker icon clicked
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

function speakerChange() {
    if (document.getElementById("speakerIcon").src == "./assets/speakerOn.png") {
        document.getElementById("speakerIcon").src = "./assets/speakerOff.png";
    } else {
        document.getElementById("speakerIcon").src = "./assets/speakerOn.png";
    }
}

function timer1m(){
    var over = document.getElementById("gameover");
    var timeup = document.getElementById("timeup");
    var replay = document.getElementById("replay");
    var tomenu = document.getElementById("tomenu");
    var oneMin = document.getElementById("oneminute");
    var threeMin = document.getElementById("threeminute");
    var bing = document.getElementById("bing");
    bing.play();
    var sec = 60;
    if (oneMin.style.display === "none" || threeMin.style.display === "none") {
        oneMin.style.display = "block", threeMin.style.display = "block";
      } else {
        oneMin.style.display = "none", threeMin.style.display = "none";
      }
    var timer = setInterval(function(){
        document.getElementById('timerDisplay1').innerHTML=sec+' seconds';
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

function timer3m(){
    var over = document.getElementById("gameover");
    var timeup = document.getElementById("timeup");
    var replay = document.getElementById("replay");
    var tomenu = document.getElementById("tomenu");
    var oneMin = document.getElementById("oneminute");
    var threeMin = document.getElementById("threeminute");
    var bing = document.getElementById("bing");
    bing.play();
    var sec = 180;
    if (oneMin.style.display === "none" || threeMin.style.display === "none") {
        oneMin.style.display = "block", threeMin.style.display = "block";
      } else {
        oneMin.style.display = "none", threeMin.style.display = "none";
      }
    var timer = setInterval(function(){
        document.getElementById('timerDisplay1').innerHTML=sec+' seconds';
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

function timeSelect() {
    var oneMin = document.getElementById("oneminute");
    var threeMin = document.getElementById("threeminute");
    if (oneMin.style.display === "block" || threeMin.style.display === "block") {
      oneMin.style.display = "none", threeMin.style.display = "none";
    } else {
      oneMin.style.display = "block", threeMin.style.display = "block";
    }
  }

function playbutton() {
    var title = document.getElementById("title");
    var play = document.getElementById("play");
    var info = document.getElementById("info");
    var bg = document.getElementById("menuBackground");
    var bing = document.getElementById("bing");
    bing.play();
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
    var bing = document.getElementById("bing");
    bing.play();
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
                    [0, 0], [2160, 0], [4860, 0]
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

    function checkCharCollision() {
        var thud = document.getElementById("thud")
        // right wall collision
        if (character.position[0] >= 900) {
            thud.play();
            character.position[0] = 900;
        }
        // left wall collision
        else if (character.position[0] <= -40) {
            thud.play();
            character.position[0] = -40;
        }

        // bottom wall collision
        if (character.position[1] >= 640) {
            thud.play();
            character.position[1] = 640;
        }
        // top wall collision
        else if (character.position[1] <= -20) {
            thud.play();
            character.position[1] = -20;
        }
    }

    function update() {
        character.update(tick);
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, 0, 0, 960, 720);
        character.draw(ctx);
        ctx.beginPath();
        ctx.rect(5, 5, 340, 40)
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
                        this.frameTime = 125;
                        this.animationFrame = (this.animationFrame + 1) % this.spriteFrames[this.animationTrack].length;
                    }
                    else if (this.lastAction === "dig") {
                        var counter = 0
                        while (counter < 5) {
                            this.frameTime = 200;
                            this.animationFrame = (this.animationFrame + 1) % this.spriteFrames[this.animationTrack].length;
                            counter += 1;
                        }
                        this.lastAction = "";
                    }
                }

                // Calculate how much movement to perform based on how long
                // it has been since the last position update.
                this.position[0] += this.direction[0] * tick;
                this.position[1] += this.direction[1] * tick;

                checkCharCollision();
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