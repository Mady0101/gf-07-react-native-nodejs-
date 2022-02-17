const jwt = require("jsonwebtoken");



module.exports = function(roles) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
        next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1]

        if (!token) {
            return res.status(403).json({message: "User is not logged in"});
        }
        
        const {roles: userRoles} = jwt.verify(token, process.env.SECRET_KEY);
        let hasRole = false;

        userRoles.forEach(role => {
            // Here we iterate over user roles. And we check: whether the user has at least one allowed role for this action
            if (roles.includes(role)){
                hasRole = true;
            }
        });

        if (!hasRole) {
            return res.status(403).json({message: "You don't have access"})
        }

        next();

    } catch (e) {
        return res.status(403).json({message: "User is not logged in"});
    }
    }
  
}