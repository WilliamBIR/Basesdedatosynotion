import { PrismaClient } from '@prisma/client';

const savetask= async (task:any)=>{
    const prisma = new PrismaClient();
    //console.log(tarea)
    if(!task.taskComplete){
        task.taskComplete=false
    }
    console.log('guardando')
    console.log(task)
    try{
    const result=await prisma.tasks.create({
        
        data:{
            taskName:task.taskName,
            taskEmployeeId:task.taskEmployeeId,
            taskModuleId:task.taskModuleId,
            taskComplete:task.taskComplete
        }
    })
    await prisma.$disconnect()
    return(result)
    }catch(error){
        console.log(error)
    }
}

export default savetask