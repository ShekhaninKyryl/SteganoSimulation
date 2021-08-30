import { Box, Button, ButtonGroup, Typography, FormControlLabel, Checkbox } from "@material-ui/core";
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
  isBeforeReset: boolean;
  setBeforeReset: (checked?: boolean) => void;

  onBasic_I: () => void;
  onBasic_II: () => void;
  onBasic_III: () => void;
  onBasic_IV: () => void;

  onImproved_I: () => void;
  onImproved_II: () => void;
  onImproved_III: () => void;

}

const Header: React.FC<IProps> = ({
  onReset,
  isBeforeReset,
  setBeforeReset,

  onBasic_I,
  onBasic_II,
  onBasic_III,
  onBasic_IV,

  onImproved_I,
  onImproved_II,
  onImproved_III,
}) => {
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="row" className={classes.root}>
      <Box>
        <Typography color="textPrimary" variant="h6">{"Basic methods"}</Typography>
        <ButtonGroup variant="contained" color="primary" aria-label="text primary button group">
          <Button onClick={onBasic_I}>{"Basic-I"}</Button>
          <Button onClick={onBasic_II}>{"Basic-II"}</Button>
          <Button onClick={onBasic_III}>{"Basic-III"}</Button>
          <Button onClick={onBasic_IV}>{"Basic-IV"}</Button>
        </ButtonGroup>
      </Box>
      <Box>
        <Typography color="textPrimary" variant="h6">{"Improved methods"}</Typography>
        <ButtonGroup variant="contained" color="secondary" aria-label="text primary button group">
          <Button onClick={onImproved_I}>{"Improved-I"}</Button>
          <Button onClick={onImproved_II}>{"Improved-II"}</Button>
          <Button onClick={onImproved_III}>{"Improved-III"}</Button>
        </ButtonGroup>
      </Box>
      <Box flex={1} display="flex" justifyContent="flex-end" alignItems="flex-end">
        <FormControlLabel
          control={<Checkbox checked={isBeforeReset} onChange={({ target: { checked } }) => setBeforeReset(checked)} name="isBeforeReset" color="default" />}
          label="do reset before each going"
        />
        <Button variant="contained" onClick={onReset}>{"Reset"}</Button>
      </Box>
    </Box>
  )
}

export default Header