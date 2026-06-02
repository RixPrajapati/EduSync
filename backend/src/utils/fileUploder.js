import {v2 as cloudinary} from "cloudinary"
async function uploadFile(files){
const uploadedFiles=[]
    for(const file of files){
       const result=await new Promise((resolve,reject)=>{
cloudinary.uploader.upload_stream({
        folder:"mern-20260320",
        allowed_formats:['jpg','png','webp','jpeg']
        
    },(err,data)=>{
        if(err) return reject(err);

        resolve(data)
    }).end(file.buffer)
            
        })
       uploadedFiles.push(result)
    }
    return uploadedFiles;

}
export default uploadFile