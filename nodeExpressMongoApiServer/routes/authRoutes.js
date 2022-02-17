const Router = require("express");
const router = new Router();
const controller = require("../Controllers/authController");
const {check} = require("express-validator");

router.post('/signup', [
    check("username", "The field can't be empty").notEmpty(),
    check("password", "Minimum 6 characters, maximum 20 characters").isLength({min: 6, max: 20}),
], controller.registaration);
router.post('/login', controller.login);



module.exports = router