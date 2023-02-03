// export default function Navbar() {
//     return (
//         <div>
//             <h1>Navbar</h1>
//         </div>
//     )
// }

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, NavLink } from "react-router-dom";
import { style } from '@mui/system';
import styles from '../styles/navbar.module.css'
export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar  position="static" style = {{"backgroundColor":"#061121"}}>
        <Toolbar className = {styles.navbar}>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Button  color="inherit"><Link to = '/' className={styles.headlink}> Consesys Snaps </Link></Button>
          </Typography>
          <div>
            <Button  color="inherit"><Link to = '/dapps' className={styles.link}> Dapps </Link></Button>
            <Button  color="inherit"><Link to = '/featured' className={styles.link}> Featured </Link></Button>
            <Button  color="inherit"><Link to = '/snaps' className={styles.link}> Snaps </Link></Button>
            <Button  color="inherit"><Link to = '/saved' className={styles.link}> Saved </Link></Button>
          </div>
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}