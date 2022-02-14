import {CardActions,CardContent,CardActionArea, Card, AppBar, Toolbar, Typography, Box, TextField, Select, MenuItem, InputLabel, FormControl, Button, CardMedia, Grid } from "@mui/material";
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import React,{useState, useEffect} from 'react';
import { signIn, signOut, useSession } from 'next-auth/react'
import Tohome from '../../components/Tohome'
import projectname from "../../src/projectManager/project/projectname";
import modulesxproject from "../../src/projectManager/modules/modulesxproject";
import tasksxmodule from "../../src/projectManager/tasks/tasksxmodule";
import getAllTasks from "../../src/notion/task/getAllTasks"
import { useRouter } from 'next/router';


//Ejemplo de circular progress 
function CircularProgressWithLabel(props) {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress circle='red' style={{'color':'#F49009'}} thickness={10} size={150} variant="determinate" {...props} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary">
            {`${Math.round(props.value)}%`}
          </Typography>
        </Box>
      </Box>
    );
  }  
  CircularProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate variant.
     * Value between 0 and 100.
     * @default 0
     */
    value: PropTypes.number.isRequired,
  };


export default function proyecto({Proyecto2,Modulos2,Tareas2}){
    const router = useRouter();
    const { data: session, status } = useSession()
    var cuantastareas=0
    var completadas=0
    const [Proyecto,setProyecto]=useState(Proyecto2)
    const [Modulos,setModulos]=useState(Modulos2)
    const [Tareas,setTareas]=useState(Tareas2)
    
    const handleActualizar=async (e)=>{
        e.preventDefault()
        const body={Proyecto}
        try{
          await fetch(`../api/bases/tareas/post/actualizarnotion`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(body),
          })          
          router.replace(router.asPath)
        }catch(error){
          console.log(error)
        }
    }

    for(let i=0; i<Modulos.length;i++){
        for(let Tarea of Tareas[i]){
          if(Tarea.taskComplete){
            completadas+=1
          }
          cuantastareas+=1
        }
    }
    if(session){
    return(
        <div>
            <Tohome></Tohome>
            <AppBar style={{background:'#0CA8C7' }} position="relative">
            <Toolbar>
                <Typography variant="h4" color="black" noWrap>
                   { Proyecto.projectName}
                </Typography>
            </Toolbar>
            </AppBar>      
            <Box sx={{p:2}}>  
                <Typography> Fase: {Proyecto.projectStatus}</Typography>
            </Box>
            <Box sx={{p:2}}>
                <Grid container>
                    <Grid item xs={8}>
                    <Typography> Fecha de entrega: {Proyecto.projectDate}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                    <form onSubmit={handleActualizar}>
                    <Button type='submit' >Actualizar Notion</Button>
                    </form>
                    <Typography>Ultima revision.</Typography>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{p:2}}>
                <Grid container>
                    <Grid item xs={8}>
                        <Typography>Vision del proyecto: {Proyecto.projectVision}</Typography>
                        <Typography> [Objetivos del proyecto]</Typography>
                        <Grid container>
                            <Grid item xs={5.5}>
                                <Typography textAlign='center'>Terminados</Typography>
                                <Box bgcolor='#099CF4'>
                                    {Modulos.map((Modulo,i)=>{
                                      
                                      return(
                                      <div key={Modulo.moduleName}>
                                      <Typography variant="h5" textAlign='center'>{Modulo.moduleName}</Typography>
                                      <br />
                                      {
                                        Tareas[i].map(Tarea=>{
                                          if(Tarea.taskComplete){
                                          return(
                                            <div key={Tarea.taskName+Tarea.taskId}>
                                            <Typography >{Tarea.taskName}</Typography>
                                            <br />
                                            </div>
                                            )
                                          }
                                        })
                                      }
                                      </div>
                                      )
                                    })
                                    }
                                </Box>
                            </Grid>
                            <Grid item xs={1}>
                            </Grid>
                            <Grid item xs={5.5}>
                            <Typography textAlign='center'>Proximo desarrollo</Typography>    
                                <Box bgcolor='#EFE396' >
                                {Modulos.map((Modulo,i)=>{
                                      
                                      return(
                                      <div key={Modulo.moduleName}>
                                      <Typography variant="h5" textAlign='center'>{Modulo.moduleName}</Typography>
                                      <br />
                                      {
                                        Tareas[i].map(Tarea=>{
                                          if(!Tarea.taskComplete){
                                          return(
                                            <div key={Tarea.taskName+Tarea.taskId}>
                                            <Typography >{Tarea.taskName}</Typography>
                                            <br />
                                            </div>
                                            )
                                          }
                                        })
                                      }
                                      </div>
                                      )
                                    })
                                    }
                                </Box>
                            </Grid>
                        </Grid>
                        </Grid>
                    <Grid item xs={1}>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant='h5'>Status del proyecto</Typography>
                        <CircularProgressWithLabel value={(completadas/cuantastareas)*100} />
                        <Typography variant='h5' textAlign='center'>Dudas:</Typography>
                        {Modulos.map(Modulo=>{
                          return(
                            <div key={Modulo.moduleName+Modulo.moduleQuestion}>
                                <Typography variant="h6" textAlign='center'>{Modulo.moduleName}</Typography>
                                <Typography>{Modulo.moduleQuestion}</Typography>
                            </div>
                          )
                        })

                        }
                    </Grid>
                </Grid>
            </Box>
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
  //console.log(params)
  var Datos={
      projectName:params.nombre
  }

  const Proyecto2= await projectname(Datos)
  //console.log(Proyecto2)
  if(!Datos.projectId){
    Datos.projectId=Proyecto2.projectId
  }
  
  const Modulos2= await modulesxproject(Datos)

  var Tareas2=[]
  for(let Modulo of Modulos2){
    const Tarea= await tasksxmodule(Modulo)
    Tareas2.push(Tarea) 
  }
  return{
    props:{
      Proyecto2,
      Modulos2,
      Tareas2
    }
  }
}