import { PrismaClient } from '@prisma/client';

const companyId= async (Datos:any)=>{
    const prisma = new PrismaClient();

    const companyId=await prisma.companies.findUnique({
        where:{
            companyName:Datos.companyName
        },
        select:{
            companyId:true
        }
    })
    await prisma.$disconnect()
    return companyId
}
      
export default companyId