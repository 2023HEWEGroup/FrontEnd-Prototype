import { createTheme } from "@mui/material/styles";
import { blue, grey } from "@mui/material/colors";


export const LightBlueTheme = createTheme({
    palette: {
        themeName: "ライトブルー",
        siteLogo: "LMAP_logo.svg",
        primary: {
            main: "#f8fcff",
            listBack: `linear-gradient(to bottom right, ${blue[500]}, 70%, ${blue[500]})`
        },
        secondary: {
            main: blue[500],
            mainHover: blue[800],
            progressed: blue[900],
            exhibitAny: grey[900],
            disabled: blue[900],
        },
        line: {
            main: "#888",
            white: "#fff",
            disable: "#555",
            tab: "#333",
            successLine: "#084",
            warningLine: "#880",
        },
        text: {
            main: "#000",
            sub: "#777",
            sub2: "#777",
            main2: "#fff",
            categoryActive: "#fff",
            tab: "#aaa",
            product: "#ccc",
            error: "#f00",
            error2: "#a00",
            admin: "#f0f",
            alert: "#000",
            verifyBar: "#fff",
        },
        icon: {
            main: "#777",
            like: "#ff007f",
            admin: "#f0f",
            comment: "#00b7ff",
            share: "#00e73d",
        },
        background: {
            default: "#f8fcff",
            pop: "#ddd",
            searchPop: "#f8fcff",
            profilePop: "#f8fcff",
            commandPop: "#f8fcff",
            search: "#f8fcff",
            hover: blue[50],
            hover2: blue[50],
            hover3: blue[50],
            opacity: "rgba(0, 0, 0, 0.1)",
            opacityHover: blue[50],
            opacityActive: "rgba(0, 0, 0, 0)",
            categoryActive: blue[400],
            slideHover: "rgba(0, 0, 0, 0.3)",
            slideComment: "rgba(0, 0, 0, 0.4)",
            groupApproachBackground: "rgba(0, 0, 0, 0.4)",
            uploadImgHover: "rgba(0, 0, 0, 0.1)",
            scrollBar: "#444",
            modal: "#f8fcff",
            modalShadow: "rgba(0, 0, 0, 0.7)",
            destructDelete: "#f00",
            destructDeleteHover: "#c00",
            destructCancelHover: "#ddd",
            productBack: blue[50],
            modalHeader: "#f8fcff",
            modal2: "#f8fcff",
            modalDisable: "#555",
            userCard: "#f8fcff",
            top: "#f8fcff",
            successBack: "rgba(0, 200, 70, 0.6)",
            warningBack: "rgba(200, 200, 0, 0.6)",
        },
        top: {
            main: "#88f",
            secondary: "#fff",
            titleGradation: "#4158d0, #d3d3d3",
            mainHover: "rgba(136, 136, 255, 0.1)",
            secondaryHover: "rgba(255, 255, 255, 0.1)"
        },
        particle: {
            top: blue[500],
        }
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
            ::-webkit-scrollbar{
                width: 10px;
            },
            ::-webkit-scrollbar-thumb {
                background-color: #aaa;
                border-radius: 10px;
            },
            ::-webkit-scrollbar-track {
                background-color: transparent;
            }
            `
        }
    }
})