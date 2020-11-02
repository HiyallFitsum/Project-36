//Create variables here
var dog, happyDog, database, foodStock;

var foodStock = 5;

var database = firebase.database();

var buttonFeed;
var buttonAdd;

var fedTime;
var lastFed;

var foodObj;

function preload()
{
  //load images here
  dogImage = loadImage("images/dogImg.png");
  happyDogImage = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(displayWidth, displayHeight);

  dog = createSprite(displayWidth - 200,250,25,25);
  dog.addImage(dogImage);
  dog.scale = 0.25;

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
  
    foodObj = new Food();

}

function draw() {  
  background(46,139,87);

  //foodS = 5;


  drawSprites();

  //add styles here
  fill("black");
  textSize(15);
  text("FoodStock:" + foodStock, 25, 25);

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
foodStock = foodStock + 1;
//foodObj = new Food();

database.ref('/').update({
  Food:foodStock
  })
}

function feedTheDog(){
  foodStock = foodStock -1;
  dog.addImage(happyDogImage);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })

//food.deductFood();

}

function readStock(data){
  foodStock=data.val();
  foodObj.updateFoodStock(foodStock);

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

