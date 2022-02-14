import { PrismaClient } from '@prisma/client';

const modulesxproject= async (Datos:any)=>{
    const prisma = new PrismaClient();
    //console.log(Datos)
    const Modules= await prisma.modules.findMany({
        where:{
          moduleProjectId:Datos.projectId
        }
      })
    await prisma.$disconnect()
    return(Modules)
}

export default modulesxproject