import * as React from 'react'
import { useState } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'

import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'

import CoronavirusIcon from '@mui/icons-material/Coronavirus';

const steps = ["2", "3", "4"]
const stepMap = [-1, 0, 0, 0, 1, 1, 2]
const progressMap = [0, 33, 66, 100, 50, 100, 100]

function ProgressStepIcon(props) {
  return (
    <Box sx={{ position: 'relative' }}>
      <StepLabel icon={props.icon}/>
      <CircularProgress variant="determinate" value={props.active ? props.subIcon : 0} size={32}
        sx={{
          position: 'absolute',
          top: '0%',
          left: '0%',
          color: 'primary.main',
          marginTop: '-4px',
          marginLeft: '-4px',
        }}
      />
    </Box>
  );
}

export default function InfectionStepper() {
  const [rate, setRate] = useState(0);
  const handleEpidemic = () => { setRate((rate+1) % 7)};

  return (
    <Grid container justifyContent="space-between" alignItems="center" spacing={1}>
      <Grid item xs={12} ss={7} sm={9} md={10}>
        <Stepper activeStep={stepMap[rate]}>
          {steps.map((label, index) => {
            return (<Step key={index} completed={false} >
              <StepLabel icon={label} StepIconProps={{subIcon: progressMap[rate]}} StepIconComponent={ProgressStepIcon}></StepLabel>
            </Step>)
          })}
        </Stepper>
      </Grid>

      <Grid item xs={12} ss="auto">
        <Button variant="contained" fullWidth onClick={handleEpidemic} endIcon={<CoronavirusIcon/>}>
          Epidemic
        </Button>
      </Grid>
    </Grid>
  );
}