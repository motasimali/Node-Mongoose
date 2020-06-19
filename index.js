const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db)=>{
    console.log('Connected successfully to DB');
    Dishes.remove({})
    .then(()=>{
        return Dishes.create({
            name : 'Uthappizza2',
            description : 'Test1'
        })
    })
    
        .then((dish)=>{
            console.log(dish);
            return Dishes.findByIdAndUpdate(dish._id,{
                $set: {
                    name: "Uthapp", 
                    description : 'Updated test'
                }
            },
            //  new will give us the updated dish
             { new : true }     
            ).exec();
        })
        .then((dish)=>{
            console.log(dish);
            dish.comment.push({
                rating: 5,
                comment: 'I\'m getting sinking feeling',
                author: 'Motasim'
            });

            return dish.save();
        })
        .then((dish)=>{
            console.log(dish);    

            return Dishes.remove({});
        })
        .then(()=>{
            return mongoose.connection.close();
        })
        .catch((err)=>{
            console.log(err);
        })
});