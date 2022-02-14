import { PrismaClient } from '@prisma/client';

const employees= async ()=>{
    const prisma = new PrismaClient();
    const Employees = await prisma.user.findMany({
              distinct:['userName'],  
              orderBy:{userName:"asc"},
    })
      
          //console.log(Emisores)
          await prisma.$disconnect()
    return Employees
}
      
export default employees