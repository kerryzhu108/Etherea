'use strict'
import {domain, defaultHeaders} from './headers.js'
import AsyncStorage from '@react-native-async-storage/async-storage';

//Get all tasks
export function getAllThemes() {
    return fetch(domain + 'themesAll/',
    {
        method: 'GET',
        headers: defaultHeaders
    }).then((response) => {return response;})
}

//Get all tasks for a selected theme (default right now is themeID1: climate change)
export function getTasksForTheme(themeID) {
    return fetch(domain + 'themesTasks/' + themeID, 
    {
        method: 'GET',
        headers: defaultHeaders,
    }).then((response) => {return response})
}

 //Get the users selected tasks under their current theme
export function getTasks(userid) {
    return fetch(domain + 'userTaskByTheme/' + userid,
    {
        method: 'GET',
        headers: defaultHeaders
    }).then(response => {return response})
 }

export function chooseTasks(userid, taskids) {
    return fetch(domain + 'chooseTasks', {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify({
            "userid": userid,
            "taskid": taskids
        })
    }).then(response => {return response})
}

export function finishTask(userid, taskid) {
    return fetch(domain + 'taskFinished', {
        method: 'put',
        headers: defaultHeaders,
        body: JSON.stringify({
            "userid": userid,
            "taskid": taskid
        })
    }).then(response => {return response})
}

export async function changeTheme(themeid) {
    const access_token = await AsyncStorage.getItem('access_token');
    const response = await fetch(domain + "updateUserTheme", {
        method: 'post',
        headers: {
            "Authorization": `Bearer ${access_token}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        mode: 'cors',
        body: JSON.stringify({
            "themeid": themeid
        })
    });
    const json = await response.json();
    return json
}

export async function getCurrentTheme() {
    const access_token = await AsyncStorage.getItem('access_token');
    const response = await fetch(domain + "userTheme", {
        method: 'get',
        headers: {
            "Authorization": `Bearer ${access_token}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        mode: 'cors'
    });
    const json = await response.json();
    return json[0]['theme']
}