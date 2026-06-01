import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, Container, Button, Box, List, ListItem, ListItemButton, ListItemText, IconButton } from '@mui/material'
import { useMediaQuery, useTheme, Drawer } from '@mui/material'
import { useDispatch } from 'react-redux'
import {logOut} from "../../../state/reducers/authSlice"


const Navbar = () => {
    

    const[drawerOpen,setDrawerOpen]=useState(false)
    const theme=useTheme()
    const isMobile=useMediaQuery(theme.breakpoints.down('md'))
    const dispatch=useDispatch()

    const drawerLinks=[{
        text:"Home",
        link:"#Home"
    }]

    const onLogOut=()=>{
      dispatch(logOut())
    }

  return (
        <AppBar position="sticky" color="primary">
          <Toolbar sx={{justifyContent:"space-between"}}>
            {/* {isMobile && (
                <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
                <MenuIcon/>
                </IconButton>
            )} */}

            <Typography>
              Customer Dashboard
            </Typography>
            <Button color="inherit" onClick={onLogOut}>Logout</Button>
          </Toolbar>
        </AppBar>
  )
}

export default Navbar