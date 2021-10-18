'use strict'
const domain = 'https://aqueous-eyrie-35955.herokuapp.com/'
const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

export function getItems() {
  return fetch(domain + 'get_items', {
    method: 'GET',
    headers: defaultHeaders,
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