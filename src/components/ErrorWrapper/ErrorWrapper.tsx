import React, { ReactElement } from "react";
import { IconButton, Snackbar } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';

export type ErrorWrapperChildren = {
  error?: string;
  setError?: (message: string) => void;
}


const ErrorWrapper: React.FC = ({ children }) => {
  const [error, setError] = React.useState("");

  const handleClose = () => setError("");

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
        message={error}
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
