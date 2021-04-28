import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { FileSystem } from "../../entities/FileSystem/FileSystem";
import Cluster from "../Cluster/Cluster";

const useStles = makeStyles(() => ({
  container: {
    padding: 20,
  },
}));

interface IBodyProps {
  fs?: FileSystem
}

const Body: React.FC<IBodyProps> = ({ fs }) => {
  console.log(fs);

  const classes = useStles();
  return (
    <div>
      <Grid container alignItems="flex-start" spacing={3} className={classes.container}>
        {fs?.clusters.map(c => (
          <Grid key={c.fsIndex} item xs={1}>
            <Cluster cluster={c} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default Body;