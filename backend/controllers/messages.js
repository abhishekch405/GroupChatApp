const Users=require('../models/users');
const Messages=require('../models/messages');
const Sequelize=require('sequelize');
const S3Services=require('../services/s3Services');
const Op=Sequelize.Op;

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
    const lastMessageId=req.query.lastMessageId;
    console.log("last Message id",lastMessageId);
    try {
        const messages=await Messages.findAll({
            where:{
                receiverid:groupId,
                id:{
                    [Op.gt]:lastMessageId
                }
            }});
        return res.status(200).json({success:true,message:"Message fetched successfully",messages:messages, userId:req.user.id});
    } catch (error) {
        console.log(error);
        return res.json(error);        
    }
}


// const upload = require("../services/s3Services");
// const singleUpload = upload.single("image");
// exports.uploadImage = async (req,res,next)=>{
//     try {
//         const name=req.user.name;
//         const userId=req.user.id;
//         const file=req.body.file;
//         const receiverid=req.body.receiverid;
//         const fileName=`image${userId}---${receiverid}/${new Date()}`;

//         const downloadLink=await S3Services.uploadToS3(fileName,file);

//         req.user.createMessage({message:`${downloadLink}`,receiverid:receiverid,sendername:name, isgroupmessage:true})
//         return res.status(200).json({success:true,message:"Uploaded an image", isimage:true});
//         console.log(downloadLink);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({success:false,error});
//     }
// }







const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

const upload = require('../services/s3Services');
const singleUpload = upload.single("image");

exports.uploadImage=async (req, res,next)=> {
  
  console.log("rfytguhijikisdjhyguhj",req.body);
    //const uid = req.params.id;
//     console.log("fileeeee",req.body.file);
//   singleUpload(req, res, function (err) {
//     if (err) {
//       return res.json({
//         success: false,
//         errors: {
//           title: "Image Upload Error",
//           detail: err.message,
//           error: err,
//         },
//       });
//     }
//     console.log(req.file.location);
//     //let update = { profilePicture: req.file.location };

//     // User.findByIdAndUpdate(uid, update, { new: true })
//     //   .then((user) => res.status(200).json({ success: true, user: user }))
//     //   .catch((err) => res.status(400).json({ success: false, error: err }));
//   });
}  