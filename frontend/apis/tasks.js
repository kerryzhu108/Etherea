'use strict'
import {domain, defaultHeaders} from './headers.js'

//Get all tasks
export function getAllThemes() {
    return fetch(domain + '/themesAll',
    {
        method: 'GET',
        headers: defaultHeaders
    }).then((response) => {return response;})
}

//Get all tasks for a selected theme (default right now is themeID1: climate change)
export function getTasksForTheme(themeID) {
    return fetch(domain + '/themeTasks/' + themeID, 
    {
        method: 'GET',
        headers: defaultHeaders,
    }).then((response) => {return response;})
}

//Get the users selected tasks
export function getTasks(userid) {
    return fetch(domain + '/userTask' + userid,
    {
        method: 'GET',
        headers: defaultHeaders
    }).then(response => response.json()).then(data => {return data;})
 }