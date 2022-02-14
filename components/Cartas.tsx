import {CardActionArea, Card, Typography, Box,  CardMedia, Grid} from "@mui/material";
import CardContent from '@mui/material/CardContent'
import React from "react";

export default function Cards({proyectos}:{proyectos:any}){
    return (
    <div>
    {proyectos.map((proyecto:any)=>{
        var aux='rojo.png'
        if(proyecto.projectStatus==='Atrasado'){
            aux='amarillo.png'
        }
        else if(proyecto.projectStatus==='Activo'){
            aux='verde.png'
        }    
        return(
        <Card sx={{ display:'inline-block',m:1, width:400, border:'1p #0CA8C7'}} key={proyecto.projectName}>
        <CardActionArea
                component="a"
                href={`/proyecto/${proyecto.projectName}`} 
                onClick={() => console.log("CardActionArea clicked in + " +proyecto.projectName)}
        >
        <Box sx={{display:'flex',flexDirection:'column'}}>
        <CardContent >
        <Grid container>
            <Grid item xs={10}>
            <Typography   variant='h6' >{proyecto.projectName}</Typography>
            </Grid>
            <Grid item xs={2}>
        <CardMedia
            component='img'
            sx={{display:'inline-block',width:40}}
            src={aux}
            alt='prueba'
        />
        </Grid>
        </Grid>
        <Typography component="div" >Cliente: {proyecto.projectCostumer}</Typography>
        <Typography component="div">Encargado: {proyecto.projectEmployee}</Typography>
        <Typography component="div">Fecha de entrega: {proyecto.projectDate}</Typography>
        </CardContent>
        </Box>       
        </CardActionArea>
        </Card>
        )

    })}
    </div>
    )
}