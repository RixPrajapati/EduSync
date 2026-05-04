import userService from "../service/user.service.js"
const getUsers=async(req,res)=>{

    try{
        const users= await userService.getUsers();
        if(!users || users.length==0){
          return   res.status(200).json({message:"No any users present "})
        }
        res.status(200).json(users);
    }catch(err){
        res.status(400).send(err.message)
    }

}

const createUser=async(req,res)=>{
    // console.log(req.body)
    try{
        const newUser= await userService.createUser(req.body,req.files)
  res.json(newUser);
    }catch(err){
        res.status(400).send(err.message)
    }
}

export default {getUsers,createUser};