'use strict'
import { domain, defaultHeaders } from "./headers";

export async function getImpactStats(userid) {
    try {
        const response = await fetch(domain + "impactStats/points/" + userid, {
            method: 'GET',
            headers: defaultHeaders,
            mode: 'cors',
            cache: 'default'
        });
        const json_response = await response.json();
        return json_response.impact;
    } catch (error) {
        console.error(error);
        return;
    }
}