import * as React from "react";
import { FormControl, InputLabel, Input, InputAdornment, IconButton, Typography } from "@material-ui/core";
import TextFieldsIcon from '@material-ui/icons/TextFields';
export interface IMessageFieldProps {
  message: string;
  setMessage: (value: string) => void;
  isBinaryString: boolean;
  setIsBinaryString: (value: boolean) => void;
}


const MessageField: React.FC<IMessageFieldProps> = ({
  message,
  setMessage,

  isBinaryString,
  setIsBinaryString,
}) => {
  return <FormControl>
    <InputLabel htmlFor="message-field">{"Message"}</InputLabel>
    <Input
      id="message-field"
      type={'text'}
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            title={isBinaryString ? "Binary message" : "String message"}
            aria-label="binary-string-button"
            size="small"
            onClick={() => setIsBinaryString(!isBinaryString)}
          >
            {isBinaryString ? <Typography variant={"caption"} >{"0010"}</Typography> : <TextFieldsIcon />}
          </IconButton>
        </InputAdornment>
      }
    />
  </FormControl>;
}

export default MessageField;