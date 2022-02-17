const express = require('express');
const router = express.Router();
const Sms = require('../models/Sms')



router.get('/' , (req,res)=>{
    Sms.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

router.post('/' , (req,res)=>{
    const sms = new Sms({
        number : req.body.number,
        name : req.body.name,
        icon : req.body.icon,
        description : req.body.description
    })

    sms.save()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

module.exports = router;