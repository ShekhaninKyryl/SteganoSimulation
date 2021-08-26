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
  onBasic_II: () => void;
  onBasic_III: () => void;
  onBasic_IV: () => void;
}

const Header: React.FC<IProps> = ({
  onBasic_I,
  onBasic_II,
  onBasic_III,
  onBasic_IV,
  onReset }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button variant="contained" color="primary" onClick={onBasic_I}>{"Basic-I"}</Button>
      <Button variant="contained" color="primary" onClick={onBasic_II}>{"Basic-II"}</Button>
      <Button variant="contained" color="primary" onClick={onBasic_III}>{"Basic-III"}</Button>
      <Button variant="contained" color="primary" onClick={onBasic_IV}>{"Basic-IV"}</Button>
      <Button variant="contained" onClick={onReset}>{"Reset"}</Button>
    </div>
  )
}

export default Header