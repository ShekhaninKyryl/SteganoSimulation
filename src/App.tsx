import React from "react";
import { Box, Grid, makeStyles } from "@material-ui/core";

import Header from "./components/Header/Header";
import Body from "./components/Body/Body";
import Footer from "./components/Footer/Footer";

import './App.css';
import { FileSystem } from "./entities/FileSystem/FileSystem";
import { useState } from "react";
import clsx from "clsx";

const useStles = makeStyles(() => ({
  container: {
    height: "100vh",
  },
  boxes: {
    padding: 8,
    boxSizing: "border-box",
  },
  mainBox: {
    overflowX: "hidden",
    overflowY: "scroll",
  }
}));


function App() {
  const [fs, setFs] = useState(() => new FileSystem({ size: 50, numFiles: 4 }));

  fs.swapClusters(fs.clusters[3], fs.clusters[20]);

  const classes = useStles();
  return (
    <Box bgcolor="#f5f4e1" className="App">
      <Grid container direction="column" wrap="nowrap" className={classes.container}>
        <Box width="100%" height="20%" className={classes.boxes} boxSizing="">
          <Header />
        </Box>
        <Box width="100%" height="60%" className={clsx(classes.boxes, classes.mainBox)}>
          <Body fs={fs} />
        </Box>
        <Box width="100%" height="20%" className={classes.boxes}>
          <Footer />
        </Box>
      </Grid>
    </Box>
  );
}

export default App;
