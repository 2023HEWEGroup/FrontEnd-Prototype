import { createTheme } from "@mui/material/styles";
import { deepOrange, grey } from "@mui/material/colors";


export const darkOrangeTheme= createTheme({
    palette: {
        themeName: "ダークオレンジ",
        siteLogo: "LMAP_logo_reversal.svg",
        primary: {
            main: "#111",
            listBack: `linear-gradient(to bottom right, ${deepOrange[500]}, #000)`
        },
        secondary: {
            main: deepOrange[500],
            mainHover: deepOrange[800],
            progressed: deepOrange[900],
            exhibitAny: grey["A700"],
            disabled: deepOrange[900],
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
            categoryActive: "#000",
            tab: "#888",
            product: "#ccc",
            error: "#f00",
            error2: "#a00",
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
            pop: "#2f2b28",
            searchPop: "#2f2b28",
            profilePop: "#2f2b28",
            commandPop: "#2f2b28", 
            search: "#111",
            hover: "#3a3530",
            hover2: "#1f1c18",
            hover3: "#2f2c28",
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
            modalShadow: "rgba(255, 230, 200, 0.2)",
            destructDelete: "#f00",
            destructDeleteHover: "#c00",
            destructCancelHover: "#1a1a1a",
            productBack: "#3c3a33",
            modalHeader: "#000",
            modal2: "#000",
            modalDisable: "#555",
            userCard: "#272422",
            top: "#111",
            successBack: "rgba(0, 100, 50, 0.2)",
            warningBack: "rgba(100, 100, 0, 0.2)",
        },
        top: {
            main: "#fc8",
            secondary: "#fff",
            titleGradation: "#fc8, #d3d3d3",
            mainHover: "rgba(255, 200, 136, 0.1)",
            secondaryHover: "rgba(255, 255, 255, 0.1)"
        },
        particle: {
            top: deepOrange[500],
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