import { PrismaClient } from '@prisma/client';

const fiveprojectsstatus= async (Datos:any)=>{
    const prisma = new PrismaClient();
    //console.log('Datos')
    //console.log(Datos)
    const Projects = await prisma.projects.findMany({
        take: 5,
        distinct:['projectName'],  
        where:{
          projectName:{
              contains:Datos.projectName,
            },
            projectStatus:{
              contains:Datos.projectStatus,
            },
          },
    
          orderBy:{projectName:"asc"},
        })
    //console.log(proyecto_id)
    await prisma.$disconnect()
    return(Projects)
}

export default fiveprojectsstatus