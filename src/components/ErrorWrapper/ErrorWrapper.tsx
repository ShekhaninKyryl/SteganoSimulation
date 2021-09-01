import React, { ReactElement, useEffect } from "react";
import { IconButton, Snackbar } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import CustomError from "../../entities/CustomError/CustomError";

export type ErrorWrapperChildren = {
  error?: CustomError;
  setError?: (message: CustomError) => void;
}


const ErrorWrapper: React.FC = ({ children }) => {
  const [error, setError] = React.useState<CustomError>();

  const handleClose = () => setError(undefined);

  useEffect(() => {
    if (error) console.log(error.message, error.basic);

  }, [error])

  return (
    <div>
      {React.cloneElement(children as ReactElement, { error, setError })}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={!!error}
        onClose={handleClose}
        message={error?.message}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </div>
  );
}

export default ErrorWrapper;
