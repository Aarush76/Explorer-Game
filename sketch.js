var exp, exp_img, exp_collided, bg, bg_img, ground, tg_img, rock_img, score = 0;
var Play = 1, End = 0, gameState = Play, obstacle, obsGrp, restart, restart_img;
var artifact, artGrp, art1, art2, art3, bg_sound, tg_collided;

function preload(){
   exp_img = loadAnimation("exp_1.png", "exp_2.png", "exp_3.png", "exp_4.png", "exp_5.png", "exp_6.png")
   exp_collided = loadAnimation("exp_1.png")

   bg_img = loadImage("bg.jpg")

   tg_img = loadAnimation("tiger_1.png", "tiger_2.png", "tiger_3.png", "tiger_4.png", "tiger_5.png", "tiger_6.png", "tiger_7.png", "tiger_8.png")
   tg_collided = loadAnimation("tiger_6.png")
   rock_img = loadImage("stone.png")

   art1 = loadImage("artifact_1.png")
   art2 = loadImage("artifact_2.png")
   art3 = loadImage("artifact_3.png")

   restart_img = loadImage("restart.png")

   bg_sound = loadSound("jungle_music.mp3");
}

function setup(){
   createCanvas(displayWidth, displayHeight - 130);

   bg = createSprite(0,130,displayWidth, displayHeight);
   bg.addImage(bg_img);
   bg.scale = 1.75;

   exp = createSprite(100, windowHeight - 170, 0, 0);
   exp.addAnimation("run", exp_img);
   exp.addAnimation("collide", exp_collided);
   //exp.debug = true;
   exp.setCollider("rectangle", 0, 0, exp.width - 200, exp.height);
    
   ground = createSprite(0, windowHeight - 5, windowWidth * 2, 10);
   ground.visible = false;

   restart = createSprite(windowWidth/2 , windowHeight/2, 50, 50);
   restart.addImage(restart_img);
   restart.scale = 0.25;

   obsGrp = createGroup();
   artGrp = createGroup();
}

function draw(){
   //background(bg_img)
   //bg_sound.play();

if(gameState === Play){

   //bg_sound.play();
   bg_sound.loop();

   restart.visible = false;

   bg.velocityX = -7

   if (bg.x < 300){
      bg.x = bg.width/2;
   }

   if(keyDown("space")){
    exp.velocityY = -22;
   }

   score = score + Math.round(frameCount / 200);

   spawnObstacles();
   spawnArtifacts();

   
   console.log(frameCount);

   if(exp.isTouching(artGrp)){
      score = score + 100;
      artifact.destroy();
   }

   if(exp.isTouching(obsGrp)){
      gameState = End;
   }

} else if(gameState === End){

   exp.changeAnimation("collide", exp_collided)
   obstacle.changeAnimation("stop", tg_collided);
   
   obstacle.velocityX = 0;

   bg.velocityX = 0;

   obsGrp.setLifetimeEach(-1);

   restart.visible = true;

   if(mousePressedOver(restart)){
      reset();
   }
}

  exp.velocityY = exp.velocityY + 0.8;

  exp.collide(ground)

  //console.log(gameState)

   
   drawSprites();
   
   fill('#00007c')
   textSize(30)
   text("Score: "+ score, windowWidth - 220, 50);

if(gameState === End){
   
   fill("red")
   stroke("red")
   strokeWeight(5)
   textSize(50)
   text("GAME OVER", windowWidth / 2 - 150, windowHeight/2 - 50)
}

}


function spawnObstacles(){
   if(frameCount% 200 === 0){
     obstacle = createSprite (windowWidth -1, windowHeight - 100,20,50) 
     obstacle.velocityX = -15;
     rand = round(random(1,2));
     //console.log(rand) ;
     switch(rand){
       case 1: obstacle.addAnimation("tiger",tg_img);
               obstacle.addAnimation("stop", tg_collided);
               break;
       case 2: obstacle.addImage(rock_img);
               break;
       default: break;
     }
     obstacle.scale = 0.45;
     obstacle.lifetime = 125;
     obsGrp.add(obstacle);

     //if(rand === 1 && exp.isTouching(obstacle)){
      // obstacle.changeAnimation("stop", tg_collided);
    // }
 
   }
} 

function spawnArtifacts(){
   if(frameCount% 305 === 0){
      artifact = createSprite(windowWidth -1, windowHeight - 100, 20, 50)
      artifact.velocityX = -15;
      rand2 = round(random(1,3));
      switch(rand2){
        case 1: artifact.addImage(art1);
                break;
        case 2: artifact.addImage(art2);
                break;
        case 3: artifact.addImage(art3);
                break;
        default: break;
      }
      //artifact.scale = 0.5;
      artifact.lifetime = 125;
      artGrp.add(artifact);
   }
}
 
 function reset(){
   gameState = Play;
   restart.visible = false;
   score = 0;
   obsGrp.destroyEach();
   exp.changeAnimation("run", exp_img);
 }
 