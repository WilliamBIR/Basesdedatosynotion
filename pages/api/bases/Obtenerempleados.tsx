import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { prisma } from "../../../lib/prisma";
import employees from '../../../src/projectManager/employees/employees';


export default async function handle(req:any,res:any) {
  try{ 
    const Trabajadores= await employees()
    res.json({Trabajadores})
  }catch(error){
    res.status(400).json({error});
  }
}