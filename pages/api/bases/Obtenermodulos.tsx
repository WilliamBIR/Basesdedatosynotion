import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { prisma } from "../../../lib/prisma";
import projectid from '../../../src/projectManager/project/projectid';
import fivemodules from '../../../src/projectManager/modules/fivemodules';


export default async function handle(req:any,res:any) {
  const {Otro}=req.body
  const Datos={
    projectName:Otro.queryKey[1].projectName,
    moduleName:Otro.queryKey[1].moduleName,
    projectId:1
  }
  console.log(Datos)
  try{
    const proyecto_id= await projectid(Datos)
    console.log(proyecto_id)
    Datos.projectId=proyecto_id!.projectId
    console.log(Datos)
    const Modulos= await fivemodules(Datos)

    res.json({Modulos})
  }catch(error){
    res.status(400).json({error});
  }
}