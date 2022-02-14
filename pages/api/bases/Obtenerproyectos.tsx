import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { prisma } from "../../../lib/prisma";
import fiveprojectsstatus from '../../../src/projectManager/project/fiveprojectsstatus';


export default async function handle(req:any,res:any) {
  const {Otro}=req.body
  const Datos={
    projectName:Otro.queryKey[1].projectName,
    projectStatus:Otro.queryKey[1].projectStatus
  }
  try{
    const Proyectos= await fiveprojectsstatus(Datos)
    //console.log(Emisores)
    res.json({Proyectos})
  }catch(error){
    res.status(400).json({error});
  }
}