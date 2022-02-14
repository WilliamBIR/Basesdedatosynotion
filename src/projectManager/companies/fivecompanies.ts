import { PrismaClient } from '@prisma/client';

const fivecompanies= async (Datos:any)=>{
    const prisma = new PrismaClient();

    if(Datos.companyName===null){
        Datos.companyName=''
    }
    const empresas = await prisma.companies.findMany({
        take: 5,
        distinct:['companyName'],  
        where:{
            companyName:{
              contains:Datos.companyName,
            },
          },
          select:{
            companyName:true,
          },
          orderBy:{companyName:"asc"},
    })
    await prisma.$disconnect()
    return empresas
}
      
export default fivecompanies