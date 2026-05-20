export const normalizeRole=(req,res,next)=>{
  if (req.body.role && typeof req.body.role === "string") {
    req.body.role = [req.body.role];
  }
  next();

}
