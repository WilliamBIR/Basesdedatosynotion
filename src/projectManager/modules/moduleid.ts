import { PrismaClient } from '@prisma/client';

const moduleid= async (Datos:any,projectId:any)=>{
    const prisma = new PrismaClient();
    console.log(projectId.projectId)
    console.log(Datos.moduleName)
    try{
    const moduleid= await prisma.modules.findFirst({
        where:{
             AND: [
             {
                moduleProjectId: {
                     equals: projectId!.projectId,
                 },
             },
             {
                 moduleName: {
                     equals: Datos.moduleName,
                 },
             },
             ],
        },
        select:{
            moduleId:true
        }
    })
    //console.log(moduleid)
    await prisma.$disconnect()
    return(moduleid)
    }catch(error){
        console.log(error)
    }
}

export default moduleid