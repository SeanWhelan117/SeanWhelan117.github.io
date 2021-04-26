var canvas = document.getElementById("game"); // canvas and context declarations
var context = canvas.getContext("2d");

//animation stuff
var initial = new Date().getTime();
var current; // current time

var frames = 6; // Total Frames

var currentFrame = 0; // Current Frame

var borderImageGreen = new Image();
borderImageGreen.src = "img/greenBorder.png";

var borderImageRed = new Image();
borderImageRed.src = "img/redBorder.png";

//player stuff
var playerIdleImage = new Image();
playerIdleImage.src = "img/playerSpriteIdle.png";

var playerWalkingImage = new Image(); // image declaration 1 for the player, 1 for the npc and 1 for the winning message
var playerHealth = 100;
playerWalkingImage.src = "img/playerSpriteWalking.png"; //sources are in the img folder

var buttonClick = "";

//enemy stuff
var enemyIdleImage = new Image();
enemyIdleImage.src = "img/EnemySpriteIdle.png";

var enemyWalkingImage = new Image();
var enemyHealth = 100;
enemyWalkingImage.src = "img/enemySpriteWalking.png";

var randEnemyChoice = 0;
var playersTurn = true;

var choiceBeingActed = false;
var enemyChoiceBeingActed = false;

//win / loss screen 

var winScreenImage = new Image();
winScreenImage.src = "img/YouWinScreen.png"
var youWon = false;

var loseScreenImage = new Image();
loseScreenImage.src = "img/YouLoseScreen.png"
var youLost = false;

//ranged attack 

var rangedAttackImage = new Image();
rangedAttackImage.src = "img/lightning.png"
var rangedX = 220;
var lightningX = 300;

//enemies ranged attack
var enemyRangedAttackImage = new Image();
enemyRangedAttackImage.src = "img/lightning2.png"
var enemyRangedX = 1600;
var enemyLightningX = 300;

//initialising the current actions of player and enemy to Idle at the start of the game
var currentAction = "Idle";
var currentEnemyAction = "Idle";

context.font = "50px Arial";
//context.textAlign = "center";


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function GameObject(name, image) //function for creating game objects with a name and image 
{
    this.name = name;
    this.image = image;
    this.x = 0; //x position
    this.y = 0; //y position
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function GamerInput(input)  // function for the players input of arrow keys left, right, up and down
{
    this.action = input;
}

var gamerInput = new GamerInput("None"); //No Input

var player = new GameObject("player", "playerImage");
var enemy = new GameObject("enemy", "enemyImage");

var gameobjects = [player, enemy];

 gameobjects[0].x = 50; //initial location of the player
 gameobjects[0].y = 700;

 gameobjects[1].x = 1650;
 gameobjects[1].y = 700;

 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 function drawHealthbars() 
 {
   var width = 300;
   var height = 50;
   var max = 100;
   var val = playerHealth;
   var val2 = enemyHealth;
 
   // Draw the background
   context.fillStyle = "#000000";
   context.clearRect(25, 25, width, height);
   context.fillRect(25, 25, width, height);
 
   // Draw the fill
   context.fillStyle = "#00FF00";
   var fillVal = Math.min(Math.max(val / max, 0), 1);
   context.fillRect(25, 25, fillVal * width, height);

    // Draw the background
    context.fillStyle = "#000000";
    context.clearRect(1650, 25, width, height);
    context.fillRect(1650, 25, width, height);

    context.fillStyle = "#f10202";
   var fillVal2 = Math.min(Math.max(val2 / max, 0), 1);
   context.fillRect(1650, 25, fillVal2 * width, height);
 }

 document.getElementById("upButton").onmouseup = function() {ButtonUp()};
 document.getElementById("downButton").onmouseup = function() {ButtonUp()};
 document.getElementById("leftButton").onmouseup = function() {ButtonUp()};
 document.getElementById("rightButton").onmouseup = function() {ButtonUp()};
 
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 function UpbuttonOnClick() //fucntions for the button clicks 
 {
     if(playersTurn === true)
     {
        console.log("Melee clicked")
        buttonClick = "Melee";
     }
    
    
 }

 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 function DownbuttonOnClick()
 {
    if(playersTurn === true && choiceBeingActed === false)
    {
        console.log("Locked in clicked")
        
        if(buttonClick === "Melee")
        {
            choiceBeingActed = true;
            currentAction = "Walking";
            gameobjects[0].x += 1300;
            enemyHealth -= 20;
            setTimeout(movePlayerBack, 5000)
        }

        if(buttonClick === "Range")
        {
            currentAction = "Ranged";
            enemyHealth -= 30;
        }

        if(buttonClick === "Heal")
        {
            playerHealth += 30;
            if(playerHealth > 100)
            {
                playerHealth = 100;
            }
        }
        setTimeout(endPlayersTurn,5000);
       
    }
 }

 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 function LeftbuttonOnClick()
 {
    if(playersTurn === true)
    {
        console.log("Range clicked")
        //gamerInput = new GamerInput("Range");

        buttonClick = "Range";
    }
 }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 function RightbuttonOnClick()
 {
    if(playersTurn === true)
    {
        console.log("Heal clicked")
        //gamerInput = new GamerInput("Heal");

        buttonClick = "Heal";
    }
 }

 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 function ButtonUp()
 {
     gamerInput = new GamerInput("None"); // null for if the button isnt being pressed / stopped being pressed
 }


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 function movePlayerBack()
 {
     console.log("playerMovedBack");
     gameobjects[0].x -= 1300;
     choiceBeingActed = false;

 }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 function moveEnemyBack()
 {
    console.log("EnemyMovedBack");
    gameobjects[1].x += 1300;
    enemyChoiceBeingActed = false;
    currentEnemyAction = "Idle";

 }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 function endPlayersTurn()
 {
    currentAction = "Idle";
    playersTurn = false;
 }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 function draw()
{
    //console.log("Draw");
    
	
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function update()
{
		if(playersTurn === false && enemyChoiceBeingActed === false)
        {
            console.log("enemysTurnCalled");
            enemysTurn();
        }

        if(enemyHealth <= 0)
        {
            console.log("You Win");
            youWon = true;
        }

        if(playerHealth <= 0)
        {
            console.log("You Lose");
            youLost = true;
        }

        while(currentAction === "Ranged")
        {
            rangedX += 4.5;
            lightningX += 10;
            return rangedX;
        }
        rangedX = 220;
        lightningX = 200;

        while(currentEnemyAction === "Ranged")
        {
            enemyRangedX -= 4.5;
            enemyLightningX -= 10;
            return rangedX;
        }

         enemyRangedX = 1600;
         enemyLightningX = 300;
        
	
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function enemysTurn()
{
    randEnemyChoice = Math.floor(Math.random() * 3) + 1;
    if(randEnemyChoice === 1)
    {
        enemyChoiceBeingActed = true;
        currentEnemyAction = "Walking"
        gameobjects[1].x -= 1300;
        playerHealth -= 20;
        setTimeout(moveEnemyBack, 5000)
        console.log("Enemy melee");
    }
    if(randEnemyChoice === 2)
    {
        currentEnemyAction = "Ranged"
        playerHealth -= 30;
        console.log("Enemy ranged");
    }
    if(randEnemyChoice === 3)
    {
        enemyHealth += 30;
        if(enemyHealth > 100)
        {
            enemyHealth = 100;
        }
        console.log("Enemy heals");
    }
    playersTurn = true;
}

//////////////////////////////////////////////////////////////////////////////////////////////
function animate() // animation 
{
	context.clearRect(0, 0, canvas.width, canvas.height); // clearing 

    if(playersTurn === true)
    {
        context.drawImage(borderImageGreen,-50,-20,2100,1050);
    }
    
    if(enemyChoiceBeingActed === true)
    {
        context.drawImage(borderImageRed,-50,-20,2100,1050);
    }
    
    current = new Date().getTime(); // update current
    if (current - initial >= 150) { // check is greater that 500 ms
        currentFrame = (currentFrame + 1) % frames; // update frame
        initial = current; // reset initial
    } 

    if(currentAction === "Walking")
    {
        context.drawImage(playerWalkingImage, (playerWalkingImage.width / 6) * currentFrame, 0, 100, 150, gameobjects[0].x , gameobjects[0].y, 300, 350);

    }
    if(currentEnemyAction === "Walking")
    {
        context.drawImage(enemyWalkingImage, (enemyWalkingImage.width / 6) * currentFrame, 0, 100, 150, gameobjects[1].x , gameobjects[1].y, 300, 350);
    }

    if(currentAction === "Idle")
    {
        context.drawImage(playerIdleImage,gameobjects[0].x , gameobjects[0].y, 200, 250 );
    }

    if(currentEnemyAction === "Idle")
    {
        context.drawImage(enemyIdleImage,gameobjects[1].x , gameobjects[1].y, 200, 250 );
    }

    if(currentAction === "Ranged")
    {
        context.drawImage(playerIdleImage,gameobjects[0].x , gameobjects[0].y, 200, 250 );
        context.drawImage(rangedAttackImage, rangedX,750,lightningX,100);
    }

    if(currentEnemyAction === "Ranged")
    {
        context.drawImage(enemyIdleImage,gameobjects[1].x , gameobjects[1].y, 200, 250 );
        context.drawImage(rangedAttackImage, enemyRangedX, 750, enemyLightningX, 100);
    }


    drawHealthbars();

    //context.draw(currentAction);
    context.fillStyle = "black";

    context.fillText(currentAction, 900, 75); 

    if(youWon === true)
    {
        context.drawImage(winScreenImage,0,0,2000,1000);
    }

    if(youLost === true)
    {
        context.drawImage(loseScreenImage,0,0,2000,1000);
    }
	
}

//The main gameloop//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function gameloop()
{
    //console.log("Gameloop");
    update();
	animate();
    draw();

    window.requestAnimationFrame(gameloop);
}


window.requestAnimationFrame(gameloop);

//  window.addEventListener('keyup', input);
//  window.addEventListener('keydown', input);