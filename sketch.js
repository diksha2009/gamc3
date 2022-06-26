var bg, bgImg;
var player, shooterImg, shooter_shooting;
var bullet, bulletImg;
var edges;
var zombie, zombieImg;
var zombiegroup;
var bulletgroup;
var heart1, heart2, heart3, heart1Img, heart2Img, heart3Img;
var life = 3;
var explosionSound;
var winSound;
var zombiecount = 0;
var gameState = "play";
var zombie1, zombie2, zombie1Img, zombie2Img, zombie2group, zombie1group

function preload() {
  shooterImg = loadImage("assets/shooter_2.png");
  shooter_shooting = loadImage("assets/shooter_3.png");
  bulletImg = loadImage("assets/download-bullet-image-old-10.png");
  bgImg = loadImage("assets/bg.jpeg");
  zombieImg = loadImage("assets/zombie.png");
  heart1Img = loadImage("assets/heart_1.png");
  heart2Img = loadImage("assets/heart_2.png");
  heart3Img = loadImage("assets/heart_3.png");
  explosionSound = loadSound("assets/explosion.mp3");
  winSound = loadSound("assets/win.mp3");
  zombie1Img=loadImage("assets/monster1.png")
  zombie2Img=loadImage("assets/monster2.jpg")
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //adding the background image
  bg = createSprite(displayWidth / 2 - 20, displayHeight / 2 - 40, 20, 20);
  bg.addImage(bgImg);
  bg.scale = 1.1;

  //creating the player sprite
  player = createSprite(displayWidth - 1300, displayHeight - 300, 50, 50);
  player.addImage(shooterImg);
  player.scale = 0.3;

  player.debug = true;
  player.setCollider("rectangle", 0, 0, 300, 300);

  zombiegroup = new Group();
  bulletgroup = new Group();
  zombie1group = new Group();
  zombie2group = new Group();

  heart1 = createSprite(300, 50);
  heart1.addImage("h1", heart1Img);
  heart1.scale = 0.5;

  heart2 = createSprite(350, 50);
  heart2.addImage("h2", heart2Img);
  heart2.scale = 0.5;

  heart3 = createSprite(400, 50);
  heart3.addImage("h3", heart3Img);
  heart3.scale = 0.5;
}

function draw() {
  background(0);

  edges = createEdgeSprites();
  player.collide(edges);

  if (gameState === "play") {
    //moving the player up and down and making the game mobile compatible using touches
    spawnZombies();
    spawnzombie1();
    spawnzombie2();

    if (keyDown("UP_ARROW") || touches.length > 0) {
      player.y = player.y - 30;
    }
    if (keyDown("DOWN_ARROW") || touches.length > 0) {
      player.y = player.y + 30;
    }
    //release bullets and change the image of shooter to shooting position when space is pressed
    if (keyWentDown("space")) {
      bullet = createSprite(player.x + 20, player.y);
      player.addImage(shooter_shooting);
      bullet.addImage("bullet", bulletImg);
      bullet.velocityX = 6;
      bullet.scale = 0.05;
      bulletgroup.add(bullet);
    } else if (keyDown("space")) {
      player.addImage(shooter_shooting);
      // player.addImage()
      // player.addImage(shooterImg);
      //  player.addImage(shooter_1.png)
    }
    if (player.y < 80) {
      player.y = 80;
    }
    if (player.y > 630) {
      player.y = 630;
    }
    for (var i = 0; i < zombiegroup.length; i += 1) {
      if (zombiegroup.get(i).isTouching(player)) {
        zombiegroup.get(i).destroy();
        life -= 1;
      }
    }
    for (var i = 0; i < zombiegroup.length; i += 1) {
      if (bulletgroup.isTouching(zombiegroup.get(i))) {
        zombiegroup.get(i).destroy();
        bulletgroup.destroyEach();
        explosionSound.play();
        zombiecount += 1;
      }
    }

    for (var i = 0; i < zombie1group.length; i += 1) {
      if (zombie1group.get(i).isTouching(player)) {
        zombie1group.get(i).destroy();
        life -= 1;
      }
    }
    for (var i = 0; i < zombie1group.length; i += 1) {
      if (bulletgroup.isTouching(zombie1group.get(i))) {
        zombie1group.get(i).destroy();
        bulletgroup.destroyEach();
        explosionSound.play();
        zombiecount += 5;
      }

      for (var i = 0; i < zombie2group.length; i += 1) {
        if (zombie2group.get(i).isTouching(player)) {
          zombie2group.get(i).destroy();
          life -= 1;
        }
      }
      for (var i = 0; i < zombie2group.length; i += 1) {
        if (bulletgroup.isTouching(zombie2group.get(i))) {
          zombie2group.get(i).destroy();
          bulletgroup.destroyEach();
          explosionSound.play();
          zombiecount += 10;
        }
      }
    }
    if (life === 2) {
      heart3.destroy();
    }

    if (life === 1) {
      heart2.destroy();
    }

    if (life === 0) {
      heart1.destroy();
      gameState = "end";
    }

  } else if (gameState === "end") {
    winSound.play();
    zombiegroup.setLifetimeEach(0);
    zombiegroup.setVelocityXEach(0);
    zombie1group.setLifetimeEach(0);
    zombie1group.setVelocityXEach(0);
    zombie2group.setLifetimeEach(0);
    zombie2group.setVelocityXEach(0);
  }


  drawSprites();
  fill("White");
  textSize(40);
  text("zombie count:" + zombiecount, width - 400, 50);
}

function spawnZombies() {
  if (frameCount % 60 === 0) {
    zombie = createSprite(width - 20, random(300, 1000));
    zombie.addImage("zombie", zombieImg);
    zombie.scale = 0.1;
    zombie.velocityX = -4;
    zombie.debug = true;
    zombie.setCollider("rectangle", 0, 0, 1000, 1000);
    zombie.lifetime = 350;
    zombiegroup.add(zombie);
  }
}

function spawnzombie1() {
  if (frameCount % 100 === 0) {
    zombie1 = createSprite(width - 20, random(300, 1000));
    zombie1.addImage("zombie1", zombie1Img);
    zombie1.scale = 0.1;
    zombie1.velocityX = -4;
    zombie1.debug = true;
    zombie1.setCollider("rectangle", 0, 0, 1000, 1000);
    zombie1.lifetime = 350;
    zombie1group.add(zombie1);
  }
}

function spawnzombie2() {
  if (frameCount % 200 === 0) {
    zombie2 = createSprite(width - 20, random(300, 1000));
    zombie2.addImage("zombie2", zombie2Img);
    zombie2.scale = 0.1;
    zombie2.velocityX = -4;
    zombie2.debug = true;
    zombie2.setCollider("rectangle", 0, 0, 1000, 1000);
    zombie2.lifetime = 350;
    zombie2group.add(zombie2);
  }
}

