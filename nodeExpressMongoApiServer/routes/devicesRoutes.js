const express = require('express');
const router = express.Router();
const devicesController = require("../Controllers/devicesController");
const authMiddleware = require("../middleware/authMiddleware");


router.get('/devices' , authMiddleware , devicesController.getUserDevices);
router.post('/addDevice' ,authMiddleware, devicesController.addDevice);
router.put('/updateDevice' ,authMiddleware, devicesController.updateDevice);
router.delete('/deleteDevice' ,authMiddleware, devicesController.deleteDevice);


module.exports = router