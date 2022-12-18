const express=require('express');
const router=express.Router();

const groupController=require('../controllers/groups');
const userauthorization=require('../middleware/authorization');
router.post('/newgroup',userauthorization.authorization,groupController.createNewGroup);
router.get('/getallgroups',userauthorization.authorization,groupController.getallgroups);

router.post('/addmember',userauthorization.authorization,groupController.addNewMember);
router.get('/getmembers/:groupid',userauthorization.authorization,groupController.getMembers);
module.exports=router;