import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
    //base colors palette
    //primary: "",
    //secondary: "",
    pinkPastel: "#e5c9d4",
    pinkPower: "#4f3a41",
    pink: "#f7b5cf",
    green: "#a9ad5d",
    blue: "#52b7db",
    yellow: "#f8ca44",
    yellow2: "#fad56b",
    orange: "#f7a445",
    purple: "#ab6c9a",

    //other colors
    black : "#1E1F20",
    white: "#FFFFFF",
    lightGray: "#f5f7fa",
    darkGray: "#6a6c73",
    darkgreen: '#008159',
    lightBlue: '#95A9B8',
    darkblue: "#194868",
    lighterDarkblue: "#1e5c87",
    tuna: "#f78b8b",
    peach: "#FF615F",

};

export const SIZES = {
    // global sizes

    padding: 24,

    // app dimensions
    width,
    height

};


const appTheme = { COLORS, SIZES };

export default appTheme;