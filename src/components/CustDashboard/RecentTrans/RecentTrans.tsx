import { Box,Card, CardContent, Typography } from '@mui/material'
import React from 'react'

const RecentTrans = () => {
  return (
    <Box sx={{padding:2}}>
    <Card>
        <CardContent>
            <Typography>
                Recent Transactions
            </Typography>
            <Box sx={{backgroundColor:"lightgrey",
            padding:0.5,display:"flex",justifyContent:"space-between"}}>
                <Box>
                <Typography>Merchant 1</Typography>
                <Typography>2026-05-19</Typography>
                </Box>
                <Box>
                <Typography>KES 500</Typography>
                <Typography>PAID</Typography>
                </Box>
            </Box>
        </CardContent>
    </Card>
    </Box>
  )
}

export default RecentTrans