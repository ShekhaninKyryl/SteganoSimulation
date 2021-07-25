import { Box, makeStyles, Tooltip } from "@material-ui/core";
import React from "react";
import clsx from 'clsx';
import { Cluster as ClusterClass } from "../../entities/Claster/Claster";

const useStles = makeStyles(() => ({
  cluster: {
    border: "1px solid",
    borderRadius: 10,
    padding: 8,
    height: 64,
  },

  container: {
    position: "relative",
    height: "-webkit-fill-available",
  },
  fixed: {
    position: "absolute",
  },
  index: {
    right: 0,
    bottom: 0,
  },
  fileName: {
    left: 0,
    top: 0,
  },
  fileIndex: {
    right: 0,
    top: 0,
  }
}));

interface ICluster {
  cluster: ClusterClass
}

const Cluster: React.FC<ICluster> = ({ cluster }) => {
  const classes = useStles();

  return (
    <Tooltip open={false} title={false}>
      <Box className={classes.cluster} style={{ borderColor: cluster.file?.color, backgroundColor: cluster.file?.color }}>
        <div className={classes.container}>
          <div className={clsx(classes.fixed, classes.index)}>{cluster.fsIndex}</div>
          <div className={clsx(classes.fixed, classes.fileIndex)}>{cluster.fileIndex}</div>
          <div className={clsx(classes.fixed, classes.fileName)}>{cluster.file?.name}</div>
        </div>
      </Box>
    </Tooltip>
  )
}


export default Cluster;