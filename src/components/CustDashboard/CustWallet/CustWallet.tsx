import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const CustWallet = () => {

  return (
    <>
    <Card variant="outlined" sx={{maxWidth:400}}>
    <CardContent>
        <Typography>Wallet Balance</Typography>
        <Typography>KES  45,050</Typography>
        <Button>Add Balance</Button>
    </CardContent>
    </Card>
    </>
  )
}

export default CustWallet
