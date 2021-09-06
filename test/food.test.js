    const Food = require('../models/FoodModel');
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
     
    describe('food',async () =>{
    it('food insert', ()=>{
        const reg = {
            'foodtitle':'puri',
            'foodimg':'https://upload.wikimedia.org/wikipedia/commons/d/d8/Puri_A.jpg',
            'fooddesc':'puri mitho ho' ,
            'foodcategory':true ,
            'foodtype':"Breakfast",
            'foodrating': '5',
            'preptime': '6' 
        }
        return Food.create(reg).then((res)=>{
            expect(res.foodtitle).toEqual('puri')
        })
    })
         
     
        
        it('Update', async () => {
            const reg ={
                        'foodtitle': 'Haluwa'
                    } ;
            const status = await Food.updateOne({_id:Object('606c50cb53541a12280a60ae')},
            {$set : reg}) 
            
            expect(status.ok).toBe(1)
        });

   
     
     
        it('food retrieve', () => {
                return Food.findOne({_id:Object('606c50cb53541a12280a60ae')})
                expect(status.ok).toBe(1);
            });
     
        
        it('food del', async() => {
            return Food.deleteOne({_id:Object('606c50cb53541a12280a60ae')})
                expect(status.ok).toBe(1);
        })
    })