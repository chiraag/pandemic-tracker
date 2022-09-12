import * as React from 'react';
import { useState } from 'react';

import {InfectionSettingsPane, modes} from './InfectionSettingsPane';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';

import Button from '@mui/material/Button';
import ReplayIcon from '@mui/icons-material/Replay';

import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Chip from '@mui/material/Chip';

const cities = [
  "Atlanta", "Chicago", "Essen", "London", "Madrid", "Milan",
  "Montreal", "New York", "Paris", "San Francisco", "St Petersburg", "Washington",
  "Bangkok", "Beijing", "Ho Chi Minh", "Jakarta", "Hong Kong", "Manila",
  "Osaka", "Seoul", "Shanghai", "Sydney", "Taipei", "Tokyo",
  "Bogota", "Buenos Aires", "Johannesburg", "Khartoum", "Kinshasa", "Lagos",
  "Lima", "Los Angeles", "Mexico City", "Miami", "Santiago", "Sao Paulo",
  "Algiers", "Baghdad", "Cairo", "Chennai", "Delhi", "Istanbul",
  "Karachi", "Kolkata", "Moscow", "Mumbai", "Riyadh", "Tehran",
]

const clearStage = cities.reduce(
  (obj, city) => {obj[city] = false; return obj}, {}
)

const modeMap = modes.reduce(
  (obj, modeObj) => {obj[modeObj['value']] = modeObj['label']; return obj}, {}
)

const colors = ["blue", "red", "yellow", "black"]
const cityColors = cities.reduce((obj, city, index) => {
    obj[city] = colors[Math.floor(index / 12)]
    return obj;
  }, {});

function CityList(props) {
  const {label, cityList, active, stageCallback} = props;

  return (
    <Box sx={{ 
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 0.5,
        py: 1.5,
    }}>
      {label && <Typography variant='subtitle2' sx={{pr: 1}}> {label}: </Typography>}
      {cityList.map((city) => (
          <Chip
            size="small"
            key={city}
            label={city}
            color={(active ? "ce_" : "cd_") + cityColors[city]}
            onClick={active ? stageCallback(city) : undefined}
          />
      ))}
    </Box>
  );
}

function Deck(props) {
  const {deck, mode, stagePending, stageCallback} = props;
  const canStage = (idx) => {
    if (mode === "draw") {
      return (idx === 0) && stagePending;
    } else if (mode === "epidemic") {
      return (idx === deck.length-1) && stagePending;
    } else {
      return false;
    }
  };

  return (
    <Box>
      <Typography variant='h6'> Infection Deck </Typography>
      <List sx={{py: 0}}>
        {deck.slice().reverse().map((cityList, idx) => (
          <div key={idx}>
            <Divider />
            <ListItem disablePadding >
              <CityList
                cityList={cityList}
                active={canStage(idx)}
                stageCallback={stageCallback}
              />
            </ListItem>
          </div>
        ))}
      </List>
    </Box>
  );
}

function DrawPile(props) {
  const {draw, stagePending, stageCallback} = props;
  return draw.length > 0 ? (
    <Box>
      <Typography variant='h6'> Draw Pile </Typography>
      <Divider />
      <CityList
        cityList={draw}
        active={stagePending}
        stageCallback={stageCallback}
      />
    </Box>
  ) : null;
}

function DiscardPile(props) {
  const {discard} = props;
  return discard.length > 0 ? (
    <Box>
      <Typography variant='h6'> Discard Pile </Typography>
      <Divider />
      <CityList
        cityList={discard}
        active={false}
      />
    </Box>
  ) : null;
}

function History(props) {
  const {history, undoCallback} = props;
  return history.length > 0 ? (
    <Box>
      <Stack direction="row" justifyContent="space-between" spacing={2}>
        <Typography variant='h6'> History </Typography>
        <Button
          size="small"
          endIcon={<ReplayIcon />}
          onClick={undoCallback}
        >
          Undo
        </Button>
      </Stack>
      <List sx={{py: 0}}>
        {history.slice().reverse().map((histItem, idx) => (
          <div key={idx}>
            <Divider />
            <ListItem disablePadding >
              <CityList
                label={modeMap[histItem['mode']]}
                cityList={histItem['staged']}
                active={false}
              />
            </ListItem>
          </div>
        ))}
      </List>
    </Box>
  ) : null;
}

function Stage(props) {
  const {stagedCities, requiredCities, unstageCallback, pickCallback} = props;
  return (
    <FormControl fullWidth>
      <InputLabel>Next Draw</InputLabel>
      <OutlinedInput
        label="Pick Cities"
        inputProps={{sx: {width:0}}}
        startAdornment={
          <Box sx={{ 
              width: '100%',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 0.5,
              py: 1.5,
          }}>
            {stagedCities.map((city) => (
              <Chip 
                size="small"
                key={city}
                label={city}
                color={"ce_"+cityColors[city]}
                onDelete={unstageCallback(city)}
              />
            ))}
          </Box>
        }
        endAdornment={
          <IconButton 
            disabled={stagedCities.length != requiredCities}
            color="primary"
            onClick={pickCallback}
          >
            <CheckCircleIcon/>
          </IconButton>
        }
      />
    </FormControl>
  );
}

export default function InfectionTab () {
  const [settings, setSettings]= useState({mode: 'draw', cards: 3});

  const [deck, setDeck] = useState([cities]);
  const [discard, setDiscard] = useState([]);
  const [draw, setDraw] = useState([]);
  const [stage, setStage] = useState(clearStage);
  const [history, setHistory] = useState([]);

  const stagedCities = Object.keys(stage).filter(city => stage[city]);
  const filteredDeck = deck.map(
    (cityList) => cityList.filter((city) => !stage[city])
  ).filter((cityList) => cityList.length > 0);
  const filteredDraw = draw.filter((city) => !stage[city]);

  const stageCity = (city) => (() => {
    let nextStage = {...stage};
    nextStage[city] = true;
    setStage(nextStage);
  });

  const unstageCity = (city) => (() => {
    let nextStage = {...stage};
    nextStage[city] = false;
    setStage(nextStage);
  });

  const pickCities = () => {
    if (settings.mode === 'draw') {
      setDraw(draw.concat(stagedCities));
      setDeck(filteredDeck);
    } else if (settings.mode === 'epidemic') {
      setDraw([]);
      setDeck(filteredDeck.concat([draw.concat(stagedCities)]));
    } else if (settings.mode === 'forecast') {
      setDeck(filteredDeck.concat(stagedCities));
    } else if (settings.mode === 'discard') {
      setDiscard(discard.concat(stagedCities));
      setDraw(filteredDraw);
    }

    setStage(clearStage);
    setHistory(history.concat([{
      'mode': settings.mode,
      'staged': stagedCities,
      'deck': deck,
      'draw': draw,
      'discard': discard,
    }]));
  };

  const settingsCallback = (nextSettings) => {
    setStage(clearStage);
    setSettings(nextSettings);
  };

  const undoCallback = () => {
    const nextHistory = [...history];
    const histTop = nextHistory.pop();
    setDraw(histTop['draw']);
    setDeck(histTop['deck']);
    setDiscard(histTop['discard']);
    setStage(clearStage);
    setHistory(nextHistory);
  };

  return (
    <Stack spacing={2}>
      <InfectionSettingsPane
        settings={settings}
        settingsCallback={settingsCallback}
      />

      <Stage
        stagedCities={stagedCities}
        requiredCities={settings.cards}
        unstageCallback={unstageCity}
        pickCallback={pickCities}
      />

      <Deck
        deck={filteredDeck}
        mode={settings.mode}
        stagePending={stagedCities.length < settings.cards}
        stageCallback={stageCity}
      />

      <DrawPile
        draw={filteredDraw}
        stagePending={settings.mode === 'discard' && stagedCities.length < settings.cards}
        stageCallback={stageCity}
      />
      <DiscardPile discard={discard} />
      <History history={history} undoCallback={undoCallback} />

    </Stack>
  );
};