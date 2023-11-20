const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
// connnect database 
mongoose.connect('mongodb://127.0.0.1:27017/Flight').then(()=>{
console.log(' database is Connect');
})
.catch((err)=>{
console.error('db is not connect  ',err);
})


// craete model 
const User=mongoose.model('User',{
    name:String,
    age:String,
    email:String,
    date:String,
    from:String,
    to:String,

})

app.use(bodyParser.urlencoded({
    extended:true
}));


// getting form 

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
})

// insert data 
app.post('/submit',(req,res)=>{
    const { name,age,email,date,from,to} =req.body;

    const user=new User({
        name,age,email,date,from,to
    })

    user.save().then(()=>{
        res.send('User data is saved');
    })
    .catch((err)=>{
        console.error('Errror ',err);
        res.status(500).send('Error ');
    });
});




const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is running port ${PORT}`);
});


