const Users=require('../models/users');
const Messages=require('../models/messages');

exports.sendMessage= async (req,res,next)=>{
    const text_message=req.body.message_text;
    const receiverid=req.body.receiverid;
    const name=req.user.name;
    try {
        await req.user.createMessage({message:text_message,receiverid:receiverid,sendername:name, isgroupmessage:true})
        return res.status(200).json({success:true,message:"Message Sent successfull"});
    } catch (error) {
        console.log(error);
        res.json(error);
    }
};

exports.getAllMessages=async (req,res,next)=>{
    const groupId=req.params.groupId

    try {
        const messages=await Messages.findAll({where:{receiverid:groupId}});
        return res.status(200).json({success:true,message:"Message fetched successfully",messages:messages, userId:req.user.id});
    } catch (error) {
        return res.json(error);        
    }
}

