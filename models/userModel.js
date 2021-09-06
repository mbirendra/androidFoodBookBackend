const mongoose = require('mongoose');
const User = mongoose.model('User',{
    fullname : {type : String,required : true
    },
    email : { type : String,required : true,unique : true  
    },
    username : { type : String,required : true, unique : true
    },
    password : {type : String, required : true
    },
    Usertype : {type : String,  enum : ['Admin', 'User'],default:"User"
    }

})
module.exports = User;