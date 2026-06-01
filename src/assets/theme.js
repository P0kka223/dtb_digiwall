import { Palette } from '@mui/icons-material'
import { useTheme } from '@mui/material'
import React from 'react'

const theme=useTheme({
  palette:{
    primary:{
        main: "red",
    },
    secondary:{
        main:"white",
    },
  }
})

export default theme