const validator = require('validator');
const validate = (extra,data)=>{
    var emailContainer = data.map((val)=>{return val['email']});
    var usernameContainer = data.map((val)=>{return val['username']});
    if(emailContainer.includes(extra['email']))
    {
        return "Email Address already exists!!";
    }
    else if(usernameContainer.includes(extra['username']))
    {
        return "Username already exists!!";
    }
    else
    {
        return true;
    }
}
 
module.exports = {validate};