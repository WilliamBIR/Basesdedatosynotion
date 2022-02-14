import { PrismaClient } from '@prisma/client';

const createmodule= async (Datos:any)=>{
    const prisma = new PrismaClient();
    //console.log('desde scr')
    //console.log(Datos)
    try{
    const module= await prisma.modules.create({
        data:{
            moduleName:Datos.moduleName,
            moduleProjectId:Datos.projectId,
            moduleEmployeeId:Datos.moduleEmployeeId,
        }
    })
    //console.log(modulo)
    await prisma.$disconnect()
    return(module)
    }catch(error){
        console.log(error)
    }

}

export default createmodule