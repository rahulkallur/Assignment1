var express = require('express');
var app = express();
var session = require('express-session');

//Import body parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json());

app.use('/common_lib',express.static('common_lib'));
//Render User Login Page
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/capt.html');
});

app.use(session({
    secret:'12132434324'
}));

app.get('/user',(req,res)=>{
    res.end('<h1>Hey '+ req.session.user + '</h1> Welcome to Full Stack Development');
    //res.sendFile(__dirname+'/user_auth.html');
});

app.post('/',(req,res)=>{
   
    var username = req.body.username;
    var password = req.body.password;
    var org_username = 'test@gmail.com';
    var org_password = '123456';
    let cf = req.body.rf;
    let ce = req.body.cf;
    console.log(cf);
    console.log(ce);
    if(cf === ce && username === org_username && password == org_password) {
        req.session.user = username;
        return res.redirect('/user');
    }
    else
    {
        return res.redirect('/');
    }
    
});

app.listen(3000,()=>{
    console.log('Server running on port http://localhost:3000');
});