const mongoose = require ('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/recipe_database',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology : true 
})
