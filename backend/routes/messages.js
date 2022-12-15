const express=require('express');
const router=express.Router();

const messageController=require('../controllers/messages');
const userauthorization=require('../middleware/authorization');
router.post('/sendmessage',userauthorization.authorization,messageController.sendMessage);
module.exports=router;