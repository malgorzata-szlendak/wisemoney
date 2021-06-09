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

    //orange rip palette
    odDark: "#061623",
    odGreenDark:"#1c4547",
    odGreenLight: "#266866",
    odOrange: "#f68800",
    odOrangeLight:"#f9bd24",

    //colorful palette
    cpPINK:"#ef476f",
    cpYellow:"#ffd166",
    cpGreen:"#06d6a0",
    cpBlue:"#118ab2",
    cpDarkBlue:"#073b4c",

};

export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 12,
    padding: 24,
    padding2: 36,

    // font sizes
    largeTitle: 50,
    h1: 30,
    h2: 22,
    h3: 16,
    h4: 14,
    body1: 30,
    body2: 20,
    body3: 16,
    body4: 14,

    // app dimensions
    width,
    height

};

export const FONTS = {
    largeTitle: { fontFamily: "Barlow-Bold", fontSize: SIZES.largeTitle, lineHeight: 55 },
    h1: { fontFamily: "Barlow-Bold", fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontFamily: "Barlow-Bold", fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: "Barlow-Bold", fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontFamily: "Barlow-Bold", fontSize: SIZES.h4, lineHeight: 22 },
    body1: { fontFamily: "Roboto-Regular", fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily: "Roboto-Regular", fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: "Roboto-Regular", fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily: "Roboto-Regular", fontSize: SIZES.body4, lineHeight: 22 },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;

// const shuffle = (array: Array<string>): Array<string> => array.sort(()=> Math.random() - 0.5); //rand colors for categories, not done check yt and finish
