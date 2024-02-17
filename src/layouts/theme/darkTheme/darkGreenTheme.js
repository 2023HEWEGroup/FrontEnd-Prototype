import { createTheme } from "@mui/material/styles";
import { green, grey } from "@mui/material/colors";


export const darkGreenTheme = createTheme({
    palette: {
        themeName: "ダークグリーン",
        siteLogo: "UNGRA_logo_reverse.svg",
        primary: {
            main: "#111",
            listBack: `linear-gradient(to bottom right, ${green[500]}, #000)`,
            disabled: "#444",
        },
        secondary: {
            main: green["A700"],
            mainHover: green[800],
            progressed: green[900],
            exhibitAny: grey["A700"],
            disabled: green[900],
        },
        line: {
            main: "#888",
            white: "#fff",
            disable: "#555",
            tab: "#333",
            successLine: "#042",
            warningLine: "#440",
        },
        broadcast: {
            main: "#f700ff",
            gradient: "linear-gradient(45deg, #FE6B8B 30%, #f700ff 90%)",
            gradientStop: "linear-gradient(45deg, #6BB7FE 30%, #9B30FF 90%)",
            boxLine: "#666",
            commandButtonFullScreen: "#ccc",
            commandButtonNormalScreen: "#ccc",
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
            star: "#f2b01e",
            inventory: "#BA68C8",
        },
        background: {
            default: "#111",
            pop: "#282b28",
            searchPop: "#282b28",
            profilePop: "#282b28",
            commandPop: "#282b28", 
            search: "#111",
            hover: "#303530",
            hover2: "#181e18",
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
            modalShadow: "rgba(230, 255, 230, 0.2)",
            destructDelete: "#f00",
            destructDeleteHover: "#c00",
            destructCancelHover: "#1a1a1a",
            productBack: "#333a33",
            modalHeader: "#000",
            modal2: "#000",
            modalDisable: "#555",
            userCard: "#222722",
            top: "#000",
            following: "transparent",
            successBack: "rgba(0, 100, 50, 0.2)",
            warningBack: "rgba(100, 100, 0, 0.2)",
            imageUpload: "#111111",
            imageUploadHover: "#222222",
        },
        top: {
            main: "#8f8",
            secondary: "#fff",
            title: "#fff",
            tabBack: "#000",
            tabHover: "#111",
            modal: "#000",
            disabled: "#181e18",
            modalShadow: "rgba(0, 0, 0, 0.3)"
        },
        particle: {
            top: green[500],
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