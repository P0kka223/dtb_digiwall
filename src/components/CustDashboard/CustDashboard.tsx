import Navbar from './Navbar/Navbar'
import CustWallet from './CustWallet/CustWallet'
import { Box,Toolbar} from '@mui/material'
import { styled } from '@mui/material/styles';
import QuickActions from './QuickActions/QuickActions';
import RecentTrans from './RecentTrans/RecentTrans';




function CustDashboard() {


  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      // FIX: Ensure 'space-between' or 'space-around' is NOT here.
      // 'flex-start' aligns everything naturally to the top.
      justifyContent: 'flex-start' 
    }}>
      <Navbar />

      
      <Box sx={{ p: 4,display:'flex',flexFlow: 'row wrap',justifyContent:'space-around'}}>
        <CustWallet />
        <QuickActions/>
      </Box>
      <RecentTrans/>
    </Box>

  );
}

export default CustDashboard
