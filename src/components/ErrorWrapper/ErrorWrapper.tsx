import React, { ReactElement } from "react";
import { createTheme, IconButton, makeStyles, Snackbar } from "@material-ui/core";
import { Alert, AlertTitle } from '@material-ui/lab';
import CustomError from "../../entities/CustomError/CustomError";
import ErrorTableBasic, { parseToRowsBasic } from "./ErrorTableBasic";
import SmsIcon from '@material-ui/icons/Sms';

const defaultTheme = createTheme();
export const useTableStyles = makeStyles(
  () => {
    return {
      icon: {
        cursor: "pointer"
      }
    };
  },
  { defaultTheme },
);


export type ErrorWrapperChildren = {
  error?: CustomError;
  setError?: (message: CustomError) => void;
}


const ErrorWrapper: React.FC = ({ children }) => {
  const [error, setError] = React.useState<CustomError>();

  const handleClose = () => setError(undefined);

  return (
    <div>
      {React.cloneElement(children as ReactElement, { error, setError })}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={Boolean(error)}
        onClose={handleClose}
      >
        <Alert severity="warning" variant="filled">
          <AlertTitle>
            {error?.message}
            <IconButton title={JSON.stringify(error?.basic)} color="inherit" component="span" size="small">
              <SmsIcon />
            </IconButton>
          </AlertTitle>
          {error?.basic && <ErrorTableBasic
            rows={parseToRowsBasic(error)}
          />}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ErrorWrapper;
