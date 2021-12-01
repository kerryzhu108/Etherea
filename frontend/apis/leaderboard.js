'use strict'
import { domain, defaultHeaders } from "./headers";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function leaderboard(){
    let data_rank;
    return AsyncStorage.getItem('userid').then(id => {
        return fetch(domain + 'leaderboard', {
            method: 'GET',
            headers: defaultHeaders
          })
          .then((response) => response.json())
          .then((json) => {
            let data_rank= json.results

            let topThreeArray = []
            if(data_rank.length > 0){
              topThreeArray.push(data_rank[0])
            }
            if(data_rank.length > 1){
              topThreeArray.push(data_rank[1])
            }
            if(data_rank.length > 2){
              topThreeArray.push(data_rank[2])
            }

            if(data_rank.length < 3){
              for(let i = 0; i < 3 - data_rank.length; i++){
                topThreeArray.push(null)
              }
            }
            return [topThreeArray, data_rank.slice(3), currentUser[0]]
          })
    })

    
    

}