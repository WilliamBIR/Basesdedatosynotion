import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { prisma } from "../../../lib/prisma";
import companyId from '../../../src/projectManager/companies/companyId';
import fiveprojectscompany from '../../../src/projectManager/project/fiveprojectscompany';


export default async function handle(req:any,res:any) {
  const {Otro}=req.body
  var Datos={
      companyName:Otro.queryKey[1].companyName,
      projectName:Otro.queryKey[1].projectName,
      empresa_id:1
  }
  try{
    
    const empresa_id= await companyId(Datos)
    //console.log(empresa_id)
    Datos.empresa_id=empresa_id!.companyId
    
    const Proyectos=await fiveprojectscompany(Datos)
    //console.log(Emisores)
    res.json({Proyectos})
    }catch(error){
    res.status(400).json({error});
    }
}