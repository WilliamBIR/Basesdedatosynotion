import { PrismaClient } from '@prisma/client';

const fivemodules= async (Datos:any)=>{
    const prisma = new PrismaClient();

    const Modules = await prisma.modules.findMany({
        take: 5,
        distinct:['moduleId'],  
        where:{
          moduleName:{
              contains:Datos.moduleName,
            },
            moduleProjectId:Datos.projectId
          },
          orderBy:{moduleName:"asc"},
        })
        await prisma.$disconnect()
    return(Modules)
}

export default fivemodules