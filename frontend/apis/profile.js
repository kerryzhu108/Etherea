'use strict'
import { domain, defaultHeaders } from "./headers";

export function getUsername(uid) {
    return fetch(domain + "profile/name/" + uid, {
        method: 'GET',
        headers: defaultHeaders,
        mode: 'cors',
        cache: 'default'
    });
}

export function getExp(uid) {
    return fetch(domain + "profile/exp/" + uid, {
        method: 'GET',
        headers: defaultHeaders,
        mode: 'cors',
        cache: 'default'
    });
}