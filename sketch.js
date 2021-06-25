//Create variables here
var dog, happyDog, foodS, foodStock;

var database;


function preload()
{
  //load images here
  dogImage = loadAnimation ("images/dogImg.png");
  happyDogImage = loadAnimation ("images/dogImg1.png");
}

function setup() {
	createCanvas(800, 700);
  
  database = firebase.database();

  dog = createSprite(400,350,1,1);
  dog.addAnimation("hungry", dogImage);
  dog.addAnimation("happy", happyDogImage);
  dog.scale = 0.2;

  foodStock = database.ref('food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);

    dog.changeAnimation("happy", happyDogImage);

    }

  drawSprites();
  //add styles here
  text("Note: Press UP_ARROW Key To Feed Drago Milk!");
  textSize(30);
  fill("black");
  

  text("Food Remaining : " + foodS, 170, 200);
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }

  database.ref('/').update({
    food:x
  })
}


