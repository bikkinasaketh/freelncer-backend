const User=require('../models/user')

const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


const RegisterUser =async(req,res)=>{
    try{
       const {name,role,email,password}=req.body;
       
       const ExistingUser=await User.findOne({email});

       if(ExistingUser){
        return res.status(400).json({
            "message":"user email already exists"
        })
       }
       const  HashedPassword=await bcrypt.hash(password,10);

       const newUser=new User({
        name,
        email,
        role,
        password:HashedPassword
       })
       await newUser.save();

       res.status(201).json({
        "message":"user registered Sucessfully"
       });
    }
    catch(error){
        res.status(500).json({
            "message":error.message
        });
    }
}

const LoginUser=async(req,res)=>{
    try{
        const {email,password}=req.body;

        const ExistingUser=await User.findOne({email})

        if(!ExistingUser){
            return res.status(404).json({
                "message":"User email already existed"
            })
        }
       
        const IspasswordCorrect=await bcrypt.compare(
            password,
            ExistingUser.password
        );
        if(!IspasswordCorrect){
            return res.status(401).json({
                message:"Invalid Email and Password"
            })
        }

        const token=jwt.sign(
            {
              userId:ExistingUser.id,
              role:ExistingUser.role  
            },
            process.env.JWT_SECRET,
            {expiresIn:'1d'}
        )
        res.status(200).json({
            message:'LOgin Sucessful',
            token,
            user:{
                id:ExistingUser._id,
                name:ExistingUser.name,
                email:ExistingUser.email,
                role:ExistingUser.role
            }
        })

    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

module.exports={RegisterUser,LoginUser}