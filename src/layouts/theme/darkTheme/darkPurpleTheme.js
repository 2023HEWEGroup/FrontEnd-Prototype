import { createTheme } from "@mui/material/styles";
import { purple, grey } from "@mui/material/colors";


export const darklightPurpleTheme = createTheme({
    palette: {
        themeName: "ダークパープル",
        siteLogo: "UNGRA_logo_reverse.svg",
        primary: {
            main: "#111",
            listBack: `linear-gradient(to bottom right, ${purple[500]}, #000)`,
            disabled: "#444",
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
            main2: "#fff",
            main3: "#000",
            categoryActive: "#000",
            tab: "#888",
            product: "#ccc",
            error: "#f00",
            error2: "#0a0",
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
            pop: "#2b282b",
            searchPop: "#2b282b",
            profilePop: "#2b282b",
            commandPop: "#2b282b", 
            search: "#111",
            hover: "#353035",
            hover2: "#1e181e",
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
            modalShadow: "rgba(255, 230, 255, 0.2)",
            destructDelete: "#f00",
            destructDeleteHover: "#c00",
            destructCancelHover: "#1a1a1a",
            productBack: "#3a333a",
            modalHeader: "#000",
            modal2: "#000",
            modalDisable: "#555",
            userCard: "#272227",
            top: "#000",
            following: "transparent",
            successBack: "rgba(0, 100, 50, 0.2)",
            warningBack: "rgba(100, 100, 0, 0.2)",
            imageUpload: "#111111",
            imageUploadHover: "#222222",
        },
        top: {
            main: "#f8f",
            secondary: "#fff",
            title: "#fff",
            tabBack: "#000",
            tabHover: "#111",
            modal: "#000",
            disabled: "#1e181e",
            modalShadow: "rgba(0, 0, 0, 0.3)"
        },
        particle: {
            top: purple["A700"],
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