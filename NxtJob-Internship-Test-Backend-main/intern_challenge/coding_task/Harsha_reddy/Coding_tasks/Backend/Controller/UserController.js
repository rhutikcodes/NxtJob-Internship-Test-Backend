import prisma from "../DB/db.config.js"

export const createUser = async (req,res)=>
{   
    console.log(req.body)
    const {name,email,password} = req.body
    const findUser = await prisma.user.findUnique({
        where:{
            email :email
        }
    })

    if(findUser)
    {
        return res.json({status:400,message:"email already in use"})

    }

    const newUser = await prisma.user.create({
        data:{
            name:name,
            email:email,
            password:password 
        }
    })

    return res.json({status:200 ,data:newUser,msg:"User created"})


}

export const updateUser = async (req,res)=>
{
    const userid = req.params.id
    const {name,email,password} = req.body

    await prisma.user.update({
        where:{
            id:Number(userid)
        },

        data:{
            name ,
            email,
            password
        }
    })
    return res.json({status:200 ,msg:"User Updated"})
}

export const deleteUser = async (req,res)=>
{
    const userid  = req.params.id
    await prisma.user.delete({
        where:{
            id:Number(userid)
        }
    })
    return res.json({status:200,message:"deleted Successfully"})
}

export const fetchUsers = async (req,res)=>{

    const users = await prisma.user.findMany({})
    return res.json({
        status:200,data:users,message:"Printed all users in User table"
    })
}