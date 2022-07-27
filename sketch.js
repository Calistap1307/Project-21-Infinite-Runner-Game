var path,boy,cash,diamonds,gold,sword;
var pathImg,boyImg,cashImg,diamondsImg,goldImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,goldG,swordGroup;
var gameOver, restart;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Path.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamond.png");
  goldImg = loadImage("gold.png");
  swordImg = loadImage("sword.png");
 //write a code to load the image named gameOver.png
 gameOverImg = loadImage("gameOver.png");
 restartImg = loadImage("restart.png")
}

function setup(){
  
  createCanvas(400,600);
// Moving background
  
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 7;


//creating boy running
boy = createSprite(70,580,20,20);
boy.addAnimation("BoyRunning",boyImg);
boy.scale=0.08;


cashG=new Group();
diamondsG=new Group();
goldG=new Group();
swordGroup=new Group();

}

function draw() {

  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createGold();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection +10;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection +25;
      
    }else if( goldG.isTouching(boy)) {
      goldG.destroyEach();
      treasureCollection= treasureCollection +50;
      
    }else{
      if(swordGroup.isTouching(boy)) {
        gameState=END;
       
        gameOver = createSprite(200,300,200,150);
        gameOver.addImage(gameOverImg);
        gameOver.scale = 0.5;

        restart = createSprite(200,300,200,150);
        restart.addImage(restartImg);

        boy.destroy();

        cashG.destroyEach();
        diamondsG.destroyEach();
        goldG.destroyEach();
        swordGroup.destroyEach();
        
        cashG.setVelocityYEach(0);
        diamondsG.setVelocityYEach(0);
        goldG.setVelocityYEach(0);
        swordGroup.setVelocityYEach(0);

        if(mousePressedOver(restart)) {
          reset();
        }
    
         
     
    }
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Fortune: "+ treasureCollection,10,30);
  }

}

function restart(){
  gameState = PLAY;
  treasureCollection = 0;
}

function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createGold() {
  if (World.frameCount % 410 == 0) {
  var  gold = createSprite(Math.round(random(50, 350),40, 10, 10));
  gold.addImage( goldImg);
  gold.scale=0.13;
  gold.velocityY = 3;
  gold.lifetime = 150;
  goldG.add( gold);
  }
}

function createSword(){
  if (World.frameCount % 530 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}