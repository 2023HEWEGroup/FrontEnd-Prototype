import { createTheme } from "@mui/material/styles";
import { lime, grey } from "@mui/material/colors";


export const LightLimeTheme = createTheme({
    palette: {
        themeName: "ライトライム",
        siteLogo: "UNGRA_logo.svg",
        primary: {
            main: "#f8fcff",
            listBack: `linear-gradient(to bottom right, ${lime[500]}, 70%, ${lime[500]})`,
            disabled: "#aaa",
        },
        secondary: {
            main: lime[500],
            mainHover: lime[800],
            progressed: lime[900],
            exhibitAny: grey[900],
            disabled: lime[900],
        },
        line: {
            main: "#888",
            white: "#fff",
            disable: "#aaa",
            tab: "#333",
            successLine: "#084",
            warningLine: "#880",
        },
        broadcast: {
            main: "#f700ff",
            gradient: "linear-gradient(45deg, #FE6B8B 30%, #f700ff 90%)",
            gradientStop: "linear-gradient(45deg, #6BB7FE 30%, #9B30FF 90%)",
            boxLine: "#f8fcff",
        },
        text: {
            main: "#000",
            sub: "#777",
            sub2: "#777",
            main2: "#fff",
            main3: "#000",
            categoryActive: "#fff",
            tab: "#aaa",
            product: "#ccc",
            error: "#f00",
            error2: "#a00",
            admin: "#f0f",
            alert: "#000",
            verifyBar: "#000",
            following: "#fff",
            disabled: "#555",
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
            default: "#f8fcff",
            pop: "#ddd",
            searchPop: "#f8fcff",
            profilePop: "#f8fcff",
            commandPop: "#f8fcff",
            search: "#f8fcff",
            hover: lime[100],
            hover2: lime[100],
            hover3: grey[900],
            opacity: "rgba(0, 0, 0, 0.1)",
            opacityHover: lime[50],
            opacityActive: "rgba(0, 0, 0, 0)",
            categoryActive: lime[500],
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
            productBack: lime[50],
            modalHeader: "#f8fcff",
            modal2: "#f8fcff",
            modalDisable: "#555",
            userCard: "#f8fcff",
            top: "#000",
            following: "#000",
            successBack: "rgba(0, 200, 70, 0.6)",
            warningBack: "rgba(200, 200, 0, 0.6)",
            imageUpload: "#dddddd",
            imageUploadHover: "#cccccc",
        },
        top: {
            main: "#ff8",
            secondary: "#fff",
            title: "#fff",
            tabBack: "#000",
            tabHover: "#111",
            modal: "#000",
            disabled: "#3a3a33",
            modalShadow: "rgba(0, 0, 0, 0.3)"
        },
        particle: {
            top: lime[500],
        },
        type: {
            followButton: "contained",
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