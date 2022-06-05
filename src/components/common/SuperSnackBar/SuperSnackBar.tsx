import * as React from 'react';
import Snackbar, {SnackbarCloseReason} from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { AlertColor } from '@mui/material/Alert';
import Slide from '@mui/material/Slide';


const SuperSnackBar: React.FC<SuperSnackBarPropsType> = React.memo( ({ message, alertStyle, onClose, open }) => {

    const handleSnackBarClose = (event: React.SyntheticEvent<any> | Event, reason: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }

        onClose();
    };

    const handleAlertClose = (event: React.SyntheticEvent<Element, Event>) => {
        onClose();
    };

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleSnackBarClose} TransitionComponent={(props: any) => <Slide {...props} direction="left"/>} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} >
            <MuiAlert
                elevation={6}
                variant="filled"
                onClose={handleAlertClose}
                severity={alertStyle}
                sx={{ width: '100%' }}
            >
                {message}
            </MuiAlert>
        </Snackbar>
    );
})

export default SuperSnackBar;


type SuperSnackBarPropsType = {
    message: string | null
    alertStyle: AlertColor
    onClose: () => void
    open: boolean | undefined
}