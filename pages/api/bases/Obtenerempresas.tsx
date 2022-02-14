import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { prisma } from "../../../lib/prisma";
import fivecompanies from '../../../src/projectManager/companies/fivecompanies';


export default async function handle(req:any,res:any) {
  const {Otro}=req.body
  const Datos={companyName:Otro.queryKey[1].companyName}
  //console.log(Datos)
  try{
    const Empresas = await fivecompanies(Datos)

    res.json({Empresas})
  }catch(error){
    res.status(400).json({error});
  }
}