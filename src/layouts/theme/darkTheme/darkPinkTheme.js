import { createTheme } from "@mui/material/styles";
import { pink, grey } from "@mui/material/colors";


export const darkPinkTheme = createTheme({
    palette: {
        themeName: "ダークピンク",
        siteLogo: "LMAP_logo_reversal.svg",
        primary: {
            main: "#111",
            listBack: `linear-gradient(to bottom right, ${pink[500]}, #000)`
        },
        secondary: {
            main: pink[500],
            mainHover: pink[800],
            progressed: pink[900],
            exhibitAny: grey["A700"],
            disabled: pink[900],
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
            pop: "#2b2828",
            searchPop: "#2b2828",
            profilePop: "#2b2828",
            commandPop: "#2b2828", 
            search: "#111",
            hover: "#353030",
            hover2: "#1e1918",
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
            modalShadow: "rgba(255, 230, 230, 0.2)",
            destructDelete: "#f00",
            destructDeleteHover: "#c00",
            destructCancelHover: "#1a1a1a",
            productBack: "#3a3333",
            modalHeader: "#000",
            modal2: "#000",
            modalDisable: "#555",
            userCard: "#272222",
            top: "#000",
            following: "transparent",
            successBack: "rgba(0, 100, 50, 0.2)",
            warningBack: "rgba(100, 100, 0, 0.2)",
        },
        top: {
            main: "#f88",
            secondary: "#fff",
            title: "#fff",
            tabBack: "#000",
            tabHover: "#111",
            modal: "#000",
            disabled: "#1e1918",
            modalShadow: "rgba(0, 0, 0, 0.3)"
        },
        particle: {
            top: pink[500],
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