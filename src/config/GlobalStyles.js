// Import the React and React Native components.
import { StyleSheet } from "react-native";

// Import the JS file.
import Colors from "./Colors";

// Declaring the Stylesheet.
export default StyleSheet.create({
    safeAreaStyle: {
        flex: 1,
        backgroundColor: Colors.whiteColor,
        //paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    noDataFoundStyle: {
        color: Colors.blackColor
    }
});