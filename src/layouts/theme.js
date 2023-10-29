import { createTheme } from "@mui/material/styles";
import { blue } from "@mui/material/colors";


export const darkBlueTheme = createTheme({
    palette: {
        primary: {
            main: "#111"
        },
        secondary: {
            main: blue[500],
            progressed: blue[900]
        },
        line: {
            main: "#888",
            disable: "#555",
            tab: "#333"
        },
        text: {
            main: "#fff",
            sub: "#777",
            sub2: "#999",
            categoryActive: "#fff",
            tab: "#888",
            product: "#ccc",
            error: "#f00",
            error2: "#a00",
            admin: "#f0f"
        },
        icon: {
            main: "#777",
            like: "#ff007f",
            admin: "#f0f"
        },
        background: {
            default: "#111",
            pop: "#282828",
            search: "#111",
            hover: "#383838",
            hover2: "#222",
            opacity: "rgba(255, 255, 255, 0.1)",
            opacityHover: "rgba(255, 255, 255, 0.3)",
            opacityActive: "rgba(255, 255, 255, 0.5)",
            categoryActive: "#000",
            slideHover: "rgba(0, 0, 0, 0.3)",
            slideComment: "rgba(0, 0, 0, 0.5)",
            groupApproachBackground: "rgba(0, 0, 0, 0.6)",
            uploadImgHover: "rgba(255, 255, 255, 0.05)",
            scrollBar: "#444",
            modal: "#111",
            destructDelete: "#f00",
            destructDeleteHover: "#c00",
            destructCancelHover: "#1a1a1a"
        },
        top: {
            main: "#88f",
            secondary: "#fff",
            titleGradation: "#4158d0, #d3d3d3",
            mainHover: "rgba(136, 136, 255, 0.1)",
            secondaryHover: "rgba(255, 255, 255, 0.1)"
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