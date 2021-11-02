'use strict'
import { domain, defaultHeaders } from "./headers";

export function getImpactStats(userid) {
    return fetch(domain + "impactStats/" + userid, {
        method: 'GET',
        headers: defaultHeaders,
        mode: 'cors',
        cache: 'default'
    });
}