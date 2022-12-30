// const AWS=require('aws-sdk');
// const {json}= require('express/lib/response');

// const Multer=require('multer');
// const MulterS3=require('multer-s3');

// const uploadToS3=async (fileName,data)=>{
//     const bucketName=process.env.BUCKET_NAME;
//     try {
        
//         const s3Bucket=await new AWS.S3({
            
//             accessKeyId:process.env.ACCESS_KEY_ID,
//             secretAccessKey:process.env.SECRET_ACCESS_KEY
//         });
    
//         const params={
//             Bucket:bucketName,
//             Key:fileName,
//             Body:data,
//             ACL:'public-read'
//         }
    
//         return new Promise((resolve,reject)=>{
//             s3Bucket.upload(params,(err,s3response)=>{
//                 if(err)
//                     reject(err)
//                 else{
//                     console.log(s3response);
//                     resolve(s3response.Location);
//                 }
//             })
//         })
//     } catch (error) {
//         console.log(error)
//     }
   
// }

// module.exports={
//     uploadToS3
// }

const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new aws.S3();

aws.config.update({
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  accessKeyId: process.env.ACCESS_KEY_ID,
  
});
//region: "us-east-2",

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//     cb(null, true);
//   } else {
//     cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
//   }
// };

const upload = multer({
  //fileFilter,
  storage: multerS3({
    acl: "public-read",
    s3,
    bucket: `process.env.BUCKET_NAME`,
    // metadata: function (req, file, cb) {
    //   cb(null, { fieldName: "TESTING_METADATA" });
    // },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

module.exports = upload;
