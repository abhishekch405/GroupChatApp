const express=require('express');
const router=express.Router();

const groupController=require('../controllers/groups');
const userauthorization=require('../middleware/authorization');
router.post('/newgroup',userauthorization.authorization,groupController.createNewGroup);
module.exports=router;