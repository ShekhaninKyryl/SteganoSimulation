import React from "react";
import { Box, Grid, makeStyles } from "@material-ui/core";

import Header from "./components/Header/Header";
import Body from "./components/Body/Body";
import Footer from "./components/Footer/Footer";
import ErrorWrapper, { ErrorWrapperChildren } from "./components/ErrorWrapper/ErrorWrapper";

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
import CustomError from "./entities/CustomError/CustomError";
import { validateBinary } from "./utils/message/validateBinary";
import { convertToBinary } from "./utils/message/convertToBinary";
import { convertToString } from "./utils/message/convertToString";

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

type IProps = ErrorWrapperChildren;

const App: React.FC<IProps> = ({ error, setError }) => {
  const classes = useStles();
  const [fs, setFs] = useState(() => new FileSystem(FS_INIT));
  const [isBeforeReset, setBeforeReset] = React.useState(true);
  const [message, setMessage] = React.useState<string>("");
  const [isBinaryString, setIsBinaryString] = React.useState(false);

  const handleSetMesage = (value: string) => setMessage(isBinaryString ? validateBinary(value) : value);

  const handleReset = () => setFs(new FileSystem(FS_INIT));

  const handleBasic_I = () => {
    try {
      const fileSystem = isBeforeReset ? new FileSystem(FS_INIT) : fs;
      setFs(I_Basic(message, fileSystem));
    } catch (error) {
      if (error instanceof CustomError)
        if (setError) setError(error);
    }

  };

  const handleBasic_II = () => {
    try {
      const fileSystem = isBeforeReset ? new FileSystem(FS_INIT) : fs;
      II_Basic(message, fileSystem);
      setFs(Object.assign({}, fileSystem));
    } catch (error) {
      if (error instanceof CustomError)
        if (setError) setError(error);
    }
  }

  const handleBasic_III = () => {
    try {
      const fileSystem = isBeforeReset ? new FileSystem(FS_INIT) : fs;
      III_Basic(message, fileSystem);
      setFs(Object.assign({}, fileSystem));
    } catch (error) {
      if (error instanceof CustomError)
        if (setError) setError(error);
    }

  }

  const handleBasic_IV = () => {
    try {
      const fileSystem = isBeforeReset ? new FileSystem(FS_INIT) : fs;
      IV_Basic(message, fileSystem);
      setFs(Object.assign({}, fileSystem));
    } catch (error) {
      if (error instanceof CustomError)
        if (setError) setError(error);
    }

  }

  const handleImproved_I = () => {
    try {
      const fileSystem = isBeforeReset ? new FileSystem(FS_INIT) : fs;
      setFs(I_Improved(message, fileSystem));
    } catch (error) {
      if (error instanceof CustomError)
        if (setError) setError(error);
    }

  }

  const handleImproved_II = () => {
    try {
      const fileSystem = isBeforeReset ? new FileSystem(FS_INIT) : fs;
      II_Improved(message, fileSystem);
      setFs(Object.assign({}, fileSystem));
    } catch (error) {
      if (error instanceof CustomError)
        if (setError) setError(error);
    }

  }

  const handleImproved_III = () => {
    try {
      const fileSystem = isBeforeReset ? new FileSystem(FS_INIT) : fs;
      III_Improved(message, fileSystem);
      setFs(Object.assign({}, fileSystem));
    } catch (error) {
      if (error instanceof CustomError)
        if (setError) setError(error);
    }

  }

  const handleImproved_IV = () => {
    try {
      const fileSystem = isBeforeReset ? new FileSystem(FS_INIT) : fs;
      IV_Improved(message, fileSystem);
      setFs(Object.assign({}, fileSystem));
    } catch (error) {
      if (error instanceof CustomError)
        if (setError) setError(error);
    }
  }

  React.useEffect(() => {
    if (isBinaryString) handleSetMesage(convertToBinary(message));
    else handleSetMesage(convertToString(message))
  }, [isBinaryString]);

  React.useEffect(() => setMessage("Hello"), []);

  return (
    <Box bgcolor="#f5f4e1" className="App">
      <Grid container direction="column" wrap="nowrap" className={classes.container}>
        <Box width="100%" className={classes.boxes} boxSizing="">
          <Header
            message={message}
            setMessage={handleSetMesage}
            isBinaryString={isBinaryString}
            setIsBinaryString={(value) => setIsBinaryString(value)}

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
        <Box width="100%" className={clsx(classes.boxes, classes.mainBox)}>
          <Body fs={fs} />
        </Box>
        <Box width="100%" className={classes.boxes}>
          <Footer />
        </Box>
      </Grid>
    </Box>
  );
}

const WrappApp = () => {
  return <ErrorWrapper><App /></ErrorWrapper>
};

export default WrappApp;
