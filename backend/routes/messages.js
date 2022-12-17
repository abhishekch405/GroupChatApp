const express=require('express');
const router=express.Router();

const messageController=require('../controllers/messages');
const userauthorization=require('../middleware/authorization');
router.post('/sendmessage',userauthorization.authorization,messageController.sendMessage);
router.get('/allmessages/:groupId',userauthorization.authorization,messageController.getAllMessages);
module.exports=router;