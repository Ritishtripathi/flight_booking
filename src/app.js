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
   sittype:String,
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
    const { name,age,email,date,from,to,sittype} =req.body;

    const user=new User({
        name,age,email,date,from,to,sittype
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

// Login here 
app.post('/AdminLogin',async (req,res)=>{
    try{
        const {email,password}=req.body;
        const user =await Signup.findOne({email});
console.log("user details",user);
if(!user){
    res.status(401).json({error:'invalid email'});
}
if(user.password!=password){
    res.status(401).json({error:'invalid password'});
}
res.redirect('users');


    }
    catch{
        res.status(500).json({error:'Login failed '})
    }
})

//show data
app.get('/users', (req, res) => {
    Signup.find()
        .then(users =>  {
          
        const table = `
          <table border="1">
            ${users.map(user => `
              <tr>
              <th>Name</th>
              <td>${user.name}</td>
              </tr>
              <tr>
              <th>Email</th>
              <td>${user.email}</td>
              </tr>
              <tr>
              <th>Date of Birth</th>
              <td>${user.dob}</td>
              </tr>
              <tr>
              <th>Number</th>
              <td>${user.number}</td>
              </tr>
              <tr>
              <th>Gender</th>
              <td>${user.gender}</td>
              </tr>
              </tr>`).join('')}
          </table>
        `;
        res.send(table);
      
      })
      .catch(err => {
        console.error('Error fetching users: ', err);
        res.status(500).send('Error fetching users');
      });
  });

//show data of passenger

//port code
const PORT = process.env.PORT || 3003;
app.listen(PORT,()=>{
    console.log(`Server is running port ${PORT}`);
});


