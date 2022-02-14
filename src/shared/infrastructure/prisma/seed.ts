import {PrismaClient} from "@prisma/client"
import { listaproyectos } from "./seeds/proyectosData"
import { listamodulos } from "./seeds/modulosData"
import { listatareas } from "./seeds/tareasData"
import {idiomas} from "./seeds/idiomasData"
import {listausuarios} from "./seeds/usuariosData"
import { listagenero } from "./seeds/generoData"
import {listaempresas} from "./seeds/empresasData"

const prisma= new PrismaClient()

async function main(){
    console.log('sembrando vida')
    
    await prisma.modules.createMany({
        data:listamodulos,
    })
    await prisma.tasks.createMany({
        data:listatareas,
    })
    
    /*
    await prisma.projects.createMany({
        data:listaproyectos,
    })
    

    

    
    await prisma.companies.createMany({
        data:listaempresas,
    })

     await prisma.language.createMany({
        data:idiomas
    })
    await prisma.gender.createMany({
        data:listagenero
    })
    await prisma.user.createMany({
        data:listausuarios
    })
    */       

}
main().catch(e=>{
    console.log(e)
    process.exit(1)
}).finally(()=>{
    prisma.$disconnect
})
