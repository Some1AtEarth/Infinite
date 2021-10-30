var backgroundImg, ground;
var tvImg, tv;
var boyImg, boy;
var gamestate = "play"
var bombImg, bomb;
function preload() {
    backgroundImg = loadImage("2161333.jpeg")
    tvImg = loadImage("tv.png")
    boyImg = loadImage("boy.png")
    bombImg = loadImage("bomb.png")
}

function setup() {
    createCanvas(600, 600);
    ground = createSprite(300, 300)
    ground.addImage("ground",backgroundImg)
    ground.velocityY = 1
    tvGroup = new Group()
    bombGroup = new Group()
    boy = createSprite(200, 200)
    boy.addImage("boy",boyImg)
    boy.scale = 0.3

}

function draw() {
    background(200);
    if (gamestate === "play") {
        if (keyDown("right")) {
          boy.x = boy.x+5
        }
        if (keyDown("left")) {
          boy.x = boy.x-5
        }
        if (keyDown("space")) {
            boy.velocityY = -10
          }
        boy.velocityY += 0.2
        spawntv();
        spawnbomb();
        if(ground.y > 400){
            ground.y = 300
          }
          if (bombGroup.isTouching(boy) || boy.y > 600) {
            gamestate = "end"
          }
          if (gamestate === "end") {
            background("blue")
            textSize(200)
            fill("blue")
            strokeWeight(10)
            stroke("red")
            text("GAME OVER", 200, 300)
            boy.destroy();
            tvGroup.destroyEach();
            bombGroup.destroyEach();
          }
        }
    drawSprites();


}
function spawntv() {
    if (frameCount%150 == 0) {
      var tv = createSprite(Math.round(random(0, 400)), -50);
      tv.velocityY = 1
      tv.addImage("tv", tvImg)
      tvGroup.add(tv)
      boy.depth = tv.depth+1
    }
  }
  function spawnbomb() {
    if (frameCount%50 == 0) {
      var bomb = createSprite(Math.round(random(0, 400)), -50);
      bomb.velocityY = 1
      bomb.scale = 0.1
      bomb.addImage("bomb", bomb)
      bombGroup.add(bomb)
      boy.depth = bomb.depth+1
    }
  }