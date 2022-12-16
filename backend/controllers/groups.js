const Groups=require('../models/groups');

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