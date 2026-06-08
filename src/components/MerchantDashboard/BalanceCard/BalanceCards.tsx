import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useGetWalletBalanceQuery } from '../../../features/api/api';
import { Box } from '@mui/material';



const balanceCards = () => {
  const { data: walletBalances,isError,isLoading} = useGetWalletBalanceQuery();


// 1. Handle the loading state first
if (isLoading) {
  return (
    <Card variant="outlined" sx={{ maxWidth: 400 }}>
      <CardContent>
        <Typography>Component Loading...</Typography>
      </CardContent>
    </Card>
  );
}

// 2. Handle the error state (or missing data) safely
if (isError || !walletBalances) {
  return (
    <Card variant="outlined" sx={{ maxWidth: 400 }}>
      <CardContent>
        <Typography color="error">Failed to load balance.</Typography>
      </CardContent>
    </Card>
  );
}

  return (
    <>
    <Box sx={{ p: 4,display:'flex',flexFlow: 'row wrap',justifyContent:'space-around'}}>
    <Card variant="outlined" sx={{maxWidth:400}}>
    <CardContent>
        <Typography>Available Balance:</Typography>
        <Typography>KES {walletBalances.availableBalance}</Typography>
        <Typography>Last Settlement: 2026-05-20</Typography>
        {/* <Button>Top Up Balance</Button> */}
    </CardContent>
    </Card>
    <Card variant="outlined" sx={{maxWidth:400}}>
    <CardContent>
        <Typography>Available Balance:</Typography>
        <Typography>KES {walletBalances.pendingBalance}</Typography>
        <Typography>Last Settlement: 2026-05-20</Typography>
    </CardContent>
    </Card>
    </Box>
    </>
  )
}

export default balanceCards
