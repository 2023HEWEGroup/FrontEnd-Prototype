import { createTheme } from "@mui/material/styles";
import { blue, blueGrey } from "@mui/material/colors";


export const lightBlueTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#aff"
        },
        secondary: {
            main: blue[600]
        },
        line: {
            main: "#888"
        },
        text: {
            main: "#000",
            sub: "#777"
        },
        icon: {
            main: "#666"
        }
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
            ::-webkit-scrollbar{
                width: 10px;
            },
            ::-webkit-scrollbar-thumb {
                background-color: ${blueGrey[400]};
                border-radius: 10px;
            },
            ::-webkit-scrollbar-track {
                background-color: #aff;
            }
            `
        }
    }
})