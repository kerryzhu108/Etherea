'use strict'
import { domain, defaultHeaders } from "./headers";

export function getUsername(uid) {
    return fetch(domain + "profile/" + uid, {
        method: 'GET',
        headers: defaultHeaders,
        mode: 'cors',
        cache: 'default'
    });
}