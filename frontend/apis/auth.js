'use strict'

import {domain} from './headers';
import AsyncStorage from "@react-native-async-storage/async-storage";

// Return the type of user, given that the user has the necessary
// access token.
export async function getUserType() {
    const access_token = await AsyncStorage.getItem('access_token');
    const response = await fetch(domain + "auth/type", {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${access_token}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        mode: 'cors'
    });

    const json = await response.json();
    return json.type;
}