var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

var milk, milkImage;
//create feed and lastFed variable here
var feed, lastFed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
milk=loadImage("Milk.png");
milkImage=loadImage("milkImage.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feedFood=createButton("Feed the Dog");
  feedFood.position(700,95)
  feedFood.mousePressed(milk)

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background("orange");
  foodObj.display();
database.ref('FeedTime').on("value", function(data){
  lastFed=data.val();
})
  //write code to read fedtime value from the database 
  if(lastFed >= 12){
    text("Last feed:" + lastFed%12 + "PM", 350,30)
  }
  else if(lastFed==0){
    text("Last feed:12AM", 350,30)
  }
  else{
    text("Last feed:" + lastFed + "AM", 350,30)
  }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time

  var food_stock_val=foodObj.getFoodStock()
  if(food_stock_val <=0){
    foodObj.updateFoodStock(food_stock_val*0);
  }else{
    foodObj.updateFoodStock(food_stock_val-1)
  }
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}


//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
