import {Link, Autocomplete, Button, AppBar, Toolbar, Typography, Box, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import {useQuery} from 'react-query'
import Cabecera from '../../components/Cabecera'
import Tohome from '../../components/Tohome'
import {useState} from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import getTask from "../../src/notion/task/getTask";


const fetchEmpresasRequest = async Empresa=>{
    const data2={Otro:Empresa}
    const response = await fetch ('../api/bases/Obtenerempresas',{
        body:JSON.stringify(data2),
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        }
    })
    const data= await response.json()
    const {Empresas}= data
    return Empresas
}

export default function Indexagregar(){
    const { data: session, status } = useSession()
    
    const [Datos,setDatos]=useState(
        {
            companyName:'',
        }
    )
    const {data:Empresas2}=useQuery(
        ['Empresa',Datos],
        fetchEmpresasRequest
    )

    
    var listaEmpresas=[]
    if(Empresas2){
        for(let Empresa of Empresas2){
            listaEmpresas.push(Empresa.companyName)
        }
    }
    else{
        listaEmpresas=[]
    }
    
    const handleInput=(e)=>{
        setDatos(prevDatos=>({
            ...prevDatos,
            ['companyName']:e.target.value
        }))
    }

    const handleSelect=(e,value)=>{
        setDatos(prevDatos=>({
            ...prevDatos,
            ['companyName']:value
        }))
    }
    if(session){
    return(
        <div>
            <Cabecera
            Titulo='Buscar por empresa'/>
            <Autocomplete 
            value={Datos.companyName}
            onChange={handleSelect}
            onInputChange={handleInput}
            options={listaEmpresas}
            sx={{ width: 400, p: 1 }}
            renderInput={params => <TextField {...params} label='Empresa' />}
            />
            
            <Link href={`/Agregar/${Datos.companyName}`} 
            sx={{p:1}}>
                <Button variant='contained' color='secondary'>Buscar</Button>
            </Link>
            <br/>
            <br/>
            <Tohome/>
        </div>
    )}
    return(
        <div>
            <Typography>Sin session iniciada, vuelva a home</Typography>
            <Tohome />
        </div>
    )
}




