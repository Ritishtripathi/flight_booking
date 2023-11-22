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
// craete model 
const Signup=mongoose.model('Signup',{
    name:String,
    email:String,
    dob:String,
    number:String,
    gender:String,
    password:String
})

app.use(bodyParser.urlencoded({
    extended:true
}));


// getting form 

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
})
app.get('/Signup',(req,res)=>{
    res.sendFile(__dirname + '/Signup.html');
})
app.get('/Login',(req,res)=>{
    res.sendFile(__dirname + '/Login.html');
})


// insert data 
app.post('/submit',(req,res)=>{
    const { name,age,email,date,from,to} =req.body;

    const user=new User({
        name,age,email,date,from,to
    })

    user.save().then(()=>{
        res.sendFile(__dirname + '/thanku.html');
    })
    .catch((err)=>{
        console.error('Errror ',err);
        res.status(500).send('Error ');
    });
});

// sinup pae insert data
app.post('/signup',(req,res)=>{
    const { name,email,dob,number,gender,password} =req.body;

    const signuser=new Signup({
        name,email,dob,number,gender,password
    })

    signuser.save().then(()=>{
        res.sendFile(__dirname + '/thanku.html');
    })
    .catch((err)=>{
        console.error('Errror ',err);
        res.status(500).send('Error ');
    });
});




const PORT = process.env.PORT || 7000;
app.listen(PORT,()=>{
    console.log(`Server is running port ${PORT}`);
});


