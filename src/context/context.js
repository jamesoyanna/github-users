import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();

//  the githubContext will be supplying aProvider and a Consumer

const GithubProvider = ({children}) => {
    const [githubUser, setgithubUser] = useState(mockUser);
    const [followers, setFollowers] = useState(mockFollowers);
    const [repos, setRepos] = useState(mockRepos);

    // Requests , Loading
    const [requests, setRequests] = useState(0);
    const [loading, setIsloading] = useState(false)

    //Check rate
    const checkRequests = () => {
        axios(`${rootUrl}/rate_limit`)
        .then(({data}) =>{
        let {rate:{ remaining}, } = data;
        setRequests(remaining)
        if(remaining === 0) {
            // throw error

        }
        })
        .catch((err) => console.log(err))
    }
    //Error handling
    useEffect((checkRequests), [])

return <GithubContext.Provider value={{githubUser, followers, repos, requests }}>{children}  </GithubContext.Provider>
}

export {GithubProvider, GithubContext}
