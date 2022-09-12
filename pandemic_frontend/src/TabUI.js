import * as React from 'react';
import { useState } from 'react';

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import InfectionTab from './InfectionTab';


export default function TabUI() {
  const [tabId, setTabId] = useState("infection");
  const handleTabChange = (event, newTabId) => { setTabId(newTabId) };

  return (
    <TabContext value={tabId}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleTabChange} >
          <Tab label="Infection Deck" value="infection" />
          <Tab label="Player Deck" value="player" />
        </TabList>
      </Box>

      <TabPanel value="infection" sx={{ px: 0 }} >
        <InfectionTab />
      </TabPanel>

      <TabPanel value="player" sx={{ px: 0 }} >
        <Typography variant="body1" gutterBottom>
          Player Deck not Implemented
        </Typography>
      </TabPanel>
    </TabContext>
  );
}