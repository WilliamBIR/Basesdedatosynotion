import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../lib/prisma";
import projectid from "../../../../../src/projectManager/project/projectid";
import savetask from '../../../../../src/projectManager/tasks/savetask';
import employeeid from "../../../../../src/projectManager/trabajadores/employeeid";
import moduleid from "../../../../../src/projectManager/modules/moduleid";
import getTask from "../../../../../src/notion/task/getTask"



export default async function handle(req:NextApiRequest, res:NextApiResponse){
    const {Datos}=req.body
    console.log(Datos)
    try{
        const task=await getTask()
        //console.log('tarea')
        //console.log(task)
        const proyecto_id= await projectid(Datos)
        //console.log('proyecto_id')
        //console.log(proyecto_id)
        const modulo_id= await moduleid(task,proyecto_id)
        //console.log('moduloid')
        //console.log(modulo_id)
        //console.log('Iniciando tareas')
        const trabajador_id=await employeeid(task)
        //console.log(trabajador_id)
        //console.log(task)
        if(!task.trabajador_id){
            task.trabajador_id=trabajador_id!.trabajador_id
        }
        if(!task.modulo_id){
            task.modulo_id=modulo_id!.modulo_id
        }
        //console.log(task)
        const result=await savetask(task)
        //console.log('tarea guardada')
        //console.log(result)
        res.status(200).json({status: 'Ok'})
    }catch(error){
        res.status(400).json({error})
    }
    
}