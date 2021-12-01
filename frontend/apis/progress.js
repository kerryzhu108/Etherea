'use strict'
import { domain, defaultHeaders } from "./headers";

export async function getImpactStats(userid) {
    try {
        const response = await fetch(domain + "impactStats/calculator/" + userid, {
            method: 'GET',
            headers: defaultHeaders,
            mode: 'cors',
            cache: 'default'
        });
        return await response.json();
    } catch (error) {
        console.error(error);
        return;
    }
}