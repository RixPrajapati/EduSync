import noticeService from "../service/notice.service.js"
const createNotice=async(req,res)=>{
   
try {
        const userId = req.token.id;
       
   const response=await noticeService.createNotice(req.body,userId)
    res.status(200).send(response)
} catch (error) {
    res.status(400).send(error.message)
     
}

}
const getAllNotice=async(req,res)=>{
    try {

const response=await noticeService.getAllNotice(req.query)

        res.status(200).send(response)
    } catch (error) {
        res.status(300).send(error.message)
    }
}
const deleteNotice=async(req,res)=>{
    try {
        const response=await noticeService.deleteNotice(req.params.id)
         res.json({ message: "Deleted Successfully" });
    } catch (error) {
        res.send(error.message)
        
    }
}
export default{createNotice,getAllNotice,deleteNotice}