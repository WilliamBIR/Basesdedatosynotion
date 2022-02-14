import { PrismaClient } from '@prisma/client';

const tasksxmodule= async (Datos:any)=>{
    const prisma = new PrismaClient();
    //console.log(tarea)
    const Task= await prisma.tasks.findMany({
        where:{
          taskModuleId:Datos.moduleId
        }
      })
      await prisma.$disconnect()
    return(Task)
}

export default tasksxmodule