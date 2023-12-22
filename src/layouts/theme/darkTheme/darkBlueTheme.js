import { createTheme } from "@mui/material/styles";
import { blue, grey } from "@mui/material/colors";


export const darkBlueTheme = createTheme({
    palette: {
        themeName: "ダークブルー",
        siteLogo: "LMAP_logo_reversal.svg",
        primary: {
            main: "#111",
            listBack: `linear-gradient(to bottom right, ${blue[500]}, #000)`,
            disabled: "#444",
        },
        secondary: {
            main: blue[500],
            mainHover: blue[800],
            progressed: blue[900],
            exhibitAny: grey["A700"],
            disabled: blue[900],
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
            main2: "#fff",
            main3: "#000",
            categoryActive: "#000",
            tab: "#888",
            product: "#ccc",
            error: "#f00",
            error2: "#a00",
            admin: "#f0f",
            alert: "#fff",
            verifyBar: "#fff",
            following: "#000",
            disabled: "#000",
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
            pop: "#28282b",
            searchPop: "#28282b",
            profilePop: "#28282b",
            commandPop: "#28282b", 
            search: "#111",
            hover: "#303035",
            hover2: "#18191e",
            hover3: "rgba(255, 255, 255, 0.1)",
            opacity: "rgba(255, 255, 255, 0.1)",
            opacityHover: "rgba(255, 255, 255, 0.3)",
            opacityActive: "rgba(255, 255, 255, 0.5)",
            categoryActive: "#fff",
            slideHover: "rgba(0, 0, 0, 0.3)",
            slideComment: "rgba(0, 0, 0, 0.5)",
            groupApproachBackground: "rgba(0, 0, 0, 0.6)",
            uploadImgHover: "rgba(255, 255, 255, 0.05)",
            scrollBar: "#444",
            modal: "#111111",
            modalShadow: "rgba(230, 230, 255, 0.2)",
            destructDelete: "#f00",
            destructDeleteHover: "#c00",
            destructCancelHover: "#1a1a1a",
            productBack: "#33333a",
            modalHeader: "#000",
            modal2: "#000",
            modalDisable: "#555",
            userCard: "#222227",
            top: "#000",
            following: "transparent",
            successBack: "rgba(0, 100, 50, 0.2)",
            warningBack: "rgba(100, 100, 0, 0.2)",
        },
        top: {
            main: "#88f",
            secondary: "#fff",
            title: "#fff",
            tabBack: "#000",
            tabHover: "#111",
            modal: "#000",
            disabled: "#18191e",
            modalShadow: "rgba(0, 0, 0, 0.3)"
        },
        particle: {
            top: blue[500],
        },
        type: {
            followButton: "outlined",
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