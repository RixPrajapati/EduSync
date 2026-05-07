import z from 'zod'


const validation=(schema)=>(req,res,next)=>{

try{

    const val=schema.parse(req.body);
next();
}catch(err){
     if (err instanceof ZodError) {

      return res.status(400).send(err.flatten());
    }

    res.status(400).send(err);
}
}
export default validation;