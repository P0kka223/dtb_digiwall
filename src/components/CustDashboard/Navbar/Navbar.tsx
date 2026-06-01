import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, Container, Button, Box, List, ListItem, ListItemButton, ListItemText, IconButton } from '@mui/material'
import { useMediaQuery, useTheme, Drawer } from '@mui/material'


const Navbar = () => {
    const[drawerOpen,setDrawerOpen]=useState(false)
    const theme=useTheme()
    const isMobile=useMediaQuery(theme.breakpoints.down('md'))

    const drawerLinks=[{
        text:"Home",
        link:"#Home"
    }]

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
            <Button color="inherit">Logout</Button>
          </Toolbar>
        </AppBar>
  )
}

export default Navbar