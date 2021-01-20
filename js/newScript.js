
var canvas = document.getElementById("game"); // canvas and context declarations
var context = canvas.getContext("2d");

//context.font = "30px Arial"
//context.fillText = ("Hello World", 100, 100)

context.font = "30px Arial";

var url = document.location.href;


var playerHealth = 100;
//Animation Stuff

var frames = 6; // Total Frames

var currentFrame = 0; // Current Frame

var initial = new Date().getTime();
var current; // current time


//Image based variables and sources
var playerImage = new Image(); // image declaration 1 for the player, 1 for the npc and 1 for the winning message
var NPCimage = new Image();
var winMessage = new Image();
var loseMessage = new Image();

playerImage.src = "/img/pigsprite.png"; //sources are in the img folder
NPCimage.src = "/img/cake.png";
winMessage.src = "/img/win.png";
loseMessage.src = "/img/lose.png"

var buttonSound = document.getElementById("buttonSound");
var selectBox = document.getElementById('mute');

var direction = 1; // direction is for the direction that the npc is moving 1 is down 2 is up
var winning = false; // bool for win condition 
var losing = false; // bool for losing condition
var muted = false; // bool for muting the sounds of the game


function GameObject(name, image) //function for creating game objects with a name and image 
{
    this.name = name;
    this.image = image;
    this.x = 0; //x position
    this.y = 0; //y position
};



function GamerInput(input)  // function for the players input of arrow keys left, right, up and down
{
    this.action = input;
}

// Default GamerInput is set to None
var gamerInput = new GamerInput("None"); //No Input

var player = new GameObject("player", "playerImage");

var gameobjects = [player, new GameObject("NPC", "NPCimage")];

 gameobjects[0].x = 0; //initial location of the player
 gameobjects[0].y = 0;

 gameobjects[1].x = 850; //initial location of NPC
 gameobjects[1].y = 0;


function input(event) 
{
    if (event.type === "keydown") 
	{
        switch (event.keyCode) 
		{
            case 37:
                gamerInput = new GamerInput("Left");
				
				//console.log("Left")
				gameobjects[0].x -= 5;
				animate();
				
				break; //Left key
            case 38:
                gamerInput = new GamerInput("Up");
				
				//console.log("Up")
				gameobjects[0].y-=5;
				animate();
				
                break; //Up key
            case 39:
                gamerInput = new GamerInput("Right");
				
				//console.log("Right")
				gameobjects[0].x += 5;
				animate();
				
                break; //Right key
            case 40:
                gamerInput = new GamerInput("Down");
				
				//console.log("Down")
				gameobjects[0].y+=5;
				animate();
				
                break; //Down key
            default:
                gamerInput = new GamerInput("None"); //No Input
        }
	}
	else 
	{
        gamerInput = new GamerInput("None"); //No Input
    }
     //console.log("Gamer Input :" + gamerInput.action);
}

document.getElementById("upButton").onmouseup = function() {ButtonUp()};
document.getElementById("downButton").onmouseup = function() {ButtonUp()};
document.getElementById("leftButton").onmouseup = function() {ButtonUp()};
document.getElementById("rightButton").onmouseup = function() {ButtonUp()};


function UpbuttonOnClick() //fucntions for the button clicks 
{
	gamerInput = new GamerInput("Up");
	if(muted === false)
	{
	buttonSound.play();
	}
	
}
function DownbuttonOnClick()
{
	gamerInput = new GamerInput("Down");
	if(muted === false)
	{
	buttonSound.play();
	}
	
}
function LeftbuttonOnClick()
{
	gamerInput = new GamerInput("Left");
	
	if(muted === false)
	{
	buttonSound.play();
	}
	
}
function RightbuttonOnClick()
{
	gamerInput = new GamerInput("Right");
	
	if(muted === false)
	{
	buttonSound.play();
	}
	
}
function ButtonUp()
{
	gamerInput = new GamerInput("None"); // null for if the button isnt being pressed / stopped being pressed
}


function playerMove() // fucntion for moving the player using the buttons on the screen <- ^ > and down
{
	if(gamerInput.action === "Up")
	{
		gameobjects[0].y-=5;
		
		if (gameobjects[0].y <= -10)
		{
			gameobjects[0].y += 5;
		}
	}
	
	if(gamerInput.action === "Down")
	{
		gameobjects[0].y+=5;
		
		if (gameobjects[0].y >= 910)
		{
			gameobjects[0].y -= 5;
		}
	}
	
	if(gamerInput.action === "Left")
	{
		gameobjects[0].x -= 5;
		
		if (gameobjects[0].x <=0)
		{
			gameobjects[0].x += 5;
		}
	}
	
	if(gamerInput.action === "Right")
	{
		gameobjects[0].x += 5;
		if (gameobjects[0].x >= 875)
		{
			gameobjects[0].x -= 5;
		}
	}
	animate();
}

function drawHealthbar() 
{
  var width = 100;
  var height = 20;
  var max = 100;
  var val = playerHealth;

  // Draw the background
  context.fillStyle = "#000000";
  context.clearRect(500, 0, width, height);
  context.fillRect(500, 0, width, height);

  // Draw the fill
  context.fillStyle = "#00FF00";
  var fillVal = Math.min(Math.max(val / max, 0), 1);
  context.fillRect(500, 0, fillVal * width, height);
  
}

function muteSelection() 
{
  var mute = document.getElementById("mute");
  if (mute.checked == true) 
  {
	  muted = true;
    //document.getElementById("HUD").innerHTML = selection + " mute ";
    console.log("volume muted");
  } 
  else 
  {
	  muted = false;
    //document.getElementById("HUD").innerHTML = selection + " selected ";
    console.log("unmuted");
  }
}


function draw()
{
    //console.log("Draw");

	context.fillText("Hello " , 600, 20);
}

function update()
{
	moveObject();
	checkBoundaries();
	playerMove();
    //console.log("Update");
	if(playerHealth > 0 && winning === false)
	{
	playerHealth -= 0.1;
	}
	
	if(playerHealth <= 0 && winning === false)
	{
		losing = true;
	}
	console.log(url);
	
	
	
}

function moveObject() // function for moving the object (NPC)
{
	//console.log("Object Moving");
	if(direction === 1) // if moving down
	{
	gameobjects[1].y+= 5;
	context.drawImage(NPCimage, gameobjects[1].x, gameobjects[1].y); // redrawing image at new location after Y was changed
	}
	else if(direction === 2) // if moving up
	{
	gameobjects[1].y -= 5; 
	context.drawImage(NPCimage, gameobjects[1].x, gameobjects[1].y); // redrawing image at new location again
	}
	
}

function checkBoundaries() // function for checking boundaries
{
	if (gameobjects[1].y >= 900) // bottom of the canvas 
	{
		direction = 2; // setting direction
	}
	
	if (gameobjects[1].y <= 0) // top of the canvas
	{
		direction = 1; // setting direction
	}
	
	
	//checking for win conditions 
	if ( gameobjects[0].y > gameobjects[1].y - 50 && gameobjects[0].y < gameobjects[1].y + 50) //checking if Y is close 
	{
		if ( gameobjects[0].x > gameobjects[1].x - 50 && gameobjects[0].x < gameobjects[1].x + 50) // checking if X is close 
		{
			winning = true; // changing bool
			//console.log("YOU WIN");
		}
	}
	
}

function animate() // animation 
{
	context.clearRect(0, 0, canvas.width, canvas.height); // clearing 
	
	drawHealthbar();
    current = new Date().getTime(); // update current
    if (current - initial >= 150) { // check is greater that 500 ms
        currentFrame = (currentFrame + 1) % frames; // update frame
        initial = current; // reset initial
    } 
	
	// drawing the current frame of the picture
    context.drawImage(playerImage, (playerImage.width / 6) * currentFrame, 0, 128, 128, gameobjects[0].x , gameobjects[0].y, 128, 128); 
	
	//drawing the NPC
	context.drawImage(NPCimage, gameobjects[1].x, gameobjects[1].y); 
	
	//drawing win message only if win condition is met
	if (winning === true)
	{
		context.drawImage(winMessage, 250, 250);
	}
	//drawing lose message only if lose condition is met
	if (losing === true)
	{
		context.drawImage(loseMessage, 250, 250);
	}
	
}

//The main gameloop
function gameloop()
{
    //console.log("Gameloop");
    update();
	animate();
    draw();

	
	GamerInput();
    window.requestAnimationFrame(gameloop);
}


window.requestAnimationFrame(gameloop);

window.addEventListener('keyup', input);
window.addEventListener('keydown', input);