// Import the React and React Native components.
import { Dimensions, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import the JS file.
import Logger from "../utils/Logger";
import NetInfo from '@react-native-community/netinfo'

const fontScale = Dimensions.get("window").fontScale;
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

// Loading the main class.
const Helpers = {
    // Store the data in Preference.
    saveInPref: async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            // Error saving data
            Logger.log("Error storing " + key, error);
        }
        Logger.log("AddValue " + key + " " + value);
    },

    // Get the data from Preference.
    getFromPref: async (key, defaultValue) => {
        var value = defaultValue;
        try {
            value = await AsyncStorage.getItem(key);
            if (value !== null) {
                // We have data!!
            } else {
                value = defaultValue;
            }
        } catch (error) {
            // Error retrieving data
            value = defaultValue;
            Logger.log("Error getting " + key, error);
        }
        return value;
    },

    // Remove the data from Preference of particular data.
    removeFromPref: async (key) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (err) {
            Logger.log("Error removing " + key, error);
        }
        Logger.log("RemoveValue " + key);
    },

    // Remove the all Preferences data.
    removeAllPref: async () => {
        try {
            await AsyncStorage.clear();
            Logger.log("Storage successfully cleared!");
        } catch (e) {
            Logger.log("Failed to clear the async storage. " + error);
        }
    },

    // Get Dynamic size component.
    getDynamicSize(size) {
        if (windowHeight > windowWidth) {
            // if (fontScale > 1) {
            //     return (windowWidth * size) / 375;
            // } else {
            //     return (windowWidth * size) / 375 / fontScale;
            // }
            return (windowWidth * size) / 375;
        } else {
            return (windowHeight * size) / 667 / fontScale; // For Returning in px
        }
    },

    // Set the Error Dialog.
    errorDialog: async (title, description) => {
        return (
            Alert.alert(
                "",
                description,
                [
                    { text: 'OK', onPress: () => Logger.log('OK Pressed') },
                ],
                { cancelable: false }
            )
        )
    },

    // Get the formated QTY.
    getFormattedQty: (value) => {
        //return Number(value).toFixed(2)
        //Logger.log("Value inside method" + value)
        if (value % 1 == 0) {
            //Logger.log("Value not contains point")
            return Number(value).toFixed(2)
        }
        else {
            //Logger.log("Value contains point")
            return value
        }
    },

    // Identify the Internet availabel or not.
    checkInternet: async () => {
        try {
            // NetInfo.fetch().then(state => {
            //     Logger.log("Connection type" + state.type);
            //     Logger.log("Is connected?" + state.isConnected);
            //     return state.isConnected
            // });
            var netInfo = await NetInfo.fetch()
            return netInfo.isConnected
        }
        catch (e) {
            Logger.log("error " + error);
        }
    }
};
export default Helpers;
