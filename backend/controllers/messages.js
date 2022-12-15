const Users=require('../models/users');
const Messages=require('../models/messages');

exports.sendMessage= async (req,res,next)=>{
    const text_message=req.body.message_text;


    try {
        await req.user.createMessage({message:text_message,receiverid:12345, isgroupmessage:false})
        res.status(200).json({success:false})
    } catch (error) {
        res.json(error);
    }
    // const {name,email,phone,password}=req.body;
    // let passres;
    // try {
    //     passres=await bcrypt.hash(password,10);
    //     const user=await Users.findOne({where:{email:email}});
    //     if(user){
    //         return  res.status(200).json({success:false,message:'User already exists. Please login!'}) 
    //     }
    //     else{
    //         await  Users.create({name:name,email:email,phone:phone,password:passres});
    //         return res.json({success:true,message:'Successfully signed up. Please login now!'})
    //     }

    // } catch (error) {
    //     res.json({success:false,message:"Some Error Occured",error:error});
    // }
};

