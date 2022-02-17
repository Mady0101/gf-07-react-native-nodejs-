const User = require('../models/User');

class devicesController{

    async getUserDevices (req,res){
        try{
            const user = await User.findById(req.user.id);
            res.json(user.devices);
        }catch(e){
            console.log(e);
            res.status(400).json({message: "Get users error"});
        }
    }

    async addDevice (req,res){
        try{
            const user = await User.findById(req.user.id);
            user.devices.push(req.body);
            await user.save();
            res.json(user.devices);
        }catch(e){
            console.log(e);
            res.status(400).json({message: "Add device error"});
        }
    }

    async updateDevice (req,res){
        try{
            const user = await User.findById(req.user.id);
            user.devices.map(device =>{
                if(device._id.toString() === req.body._id){
                    device.name= req.body.name;
                    device.number= req.body.number
                }
            })
            await user.save();
            res.json(user.devices);
        }catch(e){
            console.log(e);
            res.status(400).json({message: "Update Device error"});
        }
    }

    async deleteDevice(req,res){
        try{
            const user = await User.findById(req.user.id);
            const tab= user.devices.filter(device =>{
                return device._id.toString()!==req.body._id
            });
            user.devices = tab;
            await user.save();
            res.json(user.devices);
        }catch(e){
            console.log(e);
            res.status(400).json({message: "Delete Device error"});
        }
    }

}


module.exports = new devicesController();