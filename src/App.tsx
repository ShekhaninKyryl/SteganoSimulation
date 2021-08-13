import React from "react";
import { Box, Grid, makeStyles } from "@material-ui/core";

import Header from "./components/Header/Header";
import Body from "./components/Body/Body";
import Footer from "./components/Footer/Footer";

import './App.css';
import { FileSystem } from "./entities/FileSystem/FileSystem";
import { useState } from "react";
import clsx from "clsx";
import { I_Basic } from "./utils/stegano/basic/I-method";
import { II_Basic } from "./utils/stegano/basic/II_method";

const FS_INIT = {
  size: 100,
  fileOptions: [
    {
      name: "A.txt", sizeInClusters: 4, color: "#FFFFFF"
    },
    {
      name: "B.txt", sizeInClusters: 4, color: "#880000"
    },
    {
      name: "C.txt", sizeInClusters: 4, color: "#FF0000"
    },
    {
      name: "D.txt", sizeInClusters: 4, color: "#FF5500"
    },
  ]
}

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
  const [fs, setFs] = useState(() => new FileSystem(FS_INIT));

  const handleReset = () => setFs(new FileSystem(FS_INIT));

  const handleBasic_I = () => {
    setFs(I_Basic("H", fs));
  };

  const handleBasic_II = () => {
    II_Basic("H", fs);
  }



  const classes = useStles();
  return (
    <Box bgcolor="#f5f4e1" className="App">
      <Grid container direction="column" wrap="nowrap" className={classes.container}>
        <Box width="100%" height="20%" className={classes.boxes} boxSizing="">
          <Header onBasic_I={handleBasic_I} onBasic_II={handleBasic_II} onReset={handleReset} />
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
