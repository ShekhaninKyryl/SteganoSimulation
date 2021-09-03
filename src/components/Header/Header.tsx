import { Box, Button, ButtonGroup, Typography, FormControlLabel, Checkbox, TextField } from "@material-ui/core";
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import styled from "styled-components";
import MessageField from "../MessageField/MessageField";

const TextFieldWrapper = styled(Box)`
margin: 8px;
> * {
   width:100%;
 }
`;

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


  message: string;
  setMessage: (value: string) => void;
  isBinaryString: boolean;
  setIsBinaryString: (value: boolean) => void;

  onBasic_I: () => void;
  onBasic_II: () => void;
  onBasic_III: () => void;
  onBasic_IV: () => void;

  onImproved_I: () => void;
  onImproved_II: () => void;
  onImproved_III: () => void;
  onImproved_IV: () => void;

}

const Header: React.FC<IProps> = ({
  onReset,
  isBeforeReset,
  setBeforeReset,

  message,
  setMessage,

  isBinaryString,
  setIsBinaryString,

  onBasic_I,
  onBasic_II,
  onBasic_III,
  onBasic_IV,

  onImproved_I,
  onImproved_II,
  onImproved_III,
  onImproved_IV,
}) => {
  const classes = useStyles();

  return (
    <Box>
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
            <Button onClick={onImproved_IV}>{"Improved-IV"}</Button>
          </ButtonGroup>
        </Box>
        <Box flex={1} display="flex" justifyContent="flex-end" alignItems="flex-end">
          <FormControlLabel
            disabled
            control={<Checkbox checked={isBeforeReset} onChange={({ target: { checked } }) => setBeforeReset(checked)} name="isBeforeReset" color="default" />}
            label="do reset before each going"
          />
          <Button variant="contained" onClick={onReset}>{"Reset"}</Button>
        </Box>
      </Box>
      <TextFieldWrapper>
        <MessageField
        message={message} 
        isBinaryString={isBinaryString}
        setMessage={setMessage}
        setIsBinaryString={setIsBinaryString}
        />
      </TextFieldWrapper>
    </Box>
  )
}

export default Header