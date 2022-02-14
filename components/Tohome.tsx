import {Link, Autocomplete, Button, AppBar, Toolbar, Typography, Box, TextField, Select, MenuItem, InputLabel, FormControl, IconButton } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';

export default function Tohome(){
    return(
        <div>
            <Link href={`/`} 
            sx={{p:1}}>
               <IconButton aria-label='Agregar Modulo' size="large" color='secondary'>
                  <HomeIcon/>
              </IconButton>
            </Link>
        </div>
    )
}