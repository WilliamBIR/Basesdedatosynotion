import {IconButton, Link, AppBar, Toolbar, Typography, Box, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import {useState} from 'react'
import { useQuery } from 'react-query'
import Cabecera from "./Cabecera";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Cards from './Cartas'

const fetchProyectosRequest = async(Datos:any)  => {
    
    const data2 = { Otro: Datos }
    const response = await fetch('./api/bases/Obtenerproyectos', {
      body: JSON.stringify(data2),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    const { Proyectos } = data
    return Proyectos
  }


export default function Listaproyectos(){
    const tamanoh=200
    const [Datos,setDatos]=useState(
        {
            projectName:'',
            projectStatus:'',
        }
    )
    const {data: listaproyectos}=useQuery(['Proyectos', Datos],fetchProyectosRequest)
        
    var proyectos=[]
    if(listaproyectos){
        proyectos=listaproyectos
    }
    //console.log(proyectos)
    const handleStatus=(e:any)=>{
        setDatos(prevDatos=>({
            ...prevDatos,
            ["projectStatus"]:e.target.value
        }))
    }

    const handleNombreChange=(e:any)=>{
        setDatos(prevDatos=>({
            ...prevDatos,
            ["projectName"]:e.target.value
        }))
    }

    return (
        <div>
            <Cabecera 
            Titulo='Proyectos LCM'/>
            <Box sx={{p:2}}>
                <TextField onChange={handleNombreChange}  style={{borderColor: '#0DD5FD'}} label='Nombre del proyecto' sx={{width:tamanoh,height:50,m:1}}></TextField>
                <FormControl>
                <InputLabel>Status del proyecto </InputLabel>
                <Select onChange={handleStatus} defaultValue="" style={{border: '#0CA8C7'}} label='Status del proyecto' sx={{width:tamanoh ,m:1}}>
                    <MenuItem value="">
                        <em>Todos</em>
                    </MenuItem>
                    <MenuItem value="Activo">Activo</MenuItem>
                    <MenuItem value="Atrasado">Atrasado</MenuItem>
                    <MenuItem value="Detenido">Detenido</MenuItem>
                </Select>
                </FormControl>  
                <Link href={`/Agregar`}>
                <IconButton aria-label='Agregar Modulo' color='primary'>
                    <AddCircleOutlineIcon/>
                </IconButton>
              </Link>
            </Box>
            <Box  sx={{p:2}}>
            <Cards proyectos={proyectos}/>          
            </Box>
        </div>
    )
}