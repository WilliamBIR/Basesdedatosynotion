import { PrismaClient } from '@prisma/client';

const employeeid= async (Datos:any)=>{
    const prisma = new PrismaClient();
    //console.log(Datos)
    const employee_id=await prisma.user.findFirst({
        where:{
            userName: {
                equals: Datos.userName,
            },
        },
        select:{
            userId:true
        }
        })
        await prisma.$disconnect()
        //console.log(employee_id)
    return(employee_id)
}

export default employeeid