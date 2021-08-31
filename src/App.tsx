import React from "react";
import { Box, Grid, makeStyles } from "@material-ui/core";

import Header from "./components/Header/Header";
import Body from "./components/Body/Body";
import Footer from "./components/Footer/Footer";

import './App.css';
import { FileSystem } from "./entities/FileSystem/FileSystem";
import { useState } from "react";
import clsx from "clsx";
import { I_Basic } from "./utils/stegano/basic/I_method";
import { II_Basic } from "./utils/stegano/basic/II_method";
import { III_Basic } from "./utils/stegano/basic/III_method";
import { IV_Basic } from "./utils/stegano/basic/IV_method";
import { I_Improved } from "./utils/stegano/improved/I_method";
import { II_Improved } from "./utils/stegano/improved/II_method";
import { III_Improved } from "./utils/stegano/improved/III_method";
import { IV_Improved } from "./utils/stegano/improved/IV_method";

const FS_INIT = {
  size: 100,
  fileOptions: [
    {
      name: "A.txt", sizeInClusters: 10, color: "#FFFFFF"
    },
    {
      name: "B.txt", sizeInClusters: 10, color: "#880000"
    },
    {
      name: "C.txt", sizeInClusters: 10, color: "#FF0000"
    },
    {
      name: "D.txt", sizeInClusters: 10, color: "#FF5500"
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
  const [isBeforeReset, setBeforeReset] = React.useState(true);
  const [message, setMessage] = React.useState("Hello");

  const handleReset = () => setFs(new FileSystem(FS_INIT));

  const handleBasic_I = () => {
    const fileSystem = isBeforeReset ? new FileSystem(FS_INIT) : fs;
    setFs(I_Basic(message, fileSystem));
  };

  const handleBasic_II = () => {
    const fileSystem = isBeforeReset ? new FileSystem(FS_INIT) : fs;
    II_Basic(message, fileSystem);
    setFs(Object.assign({ }, fileSystem));
  }

  const handleBasic_III = () => {
    const fileSystem = isBeforeReset ? new FileSystem(FS_INIT) : fs;
    III_Basic(message, fileSystem);
    setFs(Object.assign({ }, fileSystem));
  }

  const handleBasic_IV = () => {
    const fileSystem = isBeforeReset ? new FileSystem(FS_INIT) : fs;
    IV_Basic(message, fileSystem);
    setFs(Object.assign({ }, fileSystem));
  }

  const handleImproved_I = () => {
    const fileSystem = isBeforeReset ? new FileSystem(FS_INIT) : fs;
    setFs(I_Improved(message, fileSystem));
  }

  const handleImproved_II = () => {
    const fileSystem = isBeforeReset ? new FileSystem(FS_INIT) : fs;
    II_Improved(message, fileSystem);
    setFs(Object.assign({ }, fileSystem));
  }

  const handleImproved_III = () => {
    const fileSystem = isBeforeReset ? new FileSystem(FS_INIT) : fs;
    III_Improved(message, fileSystem);
    setFs(Object.assign({ }, fileSystem));
  }

  const handleImproved_IV = () => {
    const fileSystem = isBeforeReset ? new FileSystem(FS_INIT) : fs;
    IV_Improved(message, fileSystem);
    setFs(Object.assign({ }, fileSystem));
  }



  const classes = useStles();
  return (
    <Box bgcolor="#f5f4e1" className="App">
      <Grid container direction="column" wrap="nowrap" className={classes.container}>
        <Box width="100%" height="20%" className={classes.boxes} boxSizing="">
          <Header
            message={message}
            setMessage={(value) => setMessage(value)}

            isBeforeReset={isBeforeReset}
            setBeforeReset={(value) => setBeforeReset(Boolean(value))}
            onReset={handleReset}
            onBasic_I={handleBasic_I}
            onBasic_II={handleBasic_II}
            onBasic_III={handleBasic_III}
            onBasic_IV={handleBasic_IV}

            onImproved_I={handleImproved_I}
            onImproved_II={handleImproved_II}
            onImproved_III={handleImproved_III}
            onImproved_IV={handleImproved_IV}
          />
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
