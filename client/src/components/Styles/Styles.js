import { createTheme } from "@mui/material";
const Colors = {
  white: "#fff",
  black: "#000",
  primary: "#02c39a",
  secondary: "#05668d",
  lightgray: "#ececec",
  gray: "#5a5a5a",
  statusActive: "#003f5c",
  statusVacation: "#7a5195",
  statusSick: "#ef5675",
  statusOther: "#ffa600"
}

const theme = createTheme({
  palette: {
    primary: {
      main: Colors.primary
    },

    secondary: {
      main: Colors.secondary
    },

    white: {
      main: Colors.white
    },
    
    black: {
      main: Colors.black
    },

    lightgray: {
      main: Colors.lightgray
    },
    
    gray: {
      main: Colors.gray
    },

    statusActive: {
      main: Colors.statusActive
    },

    statusVacation: {
      main: Colors.statusVacation
    },

    statusSick: {
      main: Colors.statusSick
    },

    statusOther: {
      main: Colors.statusOther
    }  
  },

  shape: {
    borderRadius: 0
  },
});

export default theme;