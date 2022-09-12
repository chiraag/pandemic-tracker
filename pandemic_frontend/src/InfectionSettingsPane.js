import * as React from 'react';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

const fixedMode = (mode) => ((mode === 'epidemic') || (mode === 'discard'));

function range(start, end) {
  return Array.from({length:(end-start+1)}, (_,i) => start + i)
}

export const modes = [
    { value: 'draw', label: 'Draw Infections' },
    { value: 'epidemic', label: 'Epidemic Infect' },
    { value: 'forecast', label: 'Forecast' },
    { value: 'discard', label: 'Discard' },
];

function ModeSelect(props) {
  const {title, modes, value, callback} = props;

  return (
    <TextField
      label={title}
      name={title.toLowerCase()}
      value={value}
      onChange={callback}
      select
      fullWidth
      variant="standard"
    >
      {modes.map(
        (mode) => (<MenuItem key={mode.value} value={mode.value}> {mode.label} </MenuItem>)
      )}
    </TextField>
  );
}

function IntSelect(props) {
  const {title, mode, start, end, value, callback} = props;
  const getKey = (option) => (title.toLowerCase()+"-"+String(option));

  return (
    <TextField
      label={title}
      name={title.toLowerCase()}
      value={value}
      disabled={fixedMode(mode)}
      onChange={callback}
      select
      fullWidth
      sx={{maxWidth: "64px"}}
      variant="standard"
    >
      {range(start, end).map(
        (option) => (<MenuItem key={getKey(option)} value={option}> {option} </MenuItem>)
      )}
    </TextField>
  );
}

export function InfectionSettingsPane ({settings, settingsCallback}) {
  const updateSettings = (event) => {
    if (event.target.name == "cards") {
      settingsCallback({...settings, cards: event.target.value});
    } else if (event.target.name == "mode") {
      const nextMode = event.target.value;
      if (fixedMode(nextMode)) {
        settingsCallback({...settings, cards: 1, mode: nextMode});
      } else {
        settingsCallback({...settings, mode: nextMode});
      }
    }
  };

  return (
    <Stack direction="row" spacing={2}>
      <ModeSelect title="Mode" fullWidth modes={modes} value={settings.mode} callback={updateSettings}/>
      <IntSelect title="Cards" mode={settings.mode} start={1} end={6} value={settings.cards} callback={updateSettings}/>
    </Stack>
  );
}