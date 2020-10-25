class Food {
construtor(x,y,width,height){
    options = {
isStatic: true
    }
var foodStock;
var lastFed;

this.image = loadImage("images/Milk.png");
this.body = Bodies.rectangle(x,y,width,height,options)
this.width = width;
this.height = height;
World.add(world. this.body);
}

display(){  
        var x = 80,y=100


        imageMode(CENTER)
        image(this.image,720,220,70,70);

    if(this.foodStock!=0){
        for(var i=0;i<this.foodStock;i++){
            if(i%10==0){
                x=80;
                y=y+50;
            }
            image(this.image,x,y,50,50);
            x=x+30;
        }
    }
}

        getFoodStock(){
        var foodSRef = database.ref('foodStock');
        foodSRef.on("value",(data)=>{
            foodS = data.val();
            });
        }

        updateFoodStock(){
            database.ref('/').update({
                Food: foodS
              });
        }

        //deductFood(){}
    }



