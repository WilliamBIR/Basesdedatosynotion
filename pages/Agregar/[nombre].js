import {CardContent,Card, Link, Autocomplete, Button, AppBar, Toolbar, Typography, Box, TextField, Select, MenuItem, InputLabel, FormControl , Grid, IconButton } from "@mui/material";
import {useQuery} from 'react-query'
import Cabecera from '../../components/Cabecera'
import {useState} from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HomeIcon from '@mui/icons-material/Home';
import Formulario from '@lcmconsultoria/componente-formulario/lib/App'
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import Tohome from '../../components/Tohome'
import { signIn, signOut, useSession } from 'next-auth/react'
import onecompany from "../../src/projectManager/companies/onecompany";


const fetchProyectosRequest = async Proyecto=>{
  const data2={Otro:Proyecto}
  const response = await fetch ('../api/bases/Obtenerproyectos2',{
      body:JSON.stringify(data2),
      method:'POST',
      headers:{
          'Content-Type':'application/json'
      }
  })
  const data= await response.json()
  const {Proyectos}= data
  return Proyectos
}


const fetchModulosRequest = async Modulo=>{
  const data2={Otro:Modulo}
  const response = await fetch ('../api/bases/Obtenermodulos',{
      body:JSON.stringify(data2),
      method:'POST',
      headers:{
          'Content-Type':'application/json'
      }
  })
  const data= await response.json()
  const {Modulos}= data
  return Modulos
}

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




export default function Agregartareas({Empresa}){
    const { data: session, status } = useSession()
    var listaProyectos=[]
    var listaModulos=[]
    var listaEmpleados=[]
    var aux=''
    if(Empresa){
      aux=Empresa.companyName
    }
    const [verificacion,setverificacion]=useState(false)
    const [Datos,setDatos]=useState(
      {
          projectName:'',
          moduleName:'',
          companyName:aux
      }
    )
    const [tareas,setTareas]=useState([])
 

    const {data:Proyectos2}=useQuery(
      ['Proyectos',Datos],
      fetchProyectosRequest
    )

    const {data:Modulos2}=useQuery(
      ['Modulos',Datos],
      fetchModulosRequest
    )
    const {data:Empleados2}=useQuery(
      ['EmpleadosAgregar','TrabajaAgregar'],
      fetchEmpleadosRequest
    )

    if(Empleados2){
      for(let empleado of Empleados2){
        listaEmpleados.push(empleado.userName)
      }
    }
    if(Proyectos2){
      for(let Proyecto of Proyectos2){
        listaProyectos.push(Proyecto.projectName)
      }
    }
    if(Modulos2){
      for(let Modulo of Modulos2){
        listaModulos.push(Modulo.moduleName)
      }
    }

    const handleInput=(input)=>(e)=>{
        setDatos(prevDatos=>({
            ...prevDatos,
            [input]:e.target.value
        }))
    }

    const handleSelect=(input)=>(e,value)=>{
        if(value){
        setDatos(prevDatos=>({
            ...prevDatos,
            [input]:value
        }))
          if(input==="moduleName"){
            setverificacion(true)
          }
        }
        else{
        setDatos(prevDatos=>({
            ...prevDatos,
            [input]:''
        }))
        if(input==="moduleName"){
          setverificacion(false)
        }
        }
    }

    const handleAgregarTarea=e=>{
      var aux=[...tareas]
      aux.push({
        taskName:'',
        employeeName:'Diego Isaac',
        taskPhase:''
      })
      setTareas(aux)
    }

    const handleParametrosTarea=(input)=>(e)=>{
      //console.log(input)
      //console.log(e.target.name)
      //console.log(e.target.value)
      var aux=[...tareas]
      //console.log(aux)
      //console.log(aux[input])
      aux[input][e.target.name]=e.target.value
      //console.log(aux[input])
      setTareas(aux)
    }

    const handleSelectTarea=(input)=>(e,value)=>{
      //console.log(input)
      //console.log(e.target.value)
      var aux=[...tareas]
      aux[input]['employeeName']=e.target.value
      //console.log(aux[input])
      setTareas(aux)
    }

    const handleBorrarTarea=(input)=>(e)=>{
      var aux=[...tareas]
      aux.splice(input,1)
      setTareas(aux)
    }

    const  handleGuardarTareas=async(e)=>{
        e.preventDefault()
        //console.log(Datos)
        //console.log(tareas)
        try{
          const body={Datos,tareas}
          await fetch (`../api/bases/tareas/post`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(body),
          })
          setTareas([])
        }catch(error){
            console.log('error')
        }
    }

    const handleGuardarNotion= async(e)=>{
        e.preventDefault()
        const body={Datos}
        try{
          await fetch(`../api/bases/tareas/post/tareasnotion`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(body),
          })
        }catch(error){
          console.log(error)
        }
    }

    
    //console.log(tareas)
    if(session){
    if(Empresa){   
    return(
        <div>
            <Tohome />
            <Cabecera
            Titulo={Empresa.companyName}/>
            <Box sx={{p:2}}>  
              <Autocomplete 
              value={Datos.projectName}
              onChange={handleSelect('projectName')}
              onInputChange={handleInput('projectName')}
              options={listaProyectos}
              sx={{ width: 400, p: 1 }}
              renderInput={params => <TextField {...params} label='Proyecto' />}
              />
               <Button onClick={handleGuardarNotion}>
                Guardar Notion
              </Button>
              <Box sx={{display:'flex'}} >
              <Autocomplete 
              value={Datos.moduleName}
              onChange={handleSelect('moduleName')}
              onInputChange={handleInput('moduleName')}
              options={listaModulos}
              sx={{ width: 400, p: 1 }}
              renderInput={params => <TextField {...params} label='Modulo' />}
              />
              <Link href={`/Modulo/${Datos.projectName}`}>
              <IconButton aria-label='Agregar Modulo' color='primary'>
                <AddCircleOutlineIcon/>
              </IconButton>
              </Link>
             
              </Box>
            </Box>

            {verificacion ?(
              <>
              
                
              <Box sx={{display:'flex'}}>
                Agregar Tarea
                <IconButton onClick={handleAgregarTarea} aria-label='Agregar Modulo' color='primary'>
                  <AddCircleOutlineIcon/>
                </IconButton>
              </Box>
              <Grid container>
                <Grid item xs={6}>
                
                {tareas.map((supertarea,i)=>{
                  
                    return(
                      <div  key={"Tarea"+i}>
                        <form  onChange={handleParametrosTarea(i)}>
                     
                        {//<Formulario  inputs={aux}/>
                        }
                        <Typography align='center' variant='h5'>Tarea Número {i+1}</Typography>
                        <TextField value={supertarea.taskName} name={'taskName'} key={'tarea'+i} sx={{width:300, ml:3}}  type={'text'}  InputLabelProps={{shrink: true}} label={'Tarea'}/><br/>
                        <br/>
                        <TextField value={supertarea.taskPhase} name={'taskPhase'} key={'fase'+i} sx={{width:300, ml:3}}  type={'text'}  InputLabelProps={{shrink: true}} label={'Fase'}/><br/>
                        <br/>

                        <FormControl sx={{ width: 300, ml:3 }}>
                        <InputLabel   id={"Responsable"+i}>Responsable</InputLabel>
                        <Select value={supertarea.employeeName}  label="Responsable" onChange={handleSelectTarea(i)}>
                        {listaEmpleados.map(aux=>{              
                        return(
                        <MenuItem value={aux} key={'listaEmpleados'+aux+i}>{aux}</MenuItem>
                        )
                        })
                        }
                        </Select>
                        </FormControl>
                        


                        </form>
                        <br/> 
                      </div>
                      
                    )
                })
                }
                 
                
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='h5'>
                  Lista de nuevas tareas
                  </Typography>
                 {tareas.map((tarea,i)=>{
                   return(
                     <Card key={'prueba'+i}>
                       <CardContent>
                         <Grid container>
                         <Grid item xs={11}>
                         <Typography component="div"> Tarea: {tarea.taskName}, Responsable: {tarea.employeeName}, Fase: {tarea.taskPhase}</Typography>
                         </Grid>
                         <Grid item xs={1}>
                         <IconButton onClick={handleBorrarTarea(i)} aria-label="delete" color='error'>
                           <ClearIcon />
                         </IconButton>
                         </Grid>
                         </Grid>
                       </CardContent>
                  </Card>
                   )
                 })}
                  <IconButton onClick={handleGuardarTareas} aria-label="delete" color='error'>
                    <SaveIcon />
                  </IconButton>
                </Grid>
              </Grid> 
              </>
            ):(
              <>
              </>
            )

            }

        </div>
    )
    }
    return(
      <div>
      <Cabecera Titulo="Empresa no encontrada, Volver a home"/>
      <Tohome />
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
    const Datos={
      companyName:params.nombre
    }
    const Empresa = await onecompany(Datos)
    return{
      props:{
        Empresa,

      }
    }
}