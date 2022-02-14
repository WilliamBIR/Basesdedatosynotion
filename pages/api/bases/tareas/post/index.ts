import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../lib/prisma";
import projectid from "../../../../../src/projectManager/project/projectid";
import savetask from '../../../../../src/projectManager/tasks/savetask';
import employeeid from "../../../../../src/projectManager/employees/employeeid";
import moduleid from "../../../../../src/projectManager/modules/moduleid";

export default async function handle(req:NextApiRequest, res:NextApiResponse){
    const {Datos,tareas}=req.body
    console.log(Datos)
    console.log(tareas)
    try{

       const proyecto_id= await projectid(Datos)
       console.log('proyectoid')
       console.log(proyecto_id)
       const modulo_id= await moduleid(Datos,proyecto_id)
       console.log('moduloid')
       console.log(modulo_id)
       console.log('Iniciando tareas')
       for(let i=0;i<tareas.length;i++){

            const trabajador_id = await employeeid(tareas[i])
            console.log(trabajador_id)
            if(!tareas[i].taskEmployeeId){
                tareas[i].taskEmployeeId=trabajador_id!.userId
            }
            if(!tareas[i].taskModuleId){
                tareas[i].taskModuleId=modulo_id.moduleId
            }

            const result= await savetask(tareas[i])
       }
       console.log('terminando tareas')
        res.status(200).json({status: 'Ok'})
    }catch(error){
        res.status(400).json({error})
    }
    
}