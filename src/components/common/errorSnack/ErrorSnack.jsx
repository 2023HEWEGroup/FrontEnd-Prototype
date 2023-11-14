import { Alert, Slide, Snackbar } from '@mui/material'
import React from 'react'


const SlideTransition = (props) => {
    return <Slide {...props} direction="up" />;
};


const ErrorSnack = (props) => {

    return (
        <Snackbar open={props.open} onClose={props.onClose} TransitionComponent={SlideTransition} autoHideDuration={5000} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
            <Alert severity='error'>
            入力エラー：{
                props.warning
            }
            </Alert>
        </Snackbar>
    )
}


export default ErrorSnack