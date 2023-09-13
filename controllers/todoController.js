var bodyParser= require('body-parser');
var mongoose= require('mongoose');
console.log(mongoose.version);

//Connecting to database
mongoose.connect('mongodb+srv://Yash:RGzap6Mpp3dYXyOH@todo.f2nnnsr.mongodb.net/');
//Creating a schema- like a blueprint
var todoSchema= new mongoose.Schema({
    item: String
});
//Creating a model based on our schema
var Todo= mongoose.model('Todo', todoSchema);

// //Old way ( doesn't work anymore )
// itemOne.save(function(err,doc){
//     if(err) return console.error(err);
//     console.log('Item Saved');
// });


var urlencodedParser = bodyParser.urlencoded({extended: false});
module.exports= function(app)
{
    app.get('/todo', async function(req,res){
       
        //get data from mongodb and pass it to view
        const data = await Todo.find({});
        
        // console.log(data);
        res.render('todo',{todos: data});

    });

    app.post('/todo',urlencodedParser,async function(req,res){
        
        //get data from view and add it to mongodb

        
        try {
            
            const itemOne = new Todo(req.body);
            const data= await itemOne.save();
            res.json(data); //the updated data array passed to ajax in todo-list.js which re-renders the ejs file to include the new item in it.

        } catch (error) {
            // Handle errors here
            console.error('Error:', error);
        }
      
    });

    app.delete('/todo/:item', async function(req,res){

       
        try {
            // console.log(req.params.item.replace(/ /g, "-"));
            const itemOne = await Todo.findOne({item: req.params.item.replace(/\-/g, " ")});
            // console.log(itemOne);
            // console.log('Trying to delete');
            if (!itemOne) {
                console.log('No item found');
                return res.status(404).json({ message: 'Item not found' });
              }
            const data= await itemOne.deleteOne();
            res.json(data);
        } catch (error) {
            // Handle errors here
            console.error('Error:', error);
        }
    });
}