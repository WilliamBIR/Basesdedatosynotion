import {AppBar, Toolbar, Typography, Box, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";


export default function Cabecera({Titulo}:any){
    return(
        <div>
            <AppBar style={{background:'#0CA8C7' }} position="relative">
            <Toolbar>
                <Typography variant="h4" color="black" noWrap>
                    {Titulo}
                </Typography>
            </Toolbar>
            </AppBar>  
        </div>
    )
}