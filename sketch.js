//Create variables here
var dog, happyDog, database, foodStock;

var foodS = 5;

var database = firebase.database();

var buttonFeed;
var buttonAdd;

var fedTime;
var lastFed;

var foodObj;

function preload()
{
  //load images here
  dogImage = loadAnimation("images/dogImg.png");
  happyDogImage = loadAnimation("images/dogImg.png");
}

function setup() {
  createCanvas(displayWidth, displayHeight);

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  feed=createButton(" Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedTheDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  
  var dog = createSprite(250,250,25,25);
  dog.addAnimation("Dog", dogImage);
  dog.addAnimation("Happy-Dog", happyDogImage);
  dog.scale = 0.25;

  foodObj = new Food(720,220,35,35);

  
}

function draw() {  
  background(46,139,87);

  foodS = 5;

  drawSprites();

  //add styles here
  fill("black");
  textSize(15);
  text("FoodStock:" + foodS, 25, 25);

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + "PM", 350,30);
  }else if(lastFed==0){
    text("Last Feed : 12 AM",350,30);
    }else{
      text("Last Feed : "+ lastFed + "AM", 350,30);
    }

  foodObj.display();
}


function addFoods(){
foodS++;
database.ref('/').update({
  Food:foodS
  })
}

function feedTheDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x = x-1;
  }

  database.ref("/").update({
    Food:x
  })
}

//<link rel="stylesheet" type="text/css" href="style.css"/>

