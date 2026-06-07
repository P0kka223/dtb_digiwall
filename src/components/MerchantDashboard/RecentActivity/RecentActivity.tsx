import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { ListItem,ListItemButton,ListItemText} from '@mui/material'
import { List,type RowComponentProps } from 'react-window';

function renderRow(props: RowComponentProps) {
    const { index, style } = props;
  
    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton>
          <ListItemText primary={`Item ${index + 1}`} />
        </ListItemButton>
      </ListItem>
    );
  }


const RecentActivity = () => {

  return (
    <>
    <Card variant="outlined" sx={{display:'flex',justifyContent:'center',margin:'5'}}>
    <CardContent>
        <Typography>Recent Activity</Typography>
            <Box
        sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper',display:'inline-flex',justifyContent:"flex-start",gap: 10 }}
        >
        <List
            rowHeight={50}
            rowCount={5}
            style={{
            height: 400,
            width: 1000,
            }}
            rowProps={{}}
            overscanCount={5}
            rowComponent={renderRow}
        />
        </Box>
    </CardContent>
    </Card>
    </>
  )
}

export default RecentActivity
