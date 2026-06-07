// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import { useNavigate } from 'react-router-dom';


// const QuickActions = () => {
//   const navigate=useNavigate()
//   return (
//     <Card sx={{margin: 5}}>
//         <CardContent>
//             <Typography>Quick Actions</Typography>
//             <Button onClick={()=>navigate("../../MerchantPaymentReq/MerchantPaymentReqForm.tsx")}>Create New Payment Request</Button><br/>
//             <Button>View All Payment Requests</Button>
//         </CardContent>
//     </Card> 
//   )
// }

// export default QuickActions

import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <Card sx={{ margin: 5 }}>
        <CardContent>
            <Typography variant="h6" gutterBottom>Quick Actions</Typography>
            
            {/* Navigate using the clean URL path defined in your Routes */}
            <Button 
              variant="contained" 
              onClick={() => navigate("/create-payment")}
            >
              Create New Payment Request
            </Button>
            
            <br/><br/>
            
            <Button 
              variant="outlined" 
              onClick={() => navigate("/all-payments")}
            >
              View All Payment Requests
            </Button>
        </CardContent>
    </Card> 
  );
};

export default QuickActions;