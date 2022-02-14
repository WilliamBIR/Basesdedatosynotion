import { PrismaClient } from '@prisma/client';

const projectname= async (Datos:any)=>{
    const prisma = new PrismaClient();
    //console.log('Datos')
    //console.log(Datos)
    const Project = await prisma.projects.findUnique({
        where:{
          projectName:Datos.projectName
        }
      })
    //console.log(proyecto_id)
    await prisma.$disconnect()
    return(Project)
}

export default projectname