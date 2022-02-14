import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../lib/prisma";
import employeeid from "../../../../../src/projectManager/employees/employeeid";
import createmodule from "../../../../../src/projectManager/modules/createmodule";


export default async function handle(req:NextApiRequest, res:NextApiResponse){
    const {moduleName,employeeName,projectId}=req.body
    //console.log(nombremodulo)
    //console.log(responsable)
    //console.log(proyecto_id)
    try{
        
        var Datos={
            moduleName:moduleName,
            userName:employeeName,
            projectId:projectId
        }
        console.log(Datos)  
        const trabajador_id=await employeeid(Datos)
        if(!Datos.moduleEmployeeId){
            Datos.moduleEmployeeId=trabajador_id!.userId
        }
        console.log(Datos)
        const modulo= await createmodule(Datos)
        res.status(200).json({status: 'Ok'})
    }catch(error){
        res.status(400).json({error})
    }
    
}