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

return <GithubContext.Provider value={{githubUser, followers, repos}}>{children}  </GithubContext.Provider>
}

export {GithubProvider, GithubContext}
