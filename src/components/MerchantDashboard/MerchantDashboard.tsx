import Navbar from './Navbar/MerchantNavbar'
import { Box,Toolbar} from '@mui/material'
import { styled } from '@mui/material/styles';
import BalanceCard from './BalanceCard/BalanceCards';
import QuickActions from './QuickActions/MerchantQuickActions';
import RecentActivity from './RecentActivity/RecentActivity';




function MerchantDashboard() {


  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      // FIX: Ensure 'space-between' or 'space-around' is NOT here.
      // 'flex-start' aligns everything naturally to the top.
      justifyContent: 'center',
      alignContent:'space-around' 
    }}>
      <Navbar />

      <BalanceCard/>
      <QuickActions/>
      <RecentActivity/>
    </Box>

  );
}

export default MerchantDashboard
