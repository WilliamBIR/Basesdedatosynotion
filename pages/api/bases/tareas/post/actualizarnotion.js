

import projectId from "../../../../../src/projectManager/project/projectid";
import savetask from '../../../../../src/projectManager/tasks/savetask';
import employeeid from "../../../../../src/projectManager/employees/employeeid";
import moduleid from "../../../../../src/projectManager/modules/moduleid";
import getTask from "../../../../../src/notion/task/getTask"
import getAllTasks from "../../../../../src/notion/task/getAllTasks"
import modulesxproject from "../../../../../src/projectManager/modules/modulesxproject";
import tasksxmodule from "../../../../../src/projectManager/tasks/tasksxmodule"
import employeename from "../../../../../src/projectManager/employees/employeename";



export default async function handle(req, res){
    const {Proyecto}=req.body
//    console.log(Proyecto)
    try{
        //console.log('intentando pedir task')
        const taskModuleProj=await getAllTasks()
        console.log("task pedidas")
        //console.log(taskModuleProj)
        var tasksxproyect=[]
        console.log('filtrando')
        taskModuleProj.map((task)=>{
            console.log(task)
            if(task.proyectName===Proyecto.projectName){
                tasksxproyect.push(task)
                //console.log(task)
            }
        })
        console.log('filtradas')
        console.log(tasksxproyect)
        console.log('pidiendo modulos')
        const modulosxproyect= await modulesxproject(Proyecto)
        console.log(modulosxproyect)
        console.log('modulos listos')
        var tareasdb=[]
        console.log('listado de tareas actuales')
        for(let i=0;i<modulosxproyect.length;i++){
            //console.log(i)
            var tareas=await tasksxmodule(modulosxproyect[i])
            //console.log(tareas)
            for (let j=0;j<tareas.length;j++){
                if(!tareas[j].userId){
                    tareas[j].userId=tareas[j].taskEmployeeId
                }
                var trabajador_nombre= await employeename(tareas[j])
                if(!tareas[j].moduleName){
                    tareas[j].moduleName=modulosxproyect[i].moduleName
            
                }
                if(!tareas[j].projectName){
                    tareas[j].projectName=Proyecto.projectName
            
                }
                if(!tareas[j].userName){
                    tareas[j].userName=trabajador_nombre.userName
            
                }
                tareasdb.push(tareas[j])
            }
        }
        console.log('tareas en un solo vector')
        console.log(tareasdb)
        console.log('variables')
        var tareasabasededatos=[...tasksxproyect]
        var tareasanotion=[...tareasdb]
        console.log('variables preparadas')
        console.log(tareasabasededatos)
        console.log(tareasanotion)
        console.log('filtro 1')
        for(let i=tareasabasededatos.length-1;i>=0;i--){
            for(let j=0;j<tareasdb.length;j++){
                if(tareasabasededatos[i].taskName===tareasdb[j].taskName
                    && tareasabasededatos[i].moduleName===tareasdb[j].moduleName){
                        tareasabasededatos.splice(i,1)
                }
            }
        }
        console.log('terminado filtro 1')
        console.log(tareasabasededatos)
        
        console.log('filtro 2')
        
        for(let i=tareasanotion.length-1;i>=0;i--){
            for(let j=0;j<tasksxproyect.length;j++){
                if(tareasanotion[i].taskName===tasksxproyect[j].taskName
                    && tareasanotion[i].moduleName===tasksxproyect[j].moduleName){
                        //console.log('Parecido')
                        tareasanotion.splice(i,1)
                }
            }
        }
        console.log('terminando filtro 2')
        console.log(tareasanotion)
        console.log('filtros terminados')


        console.log('Iniciando publicacion de tareas a base de datos')

        
        for (let i=0;i<tareasabasededatos.length;i++){
            console.log('Iniciando Datos')
            
            console.log('Datos iniciados')
            console.log(tareasabasededatos[i])
            var module_Id=await moduleid(tareasabasededatos[i],Proyecto)
            console.log('modulo listo')
            console.log(module_Id)
            if(!tareasabasededatos[i].userName){
                tareasabasededatos[i].userName=tareasabasededatos[i].employeeName
            }
            //console.log(tareasabasededatos[i])
            var userId=await employeeid(tareasabasededatos[i])
            console.log(userId)
            console.log('trabajador listo')
            
            if(!tareasabasededatos[i].taskModuleId){
                tareasabasededatos[i].taskModuleId=module_Id.moduleId
            }
            if(!tareasabasededatos[i].taskEmployeeId){
                tareasabasededatos[i].taskEmployeeId=userId.userId
            }
            console.log(tareasabasededatos[i])
            const nuevatareadb= await savetask(tareasabasededatos[i])
            console.log(nuevatareadb)
        }
  
        console.log('tareas terminadas de publicar en la base de datos')
        console.log('iniciando publicacion en notion')



        res.status(200).json({status:'Ok'})
    }catch(error){
        res.status(400).json({error})
    }
    
}
