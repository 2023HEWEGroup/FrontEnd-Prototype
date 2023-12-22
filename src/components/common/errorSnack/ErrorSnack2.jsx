import { Alert, Slide, Snackbar } from '@mui/material'
import React from 'react'


const SlideTransition = (props) => {
    return <Slide {...props} direction="up" />;
};


const ErrorSnack2 = (props) => {

    return (
        <Snackbar open={props.open} onClose={props.onClose} TransitionComponent={SlideTransition} autoHideDuration={props.infinite ? null : 5000} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
            <Alert severity={props.severity === "info" ? "info" : props.severity === "success" ? "success" : props.severity === "warning" ? "warning" : "error"}>
            {!props.severity ? "エラー：" : null}{
                props.warning
            }
            </Alert>
        </Snackbar>
    )
}


export default ErrorSnack2