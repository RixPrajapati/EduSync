import z, { maxLength, minLength } from "zod"
import { mailRex, passwordRex } from "../../constants/regex";
import { ADMIN, FEMALE, MALE, OTHER, STUDENT, TEACHER } from "../../constants/role";

const userSchema=z.object({


 userName:z.string({required_err:"User name is required"}).trim(),

  email:z.string({required_err:"Email is required"}).trim().regex(mailRex,{message:"Email is in not correct format "}),
  password:z.string({required_err:"Password is required"}).trim().check(minLength(8,{message:"Password is not  than 8 character"},maxLength(20,{message:"Password is not grater than 20 character"}))).regex(passwordRex,{message:"Password contain one uppercase ,one number and one special character"}),
  
  phone:z.string({required_err:"Phone is required"}).trim().check(minLength(7),maxLength(15)),
  
  address: {
    city:z.string({required_err:"City is required"}).trim(),
   
    province:z.string().optional(),
    street: z.string().optional(),
    country:z.string().default("Nepal") ,
  },
  gender:z.string({required_err:"Gender is required"}).enum([MALE,FEMALE,OTHER]),
   
  dob:z.date(),
  profile:z.string.optional() ,

  isActive:z.boolean().default(true),

  role:z.array(z.enum([STUDENT,TEACHER,ADMIN])).default(STUDENT),
  //   extra for students
  rollNo: z.string().trim().optional(),
  semester:z.string().trim().optional(),
  faculty: z.string().optional(),

  //   extra for teacher

  department: z.string().optional(),
  designation: z.string().optional(),












})



