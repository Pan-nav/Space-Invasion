var Allies, bullets
var Invaders, Space
var Score = 0;

var Play=1;
var End=0;
var gameState = 1;

function preload(){
AlliesImg = loadImage("rocket.png");
InvadersImg = loadImage("enemy.png");
bulletsImg = loadImage("bullet.png");
SpaceImg = loadImage("space.png");
}

function setup() {
 //Canvas
 createCanvas(windowWidth, windowHeight);

  Ally = createSprite (width/4,height-5,20,20);
  Ally.addImage(AlliesImg);
  Ally.scale = 0.6
  

  bulletGrp= new Group();
}

gameState = Play;

function draw() {
  background(0);

 

  if(gameState === Play){
     background(SpaceImg);
     Ally.x = World.mouseX;
    
     edges= createEdgeSprites();
     Ally.collide(edges);

      if (keyDown("SPACE")){
      Bulletcreate();
      }
      createInvaders();
      
      if (bulletGrp.isTouching(Invaders)){
        Invaders.destroyEach();
        Score = Score+5;
      }
        
      if (Invaders.y < 0){
        Score = Score - 20;
      }

      if(Score < 0){
      gameState = End;
      }

     }
    
  if( gameState === End){
    bulletGrp.destroyEach();
    Ally.destroy();
    Invaders.destroy();
  }
     
     
     
     
  
  drawSprites();
   //score display
   textSize(20);
   fill(255);
   text("Score: "+ Score, width-150,30);
}

function createInvaders(){
  if(World.frameCount % 60==0){
    var Invaders = createSprite(Math.round(random(width-100,350),40,10,10));
    Invaders.addImage(InvadersImg);
    Invaders.scale= 0.5;
    Invaders.velocityY = 6;
  }
}

  function Bulletcreate(){
    Bullet = createSprite(Ally.x,Ally.y);
    Bullet.addImage(bulletsImg);
    Bullet.velocityY= -5;
    Bullet.scale = 0.05;
    Bullet.lifetime= -1;
    bulletGrp.add(Bullet);
  }
