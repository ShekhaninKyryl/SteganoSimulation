import React from "react";
import { Grid, makeStyles } from "@material-ui/core";

import Header from "./components/Header/Header";
import Body from "./components/Body/Body";
import Footer from "./components/Footer/Footer";

import './App.css';

const useStles = makeStyles(()=>({
  container: {
    height: "100vh",
  },
  grid: {
    padding: 8,
  },

}))


function App() {

  const classes = useStles();
  return (
    <div className="App">
      <Grid container direction="column" className={classes.container}>
        <Grid item key={"header"} className={classes.grid} xs={2} >
          <Header />
        </Grid>
        <Grid item key={"body"} className={classes.grid} xs={6}>
          <Body />
        </Grid>
        <Grid item key={"footer"} className={classes.grid} xs={2}>
          <Footer />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
