const bcrypt = require("bcryptjs");
const {validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Role = require("../models/Role");

const generateAccessToken = (id, roles) => {
    const payload = {
        id, roles
    }

    return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "24h"})

}

class authController {

    async registaration(req, res) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({message: "Registration error", errors })
            }

            const {username, password} = req.body;

            const candidate = await User.findOne({username});

            if (candidate) {
                return res.status(400).json({message: "User is already registered"})
            }

            // create a new user
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: "USER"});
            const user = new User({username, password: hashPassword, roles: [userRole.value]});

            await user.save();

            return res.json({message: "User registered"})


        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Registration error"})
        }
    }

    async login(req, res) {
        try {

            const {username, password} = req.body;
            const user = await User.findOne({username});

            if (!user) {
                return res.status(400).json({message: "User not found"})
            }

            const validPassword = bcrypt.compareSync(password, user.password);

            if (!validPassword) {
                return res.status(400).json({message: "Password isn't correct"})
            }

            const token = generateAccessToken(user._id, user.roles);
            return res.json({user ,token})

        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Login error"})
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users)
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Get users error"})

        }
    }
}

module.exports = new authController(); 