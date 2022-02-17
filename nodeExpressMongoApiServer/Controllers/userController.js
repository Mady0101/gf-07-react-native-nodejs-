const User = require("../models/User");


class userController{
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users)
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Get users error"});
        }
    }


    async resetPassword(req,res){
        try{
            const userToUpdate = await User.findById(req.user.id)
            const validPassword = bcrypt.compareSync(req.body.currentPassword, userToUpdate.password);
            if (!validPassword) {
                return res.status(400).json({message: "Password isn't correct"})
            }
            const updatedUser = await User.findByIdAndUpdate(req.user.id, {password : req.body.password});
            res.json({message:"Password changed succefully"});
        }catch (e){
            res.status(400).json({message: "Reset password error"});
        }
    }




}

module.exports = new userController(); 