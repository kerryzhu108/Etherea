'use strict'
//const domain = 'https://etherea-dev.herokuapp.com/'
const domain = 'http://192.168.0.117:3000/'
const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

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
  // response.json())
  // .then((responseData) => {
  //   //console.log(responseData);
  //   return responseData;
  // })
}

export function login(email, password) {
  fetch(domain + 'auth/login', {
   method: 'POST',
   headers: defaultHeaders,
   mode: 'cors',
   cache: 'default',
   body: JSON.stringify({
     "email": email,
     "password": password
   })
 }).then((response) => response.json())
 .then((responseData) => {
   console.log(responseData);
   return responseData;
 })
}

export function getTotalCost(checkoutItems, discountCode) {
  return fetch(domain + 'get_total_cost', {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify({
      items: checkoutItems,
      discount: discountCode
    })
  })   
}