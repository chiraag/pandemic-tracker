import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
    breakpoints: {
    values: {
      xs: 0,
      ss: 350,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    ce_blue: {
      light: '#77bfff',
      main: '#1792ff',
      dark: '#035399',
      contrastText: '#ffffff'
    },
    ce_red: {
      light: '#ff8a72',
      main: '#ff2222',
      dark: '#bf1f00',
      contrastText: '#ffffff'
    },
    ce_yellow: {
      light: '#ffde75',
      main: '#fdc81d',
      dark: '#937100',
      contrastText: '#a18521'
    },
    ce_black: {
      light: '#d1d1d1',
      main: '#545454',
      dark: '#040404',
      contrastText: '#ffffff'
    },
    cd_blue: {
      light: '#c0e2ff',
      main: '#c0e2ff',
      dark: '#0588fc',
      contrastText: '#000000'
    },
    cd_red: {
      light: '#ffd4d4',
      main: '#ffd4d4',
      dark: '#ff2a00',
      contrastText: '#000000'
    },
    cd_yellow: {
      light: '#ffedb3',
      main: '#ffedb3',
      dark: '#edb500',
      contrastText: '#000000'
    },
    cd_black: {
      light: '#e3e3e3',
      main: '#e3e3e3',
      dark: '#545454',
      contrastText: '#000000'
    },
  },
});

export default theme;