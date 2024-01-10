import React from "react"
import { Dialog, DialogActions } from "@mui/material";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import CancelIcon from '@material-ui/icons/Cancel';


type ErrorAlertProps = {
    errorMessage: string;
    classes: ClassNameMap<"errorAlert" | "cancelIcon">;
    showErrorAlert: boolean;
    handleCloseErrorAlert: () => void;
};

const ErrorAlert = ({errorMessage, classes, showErrorAlert, handleCloseErrorAlert}: ErrorAlertProps) =>
{
    return (
        <Dialog open={showErrorAlert}
                onClose={handleCloseErrorAlert}
                maxWidth="md"
                className={classes.errorAlert}
        >
            <DialogActions>
                <div>
                    {errorMessage}
                </div>
                <CancelIcon onClick={handleCloseErrorAlert}
                            className={classes.cancelIcon} />
            </DialogActions>
        </Dialog>
    );
};

export default ErrorAlert;