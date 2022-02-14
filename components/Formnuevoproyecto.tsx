import Formulario from '@lcmconsultoria/componente-formulario/lib/App'
import { Button, FormControl, FormGroup } from '@mui/material'
import { Box } from '@mui/system'
import {useState} from 'react'

export default function Formnuevoproyecto(){
    const [inputs,setinputs]=useState(
        [
        [
            "Nuevo proyecto",
            [
                {
                    inputtype:"textfield",
                    inputsubtype:"text",
                    inputplaceholder:" Titulo del nuevo proyecto",
                    inputdefault:"Nuevo proyecto",
                    inputlabel:"Nombre del proyecto",
                    inputtamaño:400,
                    inputnombre:"tituloproyecto"
                },
                {
                    inputtype:"textfield",
                    inputsubtype:"text",
                    inputplaceholder:" Nombre del Cliente",
                    inputdefault:"Nombre del Cliente",
                    inputlabel:"Nombre del Cliente",
                    inputtamaño:400,
                    inputnombre:"nombrecliente"
                },
                {
                    inputtype:"textfield",
                    inputsubtype:"date",
                    inputplaceholder:"Fecha de entrega",
                    inputdefault:"2022-01-01",
                    inputlabel:"Fecha de entrega",
                    inputtamaño:400,
                    inputnombre:"fechaentrega"
                },
                {
                    inputtype:"textfield",
                    inputsubtype:"text",
                    inputplaceholder:"Vision",
                    inputdefault:"Vision del proyecto",
                    inputlabel:"Vision del proyecto",
                    inputtamaño:400,
                    inputnombre:"visionproyecto"
                },
                {
                    inputtype:"select",
                    inputplaceholder:"Lider",
                    inputdefault:'',
                    inputlabel:"Lider",
                    inputtamaño:400,
                    inputnombre:"proyectolider",
                    inputopciones:[]
                }
            ]
        ]
        ]
    )
    const [contadormodulos,setcontadormodulos]=useState(1)
    const [contadortareas,setcontadortareas]=useState([0])
    const [modulos,setmodulos]=useState([
        [
            "Modulo Número 1",
            [
                {
                    inputtype:"textfield",
                    inputsubtype:"text",
                    inputplaceholder:" Titulo del nuevo modulo",
                    inputdefault:"Nuevo modulo",
                    inputlabel:"Nombre del modulo",
                    inputtamaño:400,
                    inputnombre:"titulomodulo0"
                },
                {
                    inputtype:"select",
                    inputplaceholder:"Lider",
                    inputdefault:'',
                    inputlabel:"Lider",
                    inputtamaño:400,
                    inputnombre:"modulolider0",
                    inputopciones:[]
                }
            ]
        ]        
    ])

    const [tareas,settareas]=useState([
        [
        [    
            "Tarea 1",
            [
                {
                inputtype:"textfield",
                inputsubtype:"text",
                inputplaceholder:" Titulo de la tarea",
                inputdefault:"Nueva Tarea",
                inputlabel:"Nombre de la Tarea",
                inputtamaño:300,
                inputnombre:"tarea10"
                },
            ]
        ]
        ]
    ])

    const agregarModulo=()=>{
        setcontadormodulos(contadormodulos+1)
        console.log(contadormodulos)
        var aux=modulos
        var aux2=[
            "Modulo Número "+ (contadormodulos+1),
            [
                {
                    inputtype:"textfield",
                    inputsubtype:"text",
                    inputplaceholder:" Titulo del nuevo modulo",
                    inputdefault:"Nuevo modulo",
                    inputlabel:"Nombre del modulo",
                    inputtamaño:400,
                    inputnombre:"titulomodulo0"
                },
                {
                    inputtype:"select",
                    inputplaceholder:"Lider",
                    inputdefault:'',
                    inputlabel:"Lider",
                    inputtamaño:400,
                    inputnombre:"modulolider0",
                    inputopciones:[]
                }
            ]
        ]
        aux.push(aux2)
        setmodulos(aux)
        var auxt=contadortareas
        var auxt2=0
        auxt.push(auxt2)
        setcontadortareas(auxt)
        var auxt22=tareas
        auxt22.push([
            [    
                "Tarea 1",
                [
                    {
                    inputtype:"textfield",
                    inputsubtype:"text",
                    inputplaceholder:" Titulo de la tarea",
                    inputdefault:"Nueva Tarea",
                    inputlabel:"Nombre de la Tarea",
                    inputtamaño:300,
                    inputnombre:"tarea"+(contadormodulos+1)+"0"
                    },
                ]
            ]
        ])
    }
    const [totaltareas,settotaltareas]=useState(1)
    const agregarTarea=(i:any)=>{

        var aux= contadortareas
        aux[i]=aux[i]+1
        setcontadortareas(aux)
        var aux2=tareas
        aux2[i].push(
        [
            "Tarea "+(aux[i]+1),
            [
            {
                inputtype:"textfield",
                inputsubtype:"text",
                inputplaceholder:" Titulo de la tarea",
                inputdefault:"Nueva Tarea",
                inputlabel:"Nombre de la Tarea",
                inputtamaño:300,
                inputnombre:"tarea"+(i+1)+"0"
            },
            ]
        ]
        )
        settareas(aux2)  
        settotaltareas(totaltareas+1)
    }
    
    const handleOnSubmit=(e:any)=>{
        e.preventDefault()
        console.log("subiendo")
        const formData= new FormData(e.currentTarget)
        const nombreproyecto=formData.get('tituloproyecto')
        const cliente=formData.get("nombrecliente")
        const fecha=formData.get("fechaentrega")
        const vision=formData.get("visionproyecto")
        const lider=formData.get("proyectolider")
        const proyecto=[nombreproyecto,cliente,fecha,vision,lider]
        console.log(proyecto)
        const nombremodulos=formData.getAll("titulomodulo0")
        const responsablemodulos=formData.getAll("modulolider0")
        console.log(nombremodulos)
        console.log(responsablemodulos)
        console.log(contadortareas)
        var aux=[]
        for(var i=0; i<contadortareas.length;i++){
            console.log(i)
                const nombretareas=formData.getAll("tarea"+(i+1)+"0")
                aux.push(nombretareas)
            
        }
        console.log(aux)


    }
    
    return(
        <form onSubmit={handleOnSubmit}>
        <FormGroup>
        <Formulario inputs={inputs}/>
            {modulos.map((modulo:any,i:any)=>{
                return(
                    <div key={modulo[0]}>
                        <Formulario inputs={[modulo]} />
                        {
                            tareas[i].map((tarea:any)=>{
                                return(
                                    <div key={tarea[0]+i}>
                                        <Formulario inputs={[tarea]} />
                                    </div>   
                                )
                            })
                        }
                        <Button sx={{width:200}} variant="contained" color="inherit" onClick={()=>agregarTarea(i)}>Agregar Tarea</Button>
                    </div>
                )
            })
            }
        <Button sx={{width:200}} variant="contained" color="primary" onClick={agregarModulo}>Agregar Modulo</Button>
        </FormGroup>
        <Button type='submit' variant="contained" color="secondary">Guardar</Button>
        </form>
    )
}