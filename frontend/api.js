'use strict'
const domain = 'https://etherea-dev.herokuapp.com/'
const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

export function signUp(firstName, lastName, email, password, confirmPassword) {
  return fetch(domain + 'get_items', {
    method: 'GET',
    headers: defaultHeaders,
    body: JSON.stringify({
      fir
    })
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