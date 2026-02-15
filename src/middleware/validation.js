import Admin from "../models/Admin.js"
import User from "../models/User.js"


export const EmailExist=async(request,res)=>{
    const email=request.body
    const emailexist = await Admin.findOne(email)
    if(emailexist){
        return res.status(201).json({message:"email already exist"})
    }else{
        return res.status(200).json({message:"register successfully"})
    }
}
