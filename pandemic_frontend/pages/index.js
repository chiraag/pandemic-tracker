import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import TabUI from '../src/TabUI'
import Copyright from '../src/Copyright'

export default function Home() {
  return (
    <Container maxWidth="md" sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
      <Box sx={{mt: 2, flex: '1 1 auto'}}>
        <Typography variant="h4" component="h1" >
          Pandemic Tracker
        </Typography>

        <TabUI />
      </Box>
      <Box sx={{mb:2}}>
        <Copyright />
      </Box>
    </Container>
  )
}
