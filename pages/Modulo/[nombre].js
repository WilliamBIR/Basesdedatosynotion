import Cabecera from "../../components/Cabecera"
import HomeIcon from '@mui/icons-material/Home';
import {Link, Autocomplete, Button, AppBar, Toolbar, Typography, Box, TextField, Select, MenuItem, InputLabel, FormControl , Grid, IconButton, FormGroup } from "@mui/material";
import Formulario from '@lcmconsultoria/componente-formulario/lib/App'
import { useQuery } from "react-query";
import { signIn, signOut, useSession } from 'next-auth/react'
import Tohome from '../../components/Tohome'
import projectname from "../../src/projectManager/project/projectname";



const fetchEmpleadosRequest = async Empleado=>{
  const data2={Otro:Empleado}
  const response = await fetch ('../api/bases/Obtenerempleados',{
      body:JSON.stringify(data2),
      method:'POST',
      headers:{
          'Content-Type':'application/json'
      }
  })
  const data= await response.json()
  const {Trabajadores}= data
  return Trabajadores
}



export default function Agregarmodulo({Proyecto}){
      const { data: session, status } = useSession()
      const {data:Trabajadores2}=useQuery(
        ['Trabajadores','Trabaja'],
        fetchEmpleadosRequest
      )
      
      var listatrabajadores=[]
      if(Trabajadores2){
        for(let trabajador of Trabajadores2){
          listatrabajadores.push(trabajador.userName)
        }
      }
      const modulo=[
      [
        "Informacion del nuevo Modulo",
        [
            {
                inputtype:"textfield",
                inputsubtype:"text",
                inputplaceholder:" Titulo del nuevo modulo",
                inputdefault:"",
                inputlabel:"Nombre del modulo",
                inputtamaño:400,
                inputnombre:"moduleName"
            },
            {
                inputtype:"select",
                inputplaceholder:"Lider",
                inputdefault:'',
                inputlabel:"Lider",
                inputtamaño:400,
                inputnombre:"employeeName",
                inputopciones:listatrabajadores
            }
        ]
    ]        
    ]

    const handleOnSubmit=async (e)=>{
        e.preventDefault()
        console.log("subiendo")
        const formData= new FormData(e.currentTarget)
        const moduleName=formData.get('moduleName')
        const employeeName=formData.get("employeeName")
        const projectId=Proyecto.projectId
        //console.log(nombremodulo)
        //console.log(responsable)
        if(moduleName && employeeName){
          console.log('Ok')
          const body={moduleName,employeeName,projectId}
          await fetch(`../api/bases/modulo/post`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(body),
          })
          console.log('Subido')
        }
        else{
          console.log('error')
        }
        
    }
    
    if(session){
    if(Proyecto){
    return(
        <div>
          <Tohome />
          <Cabecera Titulo={Proyecto.projectName}/>
          <form onSubmit={handleOnSubmit}>
            <FormGroup>
              <Formulario inputs={modulo}/>
            </FormGroup>
            <Button type='submit' variant="contained" color="secondary">Guardar</Button>
          </form>
          <Link href={`/Agregar`}>
              <IconButton aria-label='Agregar Modulo' size="large" color='secondary'>
                  <HomeIcon/>
              </IconButton>
          </Link>
        </div>
    )
    }
    return(
      <div>
        <Cabecera Titulo="Proyecto no encontrado, Volver a home"/>
        <Link href={`/Agregar`}>
              <IconButton aria-label='Agregar Modulo' size="large" color='secondary'>
                  <HomeIcon/>
              </IconButton>
        </Link>
      </div>
    )
    }
    return(
      <div>
      <Typography>Sin session iniciada, vuelva a home</Typography>
      <Tohome />
      </div> 
    )
}



export async function getServerSideProps({params}){
    //console.log(params.nombre)
    var Datos={
      projectName:params.nombre
    }
    
    const Proyecto= await projectname(Datos)
    return{
      props:{
        Proyecto,

      }
    }
}