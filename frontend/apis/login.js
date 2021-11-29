'use strict'
import {domain, defaultHeaders} from './headers.js'
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';


export function signUp(firstName, lastName, email, password, confirmPassword) {
   return fetch(domain + 'auth/register', {
    method: 'POST',
    headers: defaultHeaders,
    mode: 'cors',
    cache: 'default',
    body: JSON.stringify({
      "first_name": firstName,
      "last_name": lastName,
      "email": email,
      "password": password,
      "confirmPassword" : confirmPassword
    })
  }).then((response) => { return response; })
}

export function login(email, password) {
  return fetch(domain + 'auth/login', {
   method: 'POST',
   headers: defaultHeaders,
   mode: 'cors',
   cache: 'default',
   body: JSON.stringify({
     "email": email,
     "password": password
   })
 })
}

export async function googleLogIn(){
  try {
    const config = { iosClientId: `931919465131-5hg7mbiqsr7sh45aui3123r2regk1uit.apps.googleusercontent.com`,
    androidClientId: `931919465131-c6oj3h4dpm6ji00q6usg7g1t9th1p2it.apps.googleusercontent.com`,
    scopes: ['profile', 'email'] 
    };
    const result = await Google.logInAsync(config);
    const {type, user} = result;
    if (type == 'success') {
    const { email, givenName, familyName } = user;
    return fetch(domain + 'auth/externalClient', {
      method: 'POST',
      headers: defaultHeaders,
      mode: 'cors',
      cache: 'default',
      body: JSON.stringify({
        "first_name": givenName,
        "last_name": familyName,
        "email": email
        })
      })  
    } else {
    console.log('Google signin was cancelled');
    }
    } catch ({ message }) {
      console.log(`Google Login Error: ${message}`);
    }
}


export async function facebookLogIn() {
  try {
    await Facebook.initializeAsync({
      appId: '1024995171678005',
    });
    const { type, token } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile','email'],
    });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(`https://graph.facebook.com/me?fields=email,first_name,last_name&access_token=${token}`);
      const userInfo = await response.json();
      return fetch(domain + 'auth/externalClient', {
        method: 'POST',
        headers: defaultHeaders,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify({
          "first_name": userInfo.first_name,
          "last_name": userInfo.last_name,
          "email": userInfo.email
        })
      })
    } else {
      // type === 'cancel'
    }
  } catch ({ message }) {
    console.log(`Facebook Login Error: ${message}`);
  }
}