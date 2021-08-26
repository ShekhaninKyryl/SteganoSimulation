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

  const [isBeforeReset, setBeforeReset] = React.useState(false);

  const handelDoReset = (method: () => void) => {
    if (isBeforeReset) onReset();
    method();
  }

  return (
    <Box display="flex" flexDirection="row" className={classes.root}>
      <Box>
        <Typography color="textPrimary" variant="h6">{"Basic methods"}</Typography>
        <ButtonGroup variant="contained" color="primary" aria-label="text primary button group">
          <Button onClick={() => handelDoReset(onBasic_I)}>{"Basic-I"}</Button>
          <Button onClick={() => handelDoReset(onBasic_II)}>{"Basic-II"}</Button>
          <Button onClick={() => handelDoReset(onBasic_III)}>{"Basic-III"}</Button>
          <Button onClick={() => handelDoReset(onBasic_IV)}>{"Basic-IV"}</Button>
        </ButtonGroup>
      </Box>
      <Box>
        <Typography color="textPrimary" variant="h6">{"Improved methods"}</Typography>
        <ButtonGroup disabled variant="contained" color="secondary" aria-label="text primary button group">
          <Button onClick={() => handelDoReset(onBasic_I)}>{"Basic-I"}</Button>
        </ButtonGroup>
      </Box>
      <Box flex={1} display="flex" justifyContent="flex-end" alignItems="flex-end">
        <FormControlLabel
          control={<Checkbox checked={isBeforeReset} onChange={({ target: { checked } }) => setBeforeReset(checked)} name="isBeforeReset" color="default" />}
          label="did reset before each going"
        />
        <Button variant="contained" onClick={onReset}>{"Reset"}</Button>
      </Box>
    </Box>
  )
}

export default Header