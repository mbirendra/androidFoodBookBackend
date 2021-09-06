const User = require('../models/userModel');
const mongoose = require("mongoose");
 
const url = 'mongodb://127.0.0.1:27017/food_database';
 
beforeAll(async () =>{
    await mongoose.connect(url,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
    })
})
 
afterAll(async () => {
    await mongoose.connection.close();
})
 
describe('Register',async () =>{
it('User reg', ()=>{
    const reg = {
        'fullname' :'Ashish Pandey',
        'email' :'pashish@gmail.com',
        'username' :'Pandu',
        'password' :'password',
        'Usertype' :'User' 
    }
    return User.create(reg).then((res)=>{
        expect(res.username).toEqual('Pandu')
    })
})
     
 
    
    it('Update', async () => {
        const reg ={
                    'username': 'Tinker',
                    'email':'pp@gmail.com'
                } ;
                const status = await User.updateOne({_id:Object('606c3c9d307b063e986d6ffb')},
        {$set : reg})  
        expect(status.ok).toBe(1)
    });
 
 
    it('LOGIN retrieve', () => {
            return User.findOne({_id:Object('606c4c1437022d057061ba44')})
            expect(status.ok).toBe(1);
        });
 
    
    it('user del', async() => {
        return User.deleteOne({_id:Object('606c4c1437022d057061ba44')})
            expect(status.ok).toBe(1);
    })
})