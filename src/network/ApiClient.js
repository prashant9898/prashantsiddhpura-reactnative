// Import the React and React Native components.
import { Platform } from 'react-native';

// Import the Plugins and Thirdparty library.
import axios from 'axios';

// Import the JS file.
import Constant from '../utils/Constant';
import Helpers from "../utils/Helpers";
import Logger from '../utils/Logger';

// Loading the main class.
const axiosClient = () => {
    //Logger.log("data is" + data)
    return axios.create({
        baseURL: Constant.API_BASE_URL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByYXNoYW50Lm5ubkBnbWFpbC5jb20iLCJnaXRodWIiOiJodHRwczovL2dpdGh1Yi5jb20vcHJhc2hhbnQ5ODk4IiwiaWF0IjoxNjYwMzgwODU0LCJleHAiOjE2NjA4MTI4NTR9.aoiWujeP2Pd-pdQmkfLL1S32mTKxv8CeX8Xb8ItLAUA'
        }
    })
}


export default axiosClient