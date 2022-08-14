// Import the React and React Native components.
import { Platform } from 'react-native';

// Import the JS file.
import Helpers from "../utils/Helpers";
import Constant from '../utils/Constant'

/*
This file is for all api request.
When ever need to call new api add that api request in this file.
*/
const ApiJSON = {

    addProductRequest: async function (name, price, category, description, avtar, developerEmail) {
        return {
            [Constant.PARAM_NAME]: name,
            [Constant.PARAM_PRICE]: price,
            [Constant.PARAM_CATEGORY]: category,
            [Constant.PARAM_DESCRIPTION]: description,
            [Constant.PARAM_AVATAR]: avtar,
            [Constant.PARAM_DEVELOPER_EMAIL]: developerEmail,
        };
    },
}
export default ApiJSON;