const express = require('express');
const router = express.Router();
const userController = require("../Controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const User = require('../models/User');


router.get('/users' , authMiddleware , userController.getUsers);
router.put('/resetPassword', authMiddleware , userController.resetPassword);






router.get('/', (req,res)=>{
 User.find()
 .then(result => res.json(result))
 .catch(err => res.json(err))
})

router.get('/:id', (req,res)=>{
    User.findById(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

router.get('/find/:username', (req,res)=>{
    User.findOne({username:req.params.username})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

router.post('/', (req,res)=>{
    const user = new User({
        username : req.body.username,
        password : req.body.password
    });
    console.log('incoming post request')
    user.save()
     .then(data =>{
         res.json(data)
     }).catch(err => {
         console.log(err)
     })
})

router.put('/:id', (req,res)=>{
    User.findByIdAndUpdate(req.params.id, {username : req.body.username , password : req.body.password})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

router.delete('/:id', (req,res)=>{
    User.findByIdAndDelete(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.json(err))
})




router.get('/devices/:userId' ,(req,res)=>{
    User.findById(req.params.userId)
    .then(result => res.json(result.devices))
    .catch(err =>res.json(err))
})


router.post('/devices/:userId' , (req,res)=>{
    User.findById(req.params.userId)
    .then(result => {
        result.devices.push(req.body)
        result.save()
        .then(data => res.json(data))
        .catch(err => res.json(err))
    })
    .catch(err => res.json(err))
})

router.put('/devices/:userId' , (req,res)=>{
    User.findById(req.params.userId)
    .then(result =>{
        result.devices.map(device =>{
            if(device._id.toString() === req.body._id){
                device.name= req.body.name;
                device.number= req.body.number
            }
        })
        result.save()
        .then(data=>res.json(data))
        .catch(err => res.json(err))
    })
    .catch(err => res.json(err))
})

router.delete('/devices/:userId' , (req,res)=>{
    User.findById(req.params.userId)
    .then(result =>{
       const tab= result.devices.filter(device =>{
            return device._id.toString()!==req.body._id
        })
        result.devices = tab;
        result.save()
        .then(data=>res.json(data))
        .catch(err => res.json(err))
    })
    .catch(err => res.json(err))
})


module.exports = router;