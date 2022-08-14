import React, { useEffect } from 'react';

// Import the Plugins and Thirdparty library.
import { useDispatch } from 'react-redux'

// Import the JS file.
import { SIGN_IN, SET_USER_INFO } from '../../redux/types'

import Helpers from '../../utils/Helpers'
import Constant from '../../utils/Constant';
import Logger from '../../utils/Logger';

// Loading the main class.
function SpalshScreen({ navigation }) {
    // Declaring the variables.
    const dispatch = useDispatch()

    const getUserToken = async () => {

        const userToken = await Helpers.getFromPref(Constant.PREF_TOKEN, '')
        if (userToken) {
            var userInfo = await Helpers.getFromPref(Constant.PREF_USER_INFO, '')
            if (userInfo !== null) {
                // We have data!!
                Logger.log(JSON.parse(userInfo));
                dispatch({
                    type: SET_USER_INFO,
                    payload: JSON.parse(userInfo)
                })
            }
        }
        setTimeout(() => {
            dispatch({
                type: SIGN_IN,
                payload: userToken
            })
        }, 1000)
    }

    useEffect(() => {
        getUserToken()
    }, [])

    return (
        null
    );
}
export default SpalshScreen;