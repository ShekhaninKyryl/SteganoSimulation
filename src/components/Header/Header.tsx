import { Button } from "@material-ui/core";
import React from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

interface IProps {
  onReset: () => void;
  onBasic_I: () => void;
}

const Header: React.FC<IProps> = ({ onBasic_I, onReset }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button variant="contained" color="primary" onClick={onBasic_I}>{"Basic-I"}</Button>
      <Button variant="contained" onClick={onReset}>{"Reset"}</Button>
    </div>
  )
}

export default Header