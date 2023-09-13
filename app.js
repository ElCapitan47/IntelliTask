var express= require('express');

var app= express();
var todoController=require('./controllers/todoController');

//setup template engine
app.set('view engine','ejs');
//for static files
app.use(express.static('./public')); //we dont give 'route'=> so now this will apply for all url endings
todoController(app);
//listening to port
app.listen(3000);