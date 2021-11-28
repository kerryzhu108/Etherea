'use strict'
import {domain, defaultHeaders} from './headers.js'

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

export function googleSignIn(firstName, lastName, email) {
  return fetch(domain + 'auth/googleClient', {
   method: 'POST',
   headers: defaultHeaders,
   mode: 'cors',
   cache: 'default',
   body: JSON.stringify({
     "first_name": firstName,
     "last_name": lastName,
     "email": email
   })
 }).then((response) => { return response; })
}
