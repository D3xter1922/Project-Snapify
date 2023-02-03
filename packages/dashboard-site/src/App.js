import React, { useLayoutEffect } from 'react';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Route, Routes } from "react-router-dom";
import Dapps from './screens/Dapps.jsx';
import Featured from './screens/Featured.jsx';
import Snaps from './screens/Snaps.jsx';
import Saved from './screens/Saved.jsx';
import Navbar from './nav/Navbar.jsx';


import styles from './styles/app.module.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f44336',
    },
  },
});


function App() {
  console.log(styles)
  useLayoutEffect(() => {
    document.body.style.backgroundColor = '#061121';
  });
  return (
    <div className={styles.app}>
      <Navbar className = {styles.navbar}/>
      <Routes >
        <Route path="/" element={<Dapps />}  />
        <Route path="/dapps" element={<Dapps />} />
        <Route path="/featured" element={<Featured />} />
        <Route path="/snaps" element={<Snaps />} />
        <Route path="/saved" element={<Saved />} />
      </Routes>
    </div>
  );
}

export default App;
