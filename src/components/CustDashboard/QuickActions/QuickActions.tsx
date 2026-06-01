import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const QuickActions = () => {
  return (
    <Card sx={{maxWidth:500}}>
        <CardContent>
            <Typography>Quick Actions</Typography>
            <Button>Pending Payments</Button><br/>
            <Button>Transaction History</Button>
        </CardContent>
    </Card> 
  )
}

export default QuickActions