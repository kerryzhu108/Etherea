'use strict'
import {domain, defaultHeaders} from './headers.js'

export async function insertNewTask(themeID, descript, taskName, points){
    return fetch(domain + '/themesTasks/:themeID', {
        method: 'POST',
        headers: defaultHeaders,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify({
          "themeID": themeID,
          "descript": descript,
          "taskName": taskName,
          "points": points
        })
    }).then((res) => { return res; })
}

export async function insertNewTheme(theme, multiplier, statName, dateLaunched, color){
    return fetch(domain + '/themesAll', {
        method: 'POST',
        headers: defaultHeaders,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify({
          "theme": theme,
          "multiplier": multiplier,
          "statName": statName,
          "dateLaunched": dateLaunched,
          "color": color
        })
    }).then((res) => { return res; })
}