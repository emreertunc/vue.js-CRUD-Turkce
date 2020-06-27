const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//iletiler al (GET)
router.get('/', async(req, res) => {
    //res.send('hello');
    const iletiler = await loadIletilerCollection();
    res.send(await iletiler.find({}).toArray());
});

//ileti ekle (ADD)
router.post('/',async (req,res)=>{
    const iletiler = await loadIletilerCollection();
    await iletiler.insertOne({
        text: req.body.text,
        createdAt: new Date(),
        updatedAt: ""
    });
    res.status(201).send();
});

//ileti guncelle(UPDATE) (put ile)
router.put('/:id',async(req,res)=>{
    
    let id = req.params.id;
    const iletiler = await loadIletilerCollection();
    await iletiler.findOneAndUpdate({_id: new mongodb.ObjectID(req.params.id)},
    {$set: {text: req.body.text, updatedAt: new Date()}},
   // {$addFields: {}}
    );
    res.status(200).send();
});


//ileti sil(DELETE)
router.delete('/:id',async(req,res)=>{
    
    const iletiler = await loadIletilerCollection();
    await iletiler.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});



async function loadIletilerCollection(){
    const client = await mongodb.MongoClient.connect
    (
        'mongodb+srv://ertuncemre:mongodb11@cluster0-dvx0p.mongodb.net/test?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );
    return client.db('deneme').collection('iletiler');
}

module.exports = router;

