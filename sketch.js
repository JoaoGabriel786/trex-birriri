var play =1;
var end =0
var gameState =play
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudsGroup, cloudImage;
var restartimage,gameOverimage
var obstaculo1,obstaculo2,obstaculo3,obstaculo4,obstaculo5,obstaculo6
var pularsons,morrersons,checkpointsons

var newImage;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  groundImage = loadImage("ground2.png");
  gameOverimage = loadImage ("gameOver.png")
  cloudImage = loadImage("cloud.png");
 restartimage = loadImage ("restart.png");
obstaculo1 = loadImage ("obstacle1.png")
obstaculo2 = loadImage ("obstacle2.png")
obstaculo3 = loadImage ("obstacle3.png")
obstaculo4 = loadImage ("obstacle4.png")
obstaculo5 = loadImage ("obstacle5.png")
obstaculo6 = loadImage ("obstacle6.png")

pularsons=loadSound ("jump.mp3")
morrersons = loadSound ("die.mp3")
checkpointsons = loadSound ("checkpoint.mp3")

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  trex = createSprite(50,height-70,20,50);
  trex.addAnimation("running", trex_running);
   trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(width/2,height-20,width,2);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  invisibleGround = createSprite(width/2,height-10,width,10);
  invisibleGround.visible = false;
  
  console.log("Hello"+ 5)
  

  obstaculosGroup = new Group ()
  cloudsGroup = new Group ()

trex.setCollider ("circle",0,0,40)




restart = createSprite(width / 2, height / 2 + 30)
restart.addImage (restartimage)
restart.scale = 0.5
restart.visible=false
gameOver = createSprite(width / 2, height / 2)
gameOver.addImage (gameOverimage)
gameOver.scale=0.5

}


var count = 0;










function draw() {
  background(180);
  text("pontos:" + count,500,50)















   if (gameState === play){
    ground.velocityX = -4;
    gameOver.visible=false
    restart.vesible=false
    count = count + Math.round (getFrameRate()/60)

    if ( (touches.length > 0 && trex.y >= height - 50) 
    || (keyDown('space') && trex.y >= height - 50) ) {
      trex.velocityY = -12;
      pularsons.play()
    }

    trex.velocityY = trex.velocityY + 0.8

if (count>0 && count %100 === 0){
  checkpointsons.play()
}









    spawnClouds();
    spawnobstaculo ()
 if (obstaculosGroup.isTouching(trex)){
  morrersons.play()
  gameState = end

 }



   }else if (gameState === end){
    ground.velocityX = 0;
gameOver.visible=true
restart.visible =true
obstaculosGroup.setVelocityXEach(0)
cloudsGroup.setVelocityXEach (0)
obstaculosGroup.setLifetimeEach (-1)
cloudsGroup.setLifetimeEach (-1)
trex.changeAnimation ("collided",trex_collided)
trex.velocityY=0

if (touches.length > 0 || mousePressedOver(restart)) {
  reset ()
}






   }






  
  
  

  
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  trex.collide(invisibleGround);
  
  //gerar as nuvens
  
  drawSprites();
}

function spawnClouds() {
  //escreva o código aqui para gerar as nuvens
  if (frameCount % 60 === 0) {
    cloud = createSprite(width + 20, height / 2, 40, 10)
    cloud.addImage(cloudImage)     
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -(3+4*count/100)
    
    
    //atribua tempo de vida à variável
    cloud.lifetime = 200
    
    //ajuste a profundidade
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    cloudsGroup.add(cloud)

    
    }
}

function spawnobstaculo (){
if (frameCount % 60 === 0){

var obstaculo = createSprite(width, height - 35, 10, 40)
obstaculo.velocityX = -(6+count/100)
var rand =Math.round(random (1,6))


switch (rand){
case 1:obstaculo.addImage(obstaculo1)
break

case 2:obstaculo.addImage(obstaculo2)
break

case 3:obstaculo.addImage(obstaculo3)
break

case 4 :obstaculo.addImage(obstaculo4)
break

case 5:obstaculo.addImage(obstaculo5)
break

case 6:obstaculo.addImage(obstaculo6)
break

defualt:break

}
obstaculo.scale=0.5



obstaculosGroup.add (obstaculo)
}



}
function reset (){
  gameState=play
obstaculosGroup.destroyEach ()
cloudsGroup.destroyEach ()
count=0
restart.visible=false
trex.changeAnimation ("running",trex_running)
}













