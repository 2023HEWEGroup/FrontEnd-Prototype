import { createTheme } from "@mui/material/styles";
import { purple, grey } from "@mui/material/colors";


export const darklightPurpleTheme = createTheme({
    palette: {
        themeName: "ダークパープル",
        primary: {
            main: "#111"
        },
        secondary: {
            main: purple[500],
            mainHover: purple[800],
            progressed: purple[900],
            exhibitAny: grey["A700"],
            disabled: purple[900],
        },
        line: {
            main: "#888",
            white: "#fff",
            disable: "#555",
            tab: "#333",
            successLine: "#042",
            warningLine: "#440",
        },
        text: {
            main: "#fff",
            sub: "#777",
            sub2: "#999",
            categoryActive: "#fff",
            tab: "#888",
            product: "#ccc",
            error: "#f00",
            error2: "#0a0",
            admin: "#f0f",
            alert: "#fff",
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
            default: "#111",
            pop: "#2b282b",
            search: "#111",
            hover: "#353035",
            hover2: "#1e181e",
            hover3: "#2f282f",
            opacity: "rgba(255, 255, 255, 0.1)",
            opacityHover: "rgba(255, 255, 255, 0.3)",
            opacityActive: "rgba(255, 255, 255, 0.5)",
            categoryActive: "#000",
            slideHover: "rgba(0, 0, 0, 0.3)",
            slideComment: "rgba(0, 0, 0, 0.5)",
            groupApproachBackground: "rgba(0, 0, 0, 0.6)",
            uploadImgHover: "rgba(255, 255, 255, 0.05)",
            scrollBar: "#444",
            modal: "#111111",
            modalShadow: "rgba(255, 230, 255, 0.2)",
            destructDelete: "#f00",
            destructDeleteHover: "#c00",
            destructCancelHover: "#1a1a1a",
            productBack: "#3a333a",
            modalHeader: "#000",
            modal2: "#000",
            modalDisable: "#555",
            userCard: "#272227",
            successBack: "rgba(0, 100, 50, 0.2)",
            warningBack: "rgba(100, 100, 0, 0.2)",
        },
        top: {
            main: "#f8f",
            secondary: "#fff",
            titleGradation: "#da41d0, #d3d3d3",
            mainHover: "rgba(136, 255, 136, 0.1)",
            secondaryHover: "rgba(255, 255, 255, 0.1)"
        },
        particle: {
            top: purple["A700"],
        }
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
            ::-webkit-scrollbar{
                width: 10px;
            },
            ::-webkit-scrollbar-thumb {
                background-color: #444;
                border-radius: 10px;
            },
            ::-webkit-scrollbar-track {
                background-color: transparent;
            }
            `
        }
    }
})