const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views' ,path.join(__dirname,'views') );
app.use(express.urlencoded());
app.use(express.static('assets'));

 // middleware1
// app.use(function(req, res, next){
//     req.myName = "Bam";
//     // console.log('middleware1 called');
//     next();
// }) ;

// // middlewre2

// app.use(function(req, res,next){
//     console.log('my name from MW2',req.myName);
//     // console.log('middleware2 called');
//     next();
// });





var contactList = [
    {
        name : "Abhi",
        phone: "99261192"
    },
    {
        name : "Stark",
        phone: "776261192"
    },
    {
        name : "Shu",
        phone: "887261192"
    },
    {
        name : "BAM",
        phone: "926261192"
    }
    
]


app.get('/',function(req, res){ 
    //  console.log("From the get route Controller",req.myName);
        
    Contact.find({},function(err,contacts){
        if(err){
            console.log('Error in fetching contacts');
            return;
        }
        return res.render('home',{
            title:"Contacts List",
            contact_List: contacts

    });

    });
});

app.get('/practice' , function(req, res){
    return res.render('practice',{
        title:"let up play with EJS"
    });
});

app.post('/create-contact',function(req, res){
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone

    // });
    // contactList.push(req.body);
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    },function(err,newContact){
        if (err) {console.log('Error creating in a Contact' )
    return ; }

    console.log('************', newContact);
    return res.redirect('/');
    });

});

// for deleting a contact 
app.get('/delete-contact',function(req, res){  
    // get the id from query in the url
    
    let id= req.query.id;
//find the contact in thee database using id and delete it

    Contact.findByIdAndDelete(id , function(err){
        if (err) {
            console.log('error in delition object from database');
            return;
        }
    });
    //get the quiery form url

    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);
    
    //   if(contactIndex != -1) {
    //     contactList.splice(contactIndex, 1);
    //   }
      return res.redirect('/');
});

app.listen(port, function(err){
    if (err) {console.log('error in the server',err);}
    console.log('listening on port:',port);
});