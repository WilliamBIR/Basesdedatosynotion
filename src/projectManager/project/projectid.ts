import { PrismaClient } from '@prisma/client';

const projectid= async (Datos:any)=>{
    const prisma = new PrismaClient();
    //console.log('Datos')
    //console.log(Datos)
    const projectId= await prisma.projects.findUnique({
        where:{
            projectName:Datos.projectName
        },
        select:{
            projectId:true
        }
    })
    //console.log(proyecto_id)
    await prisma.$disconnect()
    return(projectId)
}

export default projectid