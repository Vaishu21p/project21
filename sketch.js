var background, backgroundImg;
var obstacle, obstacleImg, obstaclesGroup;
var rocket, rocketImg,rocketBlast;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var restart,restartImg
var star,starsGroup,starImg
var points = 0;
var score = 0;

function preload(){
  backgroundImg = loadImage("bg.jpg");
  obstacleImg = loadImage("obstacle.jpg");
  rocketImg = loadImage("rocket.jpg");
starImg = loadImage("star.jpg")
 restartImg = loadImage("restart.jpg") 
}

function setup(){
  createCanvas(600,600);
  background = createSprite(300,300);
  background.addImage("bg",backgroundImg);
  background.velocityY = 3;
  
  obstaclesGroup = new Group();
 starsGroup = new Group();
  
  rocket = createSprite(400,400,50,50);
 rocket.addImage("rocket", rocketImg);

  rocket.scale = 0.1;
restart = createSprite(300,300)
restart.addImage(restartImg)
restart.scale=0.3

}

function draw(){

  if (gameState === "play") {
   restart.visible=false 

   rocket.x = World.mouseX;

    if(background.y > 400){
      background.y = 300
    }
    spawnObstacles();
spawnstar();
    
    if(obstaclesGroup.isTouching(rocket)){
      gameState = "end"
    }
    
 if (starsGroup.isTouching(rocket)){
  starsGroup.destroyEach();
  points=points+10;
 }
 
   
  }
  
  if (gameState === "end"){
    stroke("red");
    fill("red");
    textSize(50);
    text("Game Over", 230,250)
restart.visible = true
obstaclesGroup.destroyEach()
starsGroup.destroyEach()
background.velocityY=0
rocket.x=700
rocket.y=700
  }
 
if(mousePressedOver(restart)){
reset();
}

 drawSprites();
 textSize(20);
 fill(255);
 text("points: "+ points,10,30);
 }


function spawnObstacles() {
 
  if (frameCount % 240 === 0) {
    var obstacle = createSprite(200, -50);
   
    obstacle.x = Math.round(random(120,400));
    
    obstacle.addImage(obstacleImg);
 obstacle.scale=0.3
    
    obstacle.velocityY = 7;


    obstacle.setCollider("circle",0,80,40);
    obstacle.debug =false
    
   
    //assign lifetime to the variable
    obstacle.lifetime = 800;
   

    
    //add each door to the group
    obstaclesGroup.add(obstacle);
   
   
  
  }
} 

function reset(){
  gameState = "play"
background.velocityY=3
  restart.visible = false
rocket.x=400
rocket.y=400
points = 0;
  }
  function spawnstar() {
 
    if (frameCount % 200 === 0) {
      var star = createSprite(200, -50);
     
      star.x = Math.round(random(120,400));
      
      star.addImage(starImg);
   star.scale=0.03
      
      star.velocityY = 3;
  
  
      star.setCollider("circle",0,80,40);
      star.debug = false
      
     
      //assign lifetime to the variable
      star.lifetime = 800;
     
  
      
      //add each door to the group
      starsGroup.add(star);
     
    }}  