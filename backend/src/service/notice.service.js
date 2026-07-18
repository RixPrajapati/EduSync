import Notice from "../models/Notice.js";

const createNotice =async (data,userId)=>{

const notice=await  Notice.create({...data,createdBy:userId});

return notice;


}

const getAllNotice=async(query)=>{

 
  const limit = query.limit ?? 10;
  const offset = query.offset ?? 0;

  const filters = {};

  const {  createdBy } = query;

  if (createdBy) filters.createdBy = createdBy;

  return await Notice.find(filters).sort({publishedAt:-1}).limit(limit).skip(offset)



}
const deleteNotice=async(id)=>{
    return await Notice.findByIdAndDelete(id);
}

export default { createNotice,getAllNotice,deleteNotice}