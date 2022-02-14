import { PrismaClient } from '@prisma/client';

const employeename= async (Datos:any)=>{
    const prisma = new PrismaClient();
    const employeeName=await prisma.user.findUnique({
        where:{
            userId:Datos.userId
        },
        select:{
            userName:true
        }
        })
        await prisma.$disconnect()
    return(employeeName)
}

export default employeename