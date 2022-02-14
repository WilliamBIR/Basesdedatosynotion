import { PrismaClient } from '@prisma/client';

const onecompany= async (Datos:any)=>{
    const prisma = new PrismaClient();

    if(Datos.companyName===null){
        Datos.companyName=''
    }
    const Company = await prisma.companies.findUnique({
        where:{
          companyName:Datos.companyName
        }
      })
      await prisma.$disconnect()
    return Company
}
      
export default onecompany