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

export async function refreshTokens() {
    try {
        const refresh_token = await AsyncStorage.getItem('refresh_token');
        const request = JSON.stringify({refresh: refresh_token});
        const response = await fetch(domain + "auth/refresh", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            mode: 'cors',
            body: request
        });

        // Set newly obtained pair of refresh and access tokens
        const response_json = await response.json();
        await AsyncStorage.setItem("access_token", response_json.tokens.access);
        await AsyncStorage.setItem("refresh_token", response_json.tokens.refresh);
    } catch (error) {
        console.error(error);
    }
}