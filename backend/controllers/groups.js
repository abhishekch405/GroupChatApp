const Groups=require('../models/groups');
const Groupmembers=require('../models/groupmembers');
const Users=require('../models/users');

exports.createNewGroup=async (req,res,next)=>{
    const groupname=req.body.groupname;
    const createdby=req.user.id;

    if(!groupname){
        return res.json({success:false,message:"No name entered"})
    }

    try {
        const groupalreadypresent=await Groups.findAll({where:{groupname:groupname}});
        if(groupalreadypresent.length!=0){
            console.log("group present already");
            return res.json({success:false,message:"Group name already exists"});
        }

        const newgroup=await req.user.createGroup({groupname:groupname,createdby:createdby},{through:{isadmin:true}})
        return res.json({success:true,message:"New Group Created"});
    } catch (error) {
        
        console.log(error);
        return res.json({sucess:false,error});
    }

}

exports.getallgroups=async (req,res,next)=>{
    try {
        const groups=await req.user.getGroups();
       // console.log("theses are groups",groups);
        res.status(200).json({success:true,groups:groups});
    } catch (error) {
        
    }
}

exports.addNewMember= async (req,res,next)=>{
    const {email,groupID}=req.body;
    const adminuser=req.user.id;
    const exists=await Groupmembers.findOne({where:{userId:adminuser,groupId:groupID, isadmin:true}});
    if (!exists){
        return res.json({success:false,message:'You do not have admin powers for this group'})
    }
    const Newmember= await Users.findOne({where:{email:email}});

    const fetchedGroup= await req.user.getGroups({where:{id:groupID}});

    const maingroup=fetchedGroup[0];
    //console.log("nadhchcua",fetchedGroup[0].groupname);

    try {
        await maingroup.addUsers(Newmember,{through:{isadmin:false}});
        return res.json({success:true,message:`${Newmember.name} has been successfully added to the ${maingroup.groupname}`})
    } catch (error) {
        console.log(error);
    }
    
    console.log("fetched Group", maingroup);
    
}